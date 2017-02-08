/* global test, expect */
import {users} from '../users';
import * as ActionTypes from '../../actionTypes';

test('# users reducer - update/get user', () => {
  const res = users({}, {type: ActionTypes.UPDATE_USER});
  expect(res.user).toBe(null);
  expect(res.status).toBe('loading...');
  const res1 = users({}, {type: ActionTypes.GET_USER});
  expect(res1.user).toBe(null);
  expect(res1.status).toBe('loading...');
});

test('# users reducer - update/get user success', () => {
  const action = {type: ActionTypes.UPDATE_USER_SUCCESS, payload: {user: 'test'}};
  const res = users({}, action);
  expect(res.user).toBe('test');
  expect(res.status).toBe('done');
  const action1 = {type: ActionTypes.GET_USER_SUCCESS, payload: {user: 'test'}};
  const res1 = users({}, action1);
  expect(res1.user).toBe('test');
  expect(res1.status).toBe('done');
});

test('# users reducer - update/get user error', () => {
  const action = {type: ActionTypes.UPDATE_USER_ERROR, payload: {error: 'test'}};
  const res = users({}, action);
  expect(res.error).toBe('test');
  expect(res.status).toBe('error');
  const action1 = {type: ActionTypes.GET_USER_ERROR, payload: {error: 'test'}};
  const res1 = users({}, action1);
  expect(res1.error).toBe('test');
  expect(res1.status).toBe('error');
});

test('# users reducer - errors', () => {
  const testState = {};
  expect(users(testState, {type: '-1'})).toEqual(testState);
});
