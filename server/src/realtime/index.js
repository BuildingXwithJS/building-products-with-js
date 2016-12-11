import {listen, r, RP} from 'rethinkdb-websocket-server';
import {verify} from 'jsonwebtoken';

import {db as dbConfig, auth as authConfig} from '../../config';

const rethinkConn = r.connect({
  host: dbConfig.host,
  port: dbConfig.port,
  db: dbConfig.db,
});

const options = {
  httpPath: '/realtime',
  dbHost: dbConfig.host,
  dbPort: dbConfig.port,
  db: dbConfig.db,
  unsafelyAllowAnyQuery: false,
};

const runQuery = query => rethinkConn.then(
  conn => query.run(conn)
);


const sessionCreator = urlQueryParams => {
  const {authToken} = urlQueryParams;
  if (!authToken) {
    return Promise.reject('Missing auth token');
  }
  try {
    const user = verify(authToken, authConfig.jwtSecret);
    const userQuery = r.table('User').get(user.id);
    return runQuery(userQuery).then(userDB => ({user: userDB}));
  } catch (err) {
    return Promise.reject('Invalid auth token');
  }
};

const queryWhitelist = [
  r.table('Question')
  .filter({id: RP.ref('id')})
  .changes()
  .opt('db', r.db('expertsdb'))
  .validate(() => true),
];

export default (httpServer) => {
  listen({
    ...options,
    sessionCreator,
    queryWhitelist,
    httpServer,
  });
};
