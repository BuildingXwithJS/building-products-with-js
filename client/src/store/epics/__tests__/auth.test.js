import Rx from 'rxjs';
import {ActionsObservable} from 'redux-observable';
import * as ActionTypes from '../../actionTypes';
import {login, register} from '../auth';

let oldPost;

beforeEach(() => {
  oldPost = Rx.Observable.ajax.post;
});
afterEach(() => {
  Rx.Observable.ajax.post = oldPost;
});

test('# login epic - success', () => {
  const payload = {test: true};
  const response = {data: true};
  const input = {type: ActionTypes.DO_LOGIN, payload};
  const input$ = ActionsObservable.from([input]);
  const post = jest.fn().mockReturnValueOnce(Rx.Observable.from([{response}]));
  Rx.Observable.ajax.post = post;

  let responseCount = 0;
  login(input$)
  .subscribe((res) => {
    if (responseCount === 0) {
      expect(post.mock.calls.length).toBe(1);
      expect(post.mock.calls[0][0]).toBe('http://localhost:8080/api/login');
      expect(post.mock.calls[0][1]).toEqual(payload);
      expect(res).toEqual({type: 'LOGIN_SUCCESS', payload: response});
      responseCount += 1;
    } else {
      expect(res).toEqual({type: 'ADD_NOTIFICATION', payload: {id: 0, text: 'Login success', alertType: 'info'}});
    }
  });
});

test('# login epic - error', () => {
  const input = {type: ActionTypes.DO_LOGIN, payload: {}};
  const input$ = ActionsObservable.from([input]);

  let responseCount = 0;
  login(input$)
  .subscribe((res) => {
    if (responseCount === 0) {
      expect(res.type).toBe('LOGIN_ERROR');
      expect(res.payload.error.AjaxError.message).toBe('ajax error');
      responseCount += 1;
    } else {
      // TODO: figure out why notification is not dispatched
      expect(res).toEqual({type: 'ADD_NOTIFICATION', payload: {id: 1, text: 'ajax error', alertType: 'danger'}});
    }
  });
});

test('# register epic - success', () => {
  const payload = {test: true};
  const response = {data: true};
  const input = {type: ActionTypes.DO_REGISTER, payload};
  const input$ = ActionsObservable.from([input]);
  const post = jest.fn().mockReturnValueOnce(Rx.Observable.from([{response}]));
  Rx.Observable.ajax.post = post;

  let responseCount = 0;
  register(input$)
  .subscribe((res) => {
    if (responseCount === 0) {
      expect(post.mock.calls.length).toBe(1);
      expect(post.mock.calls[0][0]).toBe('http://localhost:8080/api/register');
      expect(post.mock.calls[0][1]).toEqual(payload);
      expect(res).toEqual({type: 'REGISTER_SUCCESS', payload: response});
      responseCount += 1;
    } else {
      expect(res).toEqual({type: 'ADD_NOTIFICATION', payload: {id: 1, text: 'Register success', alertType: 'info'}});
    }
  });
});

test('# register epic - error', () => {
  const input = {type: ActionTypes.DO_REGISTER, payload: {}};
  const input$ = ActionsObservable.from([input]);

  let responseCount = 0;
  login(input$)
  .subscribe((res) => {
    if (responseCount === 0) {
      expect(res.type).toBe('REGISTER_ERROR');
      expect(res.payload.error.AjaxError.message).toBe('ajax error');
      responseCount += 1;
    } else {
      expect(res).toEqual({type: 'ADD_NOTIFICATION', payload: {id: 2, text: 'ajax error', alertType: 'danger'}});
    }
  });
});
