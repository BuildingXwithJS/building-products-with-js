import {login, register, logout} from './auth';
import {addNotification} from './notifications';
import {addObservable} from './realtime';
import {helloWorld} from './helloworld';
import {getMoreQuestions, answerQuestion, createQuestion, getAnswers} from './questions';

export default [
  // auth
  login,
  register,
  logout,
  addNotification,
  addObservable,
  // hello world
  helloWorld,
  // questions
  getMoreQuestions,
  answerQuestion,
  createQuestion,
  getAnswers,
];
