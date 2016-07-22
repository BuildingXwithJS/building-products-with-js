// our packages
import app from './app';
import {logger} from './util';

// start server
app.listen(8080, function() {
  const host = this.address().address;
  const port = this.address().port;
  logger.info(`Shard listening at http://${host}:${port}`);
});

// output all uncaught exceptions
process.on('uncaughtException', err => logger.error('uncaught exception:', err));
process.on('unhandledRejection', error => logger.error('unhandled rejection:', error));
