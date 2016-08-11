import {logger} from './logger';

export const asyncRequest = (handler) =>
  (req, res) =>
    handler(req, res).catch(e => {
      logger.debug('Error duing request:', e);
      res.status(400).send({error: e.toString()});
    });
