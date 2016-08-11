// npm packages
import request from 'supertest';
import jwt from 'jsonwebtoken';

// our packages
import app from '../src/app';
import {auth as authConfig} from '../config';

export default (test) => {
  test('GET /api/user/:id', (t) => {
    request(app)
      .get(`/api/user/${app.get('user').id}`)
      .set('x-access-token', app.get('token'))
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = app.get('user');
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve user');
        t.notOk(actualBody.password, 'No password included');
        t.end();
      });
  });

  test('GET /api/user/me', (t) => {
    request(app)
      .get('/api/user/me')
      .set('x-access-token', app.get('token'))
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = app.get('user');
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve user');
        t.notOk(actualBody.password, 'No password included');
        t.end();
      });
  });

  test('GET /api/user/:id with non-existent id', (t) => {
    request(app)
      .get('/api/user/1234')
      .set('x-access-token', app.get('token'))
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = {error: 'User does not exist'};
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Get correct error');
        t.end();
      });
  });

  test('POST /api/user/:id - should not allow change not self', (t) => {
    request(app)
      .post('/api/user/1234')
      .set('x-access-token', app.get('token'))
      .send({login: 'test123'})
      .expect(403)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = {error: 'Not enough rights to change other user profile!'};
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Get correct error');
        t.end();
      });
  });

  test('POST /api/user/:id - update with same data', (t) => {
    request(app)
      .post(`/api/user/${app.get('user').id}`)
      .set('x-access-token', app.get('token'))
      .send({login: 'test', password: '123'})
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = app.get('user');
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve new user');
        t.notOk(actualBody.password, 'No password included');
        t.end();
      });
  });

  test('POST /api/user/:id - should throw error if new passwords do not match', (t) => {
    request(app)
      .post(`/api/user/${app.get('user').id}`)
      .set('x-access-token', app.get('token'))
      .send({password: '1234', passwordRepeat: '321'})
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = {error: 'Passwords do not match!'};
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve correct error');
        t.end();
      });
  });

  test('POST /api/user/:id - update with existing login', (t) => {
    request(app)
      .post(`/api/user/${app.get('user').id}`)
      .set('x-access-token', app.get('token'))
      .send({login: 'other'})
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = {error: 'Login already taken!'};
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve correct error');
        t.end();
      });
  });

  test('POST /api/user/:id - update with new login', (t) => {
    request(app)
      .post(`/api/user/${app.get('user').id}`)
      .set('x-access-token', app.get('token'))
      .send({login: 'test123'})
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = {
          ...app.get('user'),
          login: 'test123',
        };
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve new user');
        t.notOk(actualBody.password, 'No password included');
        t.end();
      });
  });

  test('POST /api/user/:id - update with new password', (t) => {
    request(app)
      .post(`/api/user/${app.get('user').id}`)
      .set('x-access-token', app.get('token'))
      .send({password: 'asd', passwordRepeat: 'asd'})
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = {
          ...app.get('user'),
          login: 'test123',
        };
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve new user');
        t.notOk(actualBody.password, 'No password included');
        t.end();
      });
  });

  test('Should login with updated username and password', (t) => {
    request(app)
      .post('/api/login')
      .send({login: 'test123', password: 'asd'})
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const actualBody = res.body;

        t.error(err, 'No error');
        t.ok(actualBody.user, 'User exists');
        t.ok(actualBody.token, 'Token exists');

        const decodedUser = jwt.verify(actualBody.token, authConfig.jwtSecret);
        delete decodedUser.iat;

        t.equal(actualBody.user.login, 'test123', 'Login matches request');
        t.notOk(actualBody.user.password, 'No password included');
        t.deepEqual(actualBody.user, decodedUser, 'User must match token');

        app.set('token', actualBody.token);
        app.set('user', actualBody.user);

        t.end();
      });
  });
};
