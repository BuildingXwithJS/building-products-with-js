// npm packages
import passport from 'passport';
import moment from 'moment';

// our packages
import {Question} from '../db';
import {asyncRequest} from '../util';

export default (app) => {
  app.post('/api/question', passport.authenticate('jwt', {session: false}), asyncRequest(async (req, res) => {
    // get user input
    const {text, expirationDate} = req.body;

    // make sure text is not empty
    if (!text || !text.length) {
      res.status(400).send({error: 'Text should be present!'});
      return;
    }

    // validate date
    if (!moment(expirationDate).isValid()) {
      res.status(400).send({error: 'Date should be valid ISO Date!'});
      return;
    }

    // save new user
    try {
      const question = new Question({
        text,
        expirationDate,
        owner: req.user.id,
      });
      await question.save();

      // send created question back
      res.send(question);
    } catch (e) {
      res.stats(400).send({error: e.toString()});
    }
  }));
};
