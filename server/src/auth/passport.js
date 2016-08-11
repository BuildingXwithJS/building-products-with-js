// npm packages
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';

// our packages
import {User} from '../db';
import {hash} from '../util';
import {auth as authConfig} from '../../config';

// define serialize and deserialize functions
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  let user = null;
  try {
    user = await User.get(id)
      .without(['password'])
      .execute();
  } catch (e) {
    done(e, false);
    return;
  }

  done(null, user);
});

// use LocalStrategy
passport.use(new LocalStrategy({usernameField: 'login'}, async (login, password, done) => {
  // find all users with matching login
  let users = [];
  try {
    users = await User.filter({login}).limit(1).run();
  } catch (e) {
    return done(e, false);
  }
  // get the first match
  const user = users[0];
  // check if exists
  if (!user) {
    return done(null, false);
  }
  // compare password
  if (user.password !== hash(password)) {
    return done(null, false);
  }
  // return user if successful
  delete user.password;
  return done(null, user);
}));

// use JWTStrategy
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromHeader('x-access-token'),
  secretOrKey: authConfig.jwtSecret,
};
passport.use(new JwtStrategy(jwtOpts, async (payload, done) => {
  let user;
  try {
    user = await User.get(payload.id)
      .without(['password'])
      .execute();
  } catch (e) {
    return done(e, false);
  }
  // check if exists
  if (!user) {
    return done(null, false);
  }
  // return user if successful
  return done(null, user);
}));
