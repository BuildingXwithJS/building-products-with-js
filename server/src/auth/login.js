import passport from 'passport';

export default (app) => {
  app.post('/api/login', passport.authenticate('local'), (req, res) => {
    res.send(req.user);
  });
};
