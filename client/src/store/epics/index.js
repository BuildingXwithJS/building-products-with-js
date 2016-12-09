import {initAuth, login, register, logout} from './auth';
import {addNotification} from './notifications';
import {addObservable, openConnection, closeConnection} from './realtime';
import {helloWorld} from './helloworld';
import {getMoreQuestions, answerQuestion, createQuestion, getAnswers} from './questions';

export default [
  // auth
  initAuth,
  login,
  register,
  logout,
  addNotification,
  addObservable,
  openConnection,
  closeConnection,
  // hello world
  helloWorld,
  // questions
  getMoreQuestions,
  answerQuestion,
  createQuestion,
  getAnswers,
];
