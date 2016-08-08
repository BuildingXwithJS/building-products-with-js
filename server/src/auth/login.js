import passport from 'passport';

export default (app) => {
  app.post('/api/login', passport.authenticate('local'), (req, res) => {
    if (req.user) {
      res.send({user: req.user});
    } else {
      res.status(401).send({error: 'Error logging in!'});
    }
  });
};
