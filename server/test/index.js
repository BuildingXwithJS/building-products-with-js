/* eslint global-require: 0 */
// say we're testing to evade excessive logging
// usage of process.env is workaround for issues with setting env vars in windows
process.env.NODE_ENV = 'testing';
// require babel require hook
require('babel-core/register');
// create reqlite instance
const ReqliteServer = require('reqlite');
const server = new ReqliteServer({silent: true});
// require and start main tests
const startTests = require('./main').default;
startTests(server);
