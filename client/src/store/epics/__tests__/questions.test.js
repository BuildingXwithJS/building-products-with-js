import Rx from 'rxjs';
import {ActionsObservable} from 'redux-observable';
import * as ActionTypes from '../../actionTypes';
import {getAllQuestions, answerQuestion, createQuestion, deleteQuestion, updateQuestion} from '../questions';

let oldPost;
let oldGet;
let oldDelete;
beforeEach(() => {
  oldPost = Rx.Observable.ajax.post;
  oldGet = Rx.Observable.ajax.get;
  oldDelete = Rx.Observable.ajax.delete;
});
afterEach(() => {
  Rx.Observable.ajax.post = oldPost;
  Rx.Observable.ajax.get = oldGet;
  Rx.Observable.ajax.delete = oldDelete;
});

test('# questions epic - getAllQuestions success', () => {
  const payload = {id: 0};
  const headers = {'x-access-token': undefined};
  const response = {user: 'test'};
  const input = {type: ActionTypes.GET_ALL_QUESTIONS, payload};
  const input$ = ActionsObservable.from([input]);
  const get = jest.fn().mockReturnValueOnce(Rx.Observable.from([{response}]));
  Rx.Observable.ajax.get = get;

  getAllQuestions(input$)
  .subscribe((res) => {
    expect(get.mock.calls.length).toBe(1);
    expect(get.mock.calls[0][0]).toBe('http://localhost:8080/api/question');
    expect(get.mock.calls[0][1]).toEqual(headers);
    expect(res).toEqual({type: ActionTypes.GET_ALL_QUESTIONS_SUCCESS, payload: {questions: response}});
  });
});

test('# questions epic - getAllQuestions error', () => {
  const input = {type: ActionTypes.GET_ALL_QUESTIONS, payload: {}};
  const input$ = ActionsObservable.from([input]);

  getAllQuestions(input$)
  .subscribe((res) => {
    expect(res.type).toBe(ActionTypes.GET_ALL_QUESTIONS_ERROR);
    expect(res.payload.error.AjaxError.message).toBe('ajax error');
  });
});

test('# questions epic - answerQuestion success', () => {
  const payload = {question: {id: 0}, answer: 'test'};
  const headers = {'x-access-token': undefined};
  const response = {user: 'test'};
  const input = {type: ActionTypes.ANSWER_QUESTION, payload};
  const input$ = ActionsObservable.from([input]);
  const post = jest.fn().mockReturnValueOnce(Rx.Observable.from([{response}]));
  Rx.Observable.ajax.post = post;

  answerQuestion(input$)
  .subscribe((res) => {
    expect(post.mock.calls.length).toBe(1);
    expect(post.mock.calls[0][0]).toBe('http://localhost:8080/api/question/0/answer');
    expect(post.mock.calls[0][1]).toEqual({answer: payload.answer});
    expect(post.mock.calls[0][2]).toEqual(headers);
    expect(res).toEqual({type: ActionTypes.ANSWER_QUESTION_SUCCESS, payload: response});
  });
});

test('# questions epic - answerQuestion error', () => {
  const input = {type: ActionTypes.ANSWER_QUESTION, payload: {question: {id: 0}}};
  const input$ = ActionsObservable.from([input]);

  answerQuestion(input$)
  .subscribe((res) => {
    expect(res.type).toBe(ActionTypes.ANSWER_QUESTION_ERROR);
    expect(res.payload.error.AjaxError.message).toBe('ajax error');
  });
});

test('# questions epic - createQuestion success', () => {
  const payload = {question: {id: 0}, answer: 'test'};
  const headers = {'x-access-token': undefined};
  const response = {user: 'test'};
  const input = {type: ActionTypes.ANSWER_QUESTION, payload};
  const input$ = ActionsObservable.from([input]);
  const post = jest.fn().mockReturnValueOnce(Rx.Observable.from([{response}]));
  Rx.Observable.ajax.post = post;

  createQuestion(input$)
  .subscribe((res) => {
    expect(post.mock.calls.length).toBe(1);
    expect(post.mock.calls[0][0]).toBe('http://localhost:8080/api/question');
    expect(post.mock.calls[0][1]).toEqual(payload);
    expect(post.mock.calls[0][2]).toEqual(headers);
    expect(res).toEqual({type: ActionTypes.CREATE_QUESTION_SUCCESS, payload: response});
  });
});

test('# questions epic - createQuestion error', () => {
  const input = {type: ActionTypes.CREATE_QUESTION, payload: {}};
  const input$ = ActionsObservable.from([input]);

  createQuestion(input$)
  .subscribe((res) => {
    expect(res.type).toBe(ActionTypes.CREATE_QUESTION_ERROR);
    expect(res.payload.error.AjaxError.message).toBe('ajax error');
  });
});

test('# questions epic - deleteQuestion success', () => {
  const payload = {id: 0};
  const headers = {'x-access-token': undefined};
  const input = {type: ActionTypes.DELETE_QUESTION, payload};
  const input$ = ActionsObservable.from([input]);
  const del = jest.fn().mockReturnValueOnce(Rx.Observable.from([{}]));
  Rx.Observable.ajax.delete = del;

  deleteQuestion(input$)
  .subscribe((res) => {
    expect(del.mock.calls.length).toBe(1);
    expect(del.mock.calls[0][0]).toBe('http://localhost:8080/api/question/0');
    expect(del.mock.calls[0][1]).toEqual(headers);
    expect(res).toEqual({type: ActionTypes.DELETE_QUESTION_SUCCESS, payload});
  });
});

test('# questions epic - deleteQuestion error', () => {
  const input = {type: ActionTypes.DELETE_QUESTION, payload: {id: 0}};
  const input$ = ActionsObservable.from([input]);

  deleteQuestion(input$)
  .subscribe((res) => {
    expect(res.type).toBe(ActionTypes.DELETE_QUESTION_ERROR);
    expect(res.payload.error.AjaxError.message).toBe('ajax error');
  });
});




test('# questions epic - updateQuestion success', () => {
  const payload = {id: 0};
  const headers = {'x-access-token': undefined};
  const response = {data: true};
  const input = {type: ActionTypes.UPDATE_QUESTION, payload};
  const input$ = ActionsObservable.from([input]);
  const post = jest.fn().mockReturnValueOnce(Rx.Observable.from([{response}]));
  Rx.Observable.ajax.post = post;

  updateQuestion(input$)
  .subscribe((res) => {
    expect(post.mock.calls.length).toBe(1);
    expect(post.mock.calls[0][0]).toBe('http://localhost:8080/api/question/0');
    expect(post.mock.calls[0][1]).toEqual(payload);
    expect(post.mock.calls[0][2]).toEqual(headers);
    expect(res).toEqual({type: ActionTypes.UPDATE_QUESTION_SUCCESS, payload: response});
  });
});

test('# questions epic - updateQuestion error', () => {
  const input = {type: ActionTypes.UPDATE_QUESTION, payload: {id: 0}};
  const input$ = ActionsObservable.from([input]);

  updateQuestion(input$)
  .subscribe((res) => {
    expect(res.type).toBe(ActionTypes.UPDATE_QUESTION_ERROR);
    expect(res.payload.error.AjaxError.message).toBe('ajax error');
  });
});

