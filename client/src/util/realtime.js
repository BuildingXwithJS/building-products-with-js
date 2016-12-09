import {rethinkdb, connect} from 'rethinkdb-websocket-client';

// Open a WebSocket connection to the server to send RethinkDB queries over
const options = {
  host: 'localhost', // hostname of the websocket server
  port: 8080,        // port number of the websocket server
  path: '/realtime',       // HTTP path to websocket route
  secure: false,     // set true to use secure TLS websockets
  db: 'expertsdb',        // default database, passed to rethinkdb.connect
};

const connPromise = connect(options);
const r = rethinkdb;
export {
  r,
  connPromise,
};
