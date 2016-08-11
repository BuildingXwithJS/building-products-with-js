// npm packages
import request from 'supertest';

// our packages
import app from '../src/app';

export default (test) => {
  test('Should register with given username and password', (t) => {
    request(app)
      .post('/api/register')
      .send({login: 'test', password: '123', passwordRepeat: '123'})
      .expect(201)
      .end((err) => {
        t.error(err, 'No error');
        t.end();
      });
  });

  test('Should register second user with given username and password', (t) => {
    request(app)
      .post('/api/register')
      .send({login: 'other', password: '321', passwordRepeat: '321'})
      .expect(201)
      .end((err) => {
        t.error(err, 'No error');
        t.end();
      });
  });

  test('Should fail to register with same username', (t) => {
    request(app)
      .post('/api/register')
      .send({login: 'test', password: 'aaa', passwordRepeat: 'aaa'})
      .expect(403)
      .end((err, res) => {
        const expectedBody = {error: 'User already exists!'};
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve body');
        t.end();
      });
  });

  test('Should fail to register with mismatching passwords', (t) => {
    request(app)
      .post('/api/register')
      .send({login: 'test', password: '123', passwordRepeat: '321'})
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = {error: 'Passwords do not match!'};
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve body');
        t.end();
      });
  });
};
