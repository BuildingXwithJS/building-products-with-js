/* global test, expect */

import {signRequest} from '../signRequest';

test('# signRequest', () => {
  localStorage.setItem('user.token', 'test');
  const req = {test: 'value'};
  const expectedRes = {
    ...req,
    headers: {
      'x-access-token': 'test',
    },
  };

  expect(signRequest(req)).toEqual(expectedRes);
});
