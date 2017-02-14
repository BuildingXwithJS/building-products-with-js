import Rx from 'rxjs';
import {ActionsObservable} from 'redux-observable';
import * as ActionTypes from '../../actionTypes';
import {getUser, updateUser} from '../users';

let oldPost;
let oldGet;

beforeEach(() => {
  oldPost = Rx.Observable.ajax.post;
  oldGet = Rx.Observable.ajax.get;
});
afterEach(() => {
  Rx.Observable.ajax.post = oldPost;
  Rx.Observable.ajax.get = oldGet;
});

test('# users epic - getUser success', () => {
  const payload = {id: 0};
  const headers = {'x-access-token': undefined};
  const response = {user: 'test'};
  const input = {type: ActionTypes.GET_USER, payload};
  const input$ = ActionsObservable.from([input]);
  const get = jest.fn().mockReturnValueOnce(Rx.Observable.from([{response}]));
  Rx.Observable.ajax.get = get;

  getUser(input$)
  .subscribe((res) => {
    expect(get.mock.calls.length).toBe(1);
    expect(get.mock.calls[0][0]).toBe('http://localhost:8080/api/user/0');
    expect(get.mock.calls[0][1]).toEqual(headers);
    expect(res).toEqual({type: ActionTypes.GET_USER_SUCCESS, payload: {user: response}});
  });
});

test('# users epic - getUser error', () => {
  const input = {type: ActionTypes.GET_USER, payload: {}};
  const input$ = ActionsObservable.from([input]);

  getUser(input$)
  .subscribe((res) => {
    expect(res.type).toBe(ActionTypes.GET_USER_ERROR);
    expect(res.payload.error.AjaxError.message).toBe('ajax error');
  });
});

test('# users epic - updateUser success', () => {
  const payload = {id: 0, test: '123'};
  const headers = {'x-access-token': undefined};
  const response = {user: 'test'};
  const input = {type: ActionTypes.UPDATE_USER, payload};
  const input$ = ActionsObservable.from([input]);
  const get = jest.fn().mockReturnValueOnce(Rx.Observable.from([{response}]));
  Rx.Observable.ajax.get = get;

  getUser(input$)
  .subscribe((res) => {
    expect(get.mock.calls.length).toBe(1);
    expect(get.mock.calls[0][0]).toBe('http://localhost:8080/api/user/0');
    expect(get.mock.calls[0][1]).toEqual(payload);
    expect(get.mock.calls[0][2]).toEqual(headers);
    expect(res).toEqual({type: ActionTypes.UPDATE_USER_SUCCESS, payload: {user: response}});
  });
});

test('# users epic - getUser error', () => {
  const input = {type: ActionTypes.UPDATE_USER, payload: {}};
  const input$ = ActionsObservable.from([input]);

  getUser(input$)
  .subscribe((res) => {
    expect(res.type).toBe(ActionTypes.UPDATE_USER_ERROR);
    expect(res.payload.error.AjaxError.message).toBe('ajax error');
  });
});
