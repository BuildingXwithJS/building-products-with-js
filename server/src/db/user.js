import {thinky} from './thinky';

export const User = thinky.createModel('User', {
  email: thinky.type.string().required(),
  login: thinky.type.string().required(),
  password: thinky.type.string().required(),
  registrationDate: thinky.type.date().default(thinky.r.now()),
});
