// npm packages
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

// our packages
import {User} from '../db';
import {hash} from '../util';

// define serialize and deserialize functions
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  let user = null;
  try {
    user = await User.get(id).run();
  } catch (e) {
    done(e, false);
    return;
  }

  done(null, user);
});

// use LocalStrategy
passport.use(new LocalStrategy({usernameField: 'login'}, async (login, password, done) => {
  // find all users with matching login
  const users = await User.filter({login}).limit(1).run();
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
  return done(null, user);
}));
