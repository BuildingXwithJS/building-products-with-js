// npm packages
import test from 'tape';

// our packages
import {thinky, r} from '../src/db';

// tests
import core from './core';
import register from './register';
import login from './login';
import user from './user';
import question from './question';

thinky.dbReady().then(() => {
  // execute tests
  core(test);
  register(test);
  login(test);
  user(test);
  question(test);

  // close db connections
  test((t) => {
    setImmediate(() => r.getPoolMaster().drain());
    t.end();
  });
});
