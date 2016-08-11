// npm packages
import request from 'supertest';
import moment from 'moment';

// our packages
import app from '../src/app';

export default (test) => {
  const sharedInput = {text: 'Do you like my aweful coding?', expirationDate: moment().add(1, 'days').toDate()};
  const sharedInputOther = {text: 'Do you like things?', expirationDate: moment().add(2, 'days').toDate()};
  const updatedInput = {text: 'Update text question?', expirationDate: moment().add(3, 'days').toDate()};

  test('POST /api/question - should not create new question without text', (t) => {
    const input = {text: undefined, expirationDate: moment().add(1, 'days').toDate()};
    request(app)
      .post('/api/question')
      .set('x-access-token', app.get('token'))
      .send(input)
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = {error: 'Text should be present!'};
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve correct error');
        t.end();
      });
  });

  test('POST /api/question - should not create new question with malformed date', (t) => {
    const input = {text: 'Am I a question?', expirationDate: 'not a date'};
    request(app)
      .post('/api/question')
      .set('x-access-token', app.get('token'))
      .send(input)
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = {error: 'Date should be valid ISO Date!'};
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve correct error');
        t.end();
      });
  });

  test('POST /api/question - create new question', (t) => {
    request(app)
      .post('/api/question')
      .set('x-access-token', app.get('token'))
      .send(sharedInput)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const actualBody = res.body;

        t.error(err, 'No error');
        t.equal(actualBody.text, sharedInput.text, 'Retrieve same question text');
        t.equal(actualBody.owner, app.get('user').id, 'Question belongs to correct user');
        t.ok(moment(actualBody.creationDate).isValid(), 'Creation date must be valid');
        t.ok(
          moment(actualBody.expirationDate).isSame(sharedInput.expirationDate),
          'Retrieve same question expirationDate'
        );

        app.set('question', actualBody);

        t.end();
      });
  });

  test('POST /api/question - create new question with different user', (t) => {
    request(app)
      .post('/api/question')
      .set('x-access-token', app.get('other-token'))
      .send(sharedInputOther)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const actualBody = res.body;

        t.error(err, 'No error');
        t.equal(actualBody.text, sharedInputOther.text, 'Retrieve same question text');
        t.equal(actualBody.owner, app.get('other-user').id, 'Question belongs to correct user');
        t.ok(moment(actualBody.creationDate).isValid(), 'Creation date must be valid');
        t.ok(
          moment(actualBody.expirationDate).isSame(sharedInputOther.expirationDate),
          'Retrieve same question expirationDate'
        );

        app.set('other-question', actualBody);

        t.end();
      });
  });

  test('GET /api/question/:id - get question', (t) => {
    request(app)
      .get(`/api/question/${app.get('question').id}`)
      .set('x-access-token', app.get('token'))
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const actualBody = res.body;

        t.error(err, 'No error');
        t.equal(actualBody.text, sharedInput.text, 'Retrieve same question text');
        t.equal(actualBody.owner, app.get('user').id, 'Question belongs to correct user');
        t.ok(moment(actualBody.creationDate).isValid(), 'Creation date must be valid');
        t.ok(
          moment(actualBody.expirationDate).isSame(sharedInput.expirationDate),
          'Retrieve same question expirationDate'
        );

        t.end();
      });
  });

  test('POST /api/question/:id - should not update question without text', (t) => {
    request(app)
      .post(`/api/question/${app.get('question').id}`)
      .set('x-access-token', app.get('token'))
      .send({text: ''})
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = {error: 'Text should be not empty!'};
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve correct error');
        t.end();
      });
  });

  test('POST /api/question/:id - should not update question with invalid date', (t) => {
    request(app)
      .post(`/api/question/${app.get('question').id}`)
      .set('x-access-token', app.get('token'))
      .send({expirationDate: 'not a date'})
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = {error: 'Date should be valid ISO Date!'};
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve correct error');
        t.end();
      });
  });

  test('POST /api/question/:id - should not update non-existent question', (t) => {
    request(app)
      .post('/api/question/123')
      .set('x-access-token', app.get('token'))
      .send({text: 'Question?', expirationDate: moment().toDate()})
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const actualBody = res.body;

        t.error(err, 'No error');
        t.ok(actualBody.error.indexOf('DocumentNotFoundError') !== -1, 'Retrieve correct error');
        t.end();
      });
  });

  test('POST /api/question/:id - should not update question of non-owner', (t) => {
    request(app)
      .post(`/api/question/${app.get('other-question').id}`)
      .set('x-access-token', app.get('token'))
      .send({text: 'Question?', expirationDate: moment().toDate()})
      .expect(403)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = {error: 'Not enough rights to change the question!'};
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve correct error');
        t.end();
      });
  });

  test('POST /api/question/:id - should get question back if same data is sent', (t) => {
    request(app)
      .post(`/api/question/${app.get('question').id}`)
      .set('x-access-token', app.get('token'))
      .send(sharedInput)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = app.get('question');
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve same question');
        t.end();
      });
  });

  test('POST /api/question/:id - should update question with new text', (t) => {
    request(app)
      .post(`/api/question/${app.get('question').id}`)
      .set('x-access-token', app.get('token'))
      .send({text: updatedInput.text})
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = {
          ...app.get('question'),
          text: updatedInput.text,
        };
        const actualBody = res.body;

        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve same question');
        t.end();
      });
  });

  test('POST /api/question/:id - should update question with new date', (t) => {
    request(app)
      .post(`/api/question/${app.get('question').id}`)
      .set('x-access-token', app.get('token'))
      .send({expirationDate: updatedInput.expirationDate})
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = {
          ...app.get('question'),
          ...updatedInput,
        };
        const actualBody = res.body;

        // get dates
        const actualDate = actualBody.expirationDate;
        const expectedDate = expectedBody.expirationDate;
        // delete from objects
        delete actualBody.expirationDate;
        delete expectedBody.expirationDate;

        // compare
        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve same question');
        t.ok(moment(actualDate).isSame(expectedDate), 'Retrieve same dates');
        t.end();
      });
  });

  test('DELETE /api/question/:id - should not delete question with different owner', (t) => {
    request(app)
      .delete(`/api/question/${app.get('other-question').id}`)
      .set('x-access-token', app.get('token'))
      .expect(403)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expectedBody = {error: 'Not enough rights to delete the question!'};
        const actualBody = res.body;

        // compare
        t.error(err, 'No error');
        t.deepEqual(actualBody, expectedBody, 'Retrieve same question');
        t.end();
      });
  });

  test('DELETE /api/question/:id - should delete question', (t) => {
    request(app)
      .delete(`/api/question/${app.get('question').id}`)
      .set('x-access-token', app.get('token'))
      .expect(204)
      .end((err) => {
        // compare
        t.error(err, 'No error');

        // try to get it and expect to fail
        t.test('  - GET /api/question/:id - should fail to get deleted question', (st) => {
          request(app)
            .get(`/api/question/${app.get('question').id}`)
            .set('x-access-token', app.get('token'))
            .expect(400)
            .end((e, res) => {
              const actualBody = res.body;

              st.error(e, 'No error');
              st.ok(actualBody.error.indexOf('DocumentNotFoundError') !== -1, 'Retrieve correct error');
              st.end();

              // end delete test
              t.end();
            });
        });
      });
  });
};
