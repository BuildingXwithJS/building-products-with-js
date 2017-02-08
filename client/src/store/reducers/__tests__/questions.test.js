/* global test, expect */
import {questions} from '../questions';
import * as ActionTypes from '../../actionTypes';

test('# questions reducer - get all question', () => {
  const testState = {};
  const action = {type: ActionTypes.GET_ALL_QUESTIONS};
  const res = questions(testState, action);
  expect(res.questions).toEqual([]);
  expect(res.status).toBe('loading...');
});

test('# questions reducer - get all questions success', () => {
  const testState = {};
  const action = {
    type: ActionTypes.GET_ALL_QUESTIONS_SUCCESS,
    payload: {questions: 'test'},
  };
  const res = questions(testState, action);
  expect(res.questions).toBe('test');
  expect(res.status).toBe('done');
});

test('# questions reducer - answer question success', () => {
  const q = {id: 1, data: 'old'};
  const testState = {questions: [q]};
  const action = {
    type: ActionTypes.ANSWER_QUESTION_SUCCESS,
    payload: {id: q.id, data: 'update'},
  };
  const res = questions(testState, action);
  expect(res.questions[0].data).toBe('update');
});

test('# questions reducer - create question success', () => {
  const q = {id: 1, data: 'test'};
  const testState = {questions: []};
  const action = {
    type: ActionTypes.CREATE_QUESTION_SUCCESS,
    payload: q,
  };
  const res = questions(testState, action);
  expect(res.questions.length).toBe(1);
  expect(res.questions[0]).toEqual(q);
});

test('# questions reducer - delete question success', () => {
  const q = {id: 1, data: 'test'};
  const testState = {questions: [q]};
  const action = {
    type: ActionTypes.DELETE_QUESTION_SUCCESS,
    payload: q,
  };
  const res = questions(testState, action);
  expect(res.questions.length).toBe(0);
});

test('# questions reducer - update question success', () => {
  const q = {id: 1, data: 'test'};
  const testState = {questions: [q]};
  const action = {
    type: ActionTypes.UPDATE_QUESTION_SUCCESS,
    payload: {id: q.id, update: true},
  };
  const res = questions(testState, action);
  expect(res.questions.length).toBe(1);
  expect(res.questions[0].update).toBeTruthy();
});

test('# questions reducer - errors', () => {
  const testState = {};

  [
    ActionTypes.ANSWER_QUESTION_ERROR,
    ActionTypes.CREATE_QUESTION_ERROR,
    ActionTypes.GET_ALL_QUESTIONS_ERROR,
    ActionTypes.DELETE_QUESTION_ERROR,
    ActionTypes.UPDATE_QUESTION_ERROR,
  ].forEach((type) => {
    const res = questions(testState, {type, payload: {error: 'error'}});
    expect(res.status).toBe('error');
    expect(res.error).toBe('error');
  });

  expect(questions(testState, {type: '-1'})).toEqual(testState);
});
