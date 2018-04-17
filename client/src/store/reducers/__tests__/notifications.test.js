/* global test, expect */
import {notifications} from '../notifications';
import * as ActionTypes from '../../actionTypes';

test('# notifications reducer - add notification', () => {
  const testState = [];
  const action = {
    type: ActionTypes.ADD_NOTIFICATION,
    payload: {
      id: 1,
      text: 'Test notification!',
      alertType: 'info',
    },
  };

  expect(notifications(testState, action).length).toBe(1);
  expect(notifications(testState, action)[0]).toBe(action.payload);
  expect(notifications(testState, action)).toEqual([...testState, action.payload]);
});

test('# notifications reducer - remove notification', () => {
  const testState = [
    {
      id: 1,
      text: 'Test notification!',
      alertType: 'info',
    },
    {
      id: 2,
      text: 'Another test notification!',
      alertType: 'info',
    }
  ];
  const action = {
    type: ActionTypes.REMOVE_NOTIFICATION,
    payload: {
      notificationId: 1,
    },
  };

  expect(notifications(testState, action)).toEqual([testState[1]]);
  expect(notifications(testState, action).length).toBe(1);
});

test('# notifications reducer - errors', () => {
  const testState = [
    {
      id: 1,
      text: 'Test notification!',
      alertType: 'info',
    },
    {
      id: 2,
      text: 'Another test notification!',
      alertType: 'info',
    }
  ];

  expect(notifications(testState, {type: -1})).toEqual(testState);
});
