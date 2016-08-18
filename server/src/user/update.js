// npm packages
import passport from 'passport';

// our packages
import {loginTaken} from '../auth';
import {User} from '../db';
import {hash, asyncRequest} from '../util';

export default (app) => {
  app.post('/api/user/:id', passport.authenticate('jwt', {session: false}), asyncRequest(async (req, res) => {
    const {login, password, passwordRepeat} = req.body;

    // check if user is changing his own profile
    if (req.user.id !== req.params.id) {
      res.status(403).send({error: 'Not enough rights to change other user profile!'});
      return;
    }

    let user;
    try {
      user = await User.get(req.params.id);
    } catch (e) {
      res.status(400).send({error: 'User does not exist'});
      return;
    }

    // check if user exists
    if (!user) {
      res.status(400).send({error: 'User does not exist'});
      return;
    }

    // check if data is actually changed
    const loginChanged = login && user.login !== login;
    const passwordChanged = password && user.password !== hash(password);
    // if not - just send OK
    if (!loginChanged && !passwordChanged) {
      delete user.password;
      res.send(user);
      return;
    }

    // check passwords for match
    if (passwordChanged && password !== passwordRepeat) {
      res.status(400).send({error: 'Passwords do not match!'});
      return;
    }

    // check if new login is taken
    if (loginChanged && await loginTaken(login)) {
      res.status(400).send({error: 'Login already taken!'});
      return;
    }

    // update data
    if (login) {
      user.login = login;
    }
    if (password) {
      user.password = hash(password);
    }
    // try to save
    await user.save();

    // send succcess
    delete user.password;
    res.send(user);
  }));
};
