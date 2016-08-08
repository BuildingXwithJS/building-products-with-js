// our packages
import {User} from '../db';
import {hash, asyncRequest} from '../util';

export default (app) => {
  app.post('/api/register', asyncRequest(async (req, res) => {
    // get user input
    const {login, password, passwordRepeat} = req.body;

    if (password !== passwordRepeat) {
      res.status(400).send({error: 'Passwords do not match!'});
      return;
    }

    const hashedPassword = hash(password);

    const user = new User({
      login,
      password: hashedPassword,
    });
    await user.save();

    res.sendStatus(201);
  }));
};
