/* global test, expect */

import {loginErrorToMessage, registerErrorToMessage} from '../errorToMessage';

const message = 'Test error';

test('# loginErrorToMessage', () => {
  expect(loginErrorToMessage({status: 401})).toBe('Wrong login or password. Please, try again!');
  expect(loginErrorToMessage({status: 0, message})).toBe(message);
});

test('# registerErrorToMessage', () => {
  const correctXhr = {
    xhr: {
      response: {},
    },
  };
  const brokenXhrData = {
    xhr: {
      response: {
        error: 'Test error',
      },
    },
  };
  expect(registerErrorToMessage(brokenXhrData)).toBe(brokenXhrData.xhr.response.error);
  expect(registerErrorToMessage({...correctXhr, status: 403})).toBe('Oops, something went wrong. Please, try again!');
  expect(registerErrorToMessage({...correctXhr, status: 0, message})).toBe(message);
});

