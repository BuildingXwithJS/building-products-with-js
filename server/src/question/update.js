// npm packages
import passport from 'passport';
import moment from 'moment';

// our packages
import {Question} from '../db';
import {asyncRequest} from '../util';

export default (app) => {
  app.post('/api/question/:id', passport.authenticate('jwt', {session: false}), asyncRequest(async (req, res) => {
    const {id} = req.params;
    // get user input
    const {text, expirationDate} = req.body;

    // make sure text is not empty
    if (text !== undefined && !text.length) {
      res.status(400).send({error: 'Text should be not empty!'});
      return;
    }

    // validate date
    if (expirationDate && !moment(expirationDate, moment.ISO_8601).isValid()) {
      res.status(400).send({error: 'Date should be valid ISO Date!'});
      return;
    }

    // get the question
    const question = await Question.get(id);

    // double-check check if question exists
    if (!question) {
      res.status(400).send({error: 'Question not found!'});
      return;
    }

    // check if user is the owner
    if (req.user.id !== question.owner) {
      res.status(403).send({error: 'Not enough rights to change the question!'});
      return;
    }

    // check if data is actually changed
    const textChanged = text && question.text !== text;
    const expDateChanged = expirationDate && !moment(expirationDate).isSame(question.expirationDate);
    // if not - just send OK
    if (!textChanged && !expDateChanged) {
      res.send(question);
      return;
    }

    if (text) {
      question.text = text;
    }
    if (expirationDate) {
      question.expirationDate = moment(expirationDate).toDate();
    }
    // try saving
    await question.save();

    // send created question back
    res.send(question);
  }));
};
