// npm packages
import express from 'express';
import bodyParser from 'body-parser';

// init app
const app = express();

// add body parsing
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

// test method
app.get('/', (req, res) => {
  res.send('Hello world!');
});

// catch all unhandler errors
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send(err);
});

// export app
export default app;
