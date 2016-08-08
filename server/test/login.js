// npm packages
import request from 'supertest';

// our packages
import app from '../src/app';

export default (test) => {
  test('Should login with existing username and password', (t) => {
    request(app)
      .post('/api/login')
      .send({login: 'test', password: '123'})
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const actualBody = res.body;

        t.error(err, 'No error');
        t.ok(actualBody.user, 'User exists');
        t.equal(actualBody.user.login, 'test', 'Login matches request');
        t.end();
      });
  });

  test('Should fail to login with wrong password', (t) => {
    request(app)
      .post('/api/login')
      .send({login: 'test', password: 'aaa'})
      .expect(401)
      .end((err) => {
        t.error(err, 'No error');
        t.end();
      });
  });

  test('Should fail to login with non-existent user', (t) => {
    request(app)
      .post('/api/login')
      .send({login: 'donotexist', password: '123'})
      .expect(401)
      .end((err) => {
        t.error(err, 'No error');
        t.end();
      });
  });
};
