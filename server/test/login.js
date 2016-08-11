// npm packages
import request from 'supertest';
import jwt from 'jsonwebtoken';

// our packages
import app from '../src/app';
import {auth as authConfig} from '../config';

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
        t.ok(actualBody.token, 'Token exists');

        const decodedUser = jwt.verify(actualBody.token, authConfig.jwtSecret);
        delete decodedUser.iat;

        t.equal(actualBody.user.login, 'test', 'Login matches request');
        t.notOk(actualBody.user.password, 'No password included');
        t.deepEqual(actualBody.user, decodedUser, 'User must match token');

        app.set('token', actualBody.token);
        app.set('user', actualBody.user);

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
