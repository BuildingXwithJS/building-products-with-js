// npm packages
import test from 'tape';
import {spawn} from 'child_process';

// our packages
import {db as dbConfig} from '../config';
import {thinky, r} from '../src/db';

// tests
import core from './core';
import auth from './auth';

// reqlite instance
const reqlite = spawn('reqlite', ['--debug'], {detached: true});

// wait for start
reqlite.stderr.on('data', () => {
  thinky.dbReady().then(() => {
    // clean the database
    test(async (t) => {
      await r.db(dbConfig.db).table('User').delete();
      t.end();
    });

    // execute tests
    core(test);
    auth(test);

    // close db connections
    test((t) => {
      setImmediate(() => r.getPoolMaster().drain());
      reqlite.kill();
      t.end();
    });
  });
});
