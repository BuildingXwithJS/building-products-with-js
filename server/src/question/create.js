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
    if (!moment(expirationDate, moment.ISO_8601).isValid()) {
      res.status(400).send({error: 'Date should be valid ISO Date!'});
      return;
    }

    // save new question
    const question = new Question({
      text,
      expirationDate: moment(expirationDate).toDate(),
      owner: req.user.id,
    });
    await question.save();

    // send created question back
    res.send(question);
  }));
};
