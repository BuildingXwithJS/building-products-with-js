/* eslint global-require: 0 */
// get spawn
const spawn = require('child_process').spawn;
// require babel require hook
require('babel-core/register');
// reqlite instance
const reqlite = spawn('reqlite');
// wait for start
reqlite.stderr.on('data', () => {
  // require main tests
  const startTests = require('./main').default;
  startTests(reqlite);
});
