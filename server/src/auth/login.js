// npm packages
import passport from 'passport';
import jwt from 'jsonwebtoken';

// our packages
import {auth as authConfig, client as clientConfig} from '../../config';

export default (app) => {
  app.post('/api/login', passport.authenticate('local'), (req, res) => {
    if (req.user) {
      const token = jwt.sign(req.user, authConfig.jwtSecret);
      res.send({user: req.user, token});
    } else {
      res.status(401).send({error: 'Error logging in!'});
    }
  });

  app.get('/api/github/login',
    passport.authenticate('github', {
      scope: authConfig.github.scope,
      accessType: 'offline',
      session: false,
    }));

  app.get('/api/github/callback',
    passport.authenticate('github', {
      failureRedirect: `http://${clientConfig.host}:${clientConfig.port}/dist/redirecting.html#error=authentication failed`,
      session: false}
    ),
    (req, res) => {
      if (req.user) {
        const githubUser = req.user.profile;

        const user = {
          id: `${githubUser.provider}-${githubUser.id}`,
          login: githubUser.username,
          registrationDate: githubUser._json.created_at, // eslint-disable-line no-underscore-dangle
          provider: githubUser.provider,
          accessToken: req.user.accessToken,
        };

        const token = jwt.sign(user, authConfig.jwtSecret);
        res.redirect(
          `http://${clientConfig.host}:${clientConfig.port}/dist/redirecting.html#token=${token}&user=${JSON.stringify(user)}`
        );
      } else {
        res.status(401).send({error: 'Error logging in!'});
      }
    });
};
