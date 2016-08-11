// npm packages
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import morgan from 'morgan';

// our packages
import {logger} from './util';
import {auth as authConfig} from '../config';
import setupAuthRoutes from './auth';
import setupUserRoutes from './user';
import setupQuestionRoutes from './question';

// init app
const app = express();

// setup logging
app.use(morgan('combined', {stream: logger.stream}));

// add body parsing
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

// add cookie parsing
app.use(cookieParser());

// add session support
app.use(session({
  secret: authConfig.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {secure: true},
}));

// add passport.js
app.use(passport.initialize());
app.use(passport.session());

// test method
app.get('/', (req, res) => {
  res.send('Hello world!');
});

// setup authentication routes
setupAuthRoutes(app);
// setup user routes
setupUserRoutes(app);
// setup question routes
setupQuestionRoutes(app);

// catch all unhandled errors
app.use((err, req, res, next) => {
  logger.error('unhandled application error: ', err);
  res.status(500).send(err);
});

// export app
export default app;
