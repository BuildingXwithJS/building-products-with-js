// npm packages
import passport from 'passport';

// our packages
import {User} from '../db';
import {asyncRequest} from '../util';

export default (app) => {
  app.get('/api/user/:id', passport.authenticate('jwt', {session: false}), asyncRequest(async (req, res) => {
    if (req.params.id === 'me') {
      res.send(req.user);
      return;
    }

    try {
      const user = await User.get(req.params.id)
        .without(['password'])
        .execute();
      res.send(user);
    } catch (e) {
      res.status(400).send({error: 'User does not exist'});
    }
  }));
};
