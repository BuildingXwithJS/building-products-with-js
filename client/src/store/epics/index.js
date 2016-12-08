import {login, register, logout} from './auth';
import {addNotification} from './notifications';
import {helloWorld} from './helloworld';
import {getMoreQuestions, answerQuestion, createQuestion, getAnswers} from './questions';

export default [
  // auth
  login,
  register,
  logout,
  addNotification,
  // hello world
  helloWorld,
  // questions
  getMoreQuestions,
  answerQuestion,
  createQuestion,
  getAnswers,
];
