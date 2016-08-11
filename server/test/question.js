// npm packages
import request from 'supertest';
import moment from 'moment';

// our packages
import app from '../src/app';

export default (test) => {
  const sharedInput = {text: 'Do you like my aweful coding?', expirationDate: moment().add(1, 'days').toDate()};

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
};
