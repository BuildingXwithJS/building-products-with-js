/* global test, expect */
import {auth} from '../auth';
import * as ActionTypes from '../../actionTypes';

const user = {
  id: '0',
  login: 'test',
  registrationDate: new Date(2016, 1, 1, 1, 1, 1, 1),
};

test('# auth reducer - register success', () => {
  const testState = {
    token: '123',
    user,
  };
  const action = {type: ActionTypes.REGISTER_SUCCESS};

  expect(auth(testState, action).redirectToLogin).toBeTruthy();
});

test('# auth reducer - login success', () => {
  const testState = {
    token: '123',
    user,
  };
  const action = {
    type: ActionTypes.LOGIN_SUCCESS,
    payload: {token: '123', user, test: true},
  };

  // TODO: check localStorage
  expect(auth(testState, action).test).toBeTruthy();
  expect(auth(testState, action).user).toEqual(user);
  expect(auth(testState, action).token).toBe('123');
});

test('# auth reducer - errors', () => {
  const testState = {
    token: '123',
    user,
  };
  expect(auth(testState, {type: ActionTypes.LOGIN_ERROR})).toEqual(testState);
  expect(auth(testState, {type: ActionTypes.REGISTER_ERROR})).toEqual(testState);
  expect(auth(testState, {type: '-1'})).toEqual(testState);
});
