import {thinky} from './thinky';

export const Question = thinky.createModel('Question', {
  text: thinky.type.string().required(),
  creationDate: thinky.type.date().default(thinky.r.now()),
  expirationDate: thinky.type.date().required(),
  answers: thinky.type.array().schema(
    thinky.type.object().schema({
      user: thinky.type.string().required(),
      answer: thinky.type.string().required(),
    })
  ).default([]),
  owner: thinky.type.string().required(),
});
