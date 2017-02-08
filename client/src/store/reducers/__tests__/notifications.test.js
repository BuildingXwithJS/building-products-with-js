/* global test, expect */
import {notifications} from '../notifications';
import * as ActionTypes from '../../actionTypes';

test('# notifications reducer - add notification', () => {
  const testState = [];
  const action = {
    type: ActionTypes.ADD_NOTIFICATION,
    payload: 'test',
  };

  expect(notifications(testState, action).length).toBe(1);
  expect(notifications(testState, action)[0]).toBe('test');
});

test('# notifications reducer - remove notification', () => {
  const testState = ['test'];
  const action = {
    type: ActionTypes.REMOVE_NOTIFICATION,
    payload: 'test',
  };

  expect(notifications(testState, action).length).toBe(0);
});

test('# notifications reducer - errors', () => {
  const testState = [];
  expect(notifications(testState, {type: '-1'})).toEqual(testState);
});
