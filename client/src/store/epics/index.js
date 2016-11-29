import {login, register} from './auth';
import {addNotification} from './notifications';
import {helloWorld} from './helloworld';
import {getAllQuestions, answerQuestion, createQuestion} from './questions';

export default [
  // auth
  login,
  register,
  addNotification,
  // hello world
  helloWorld,
  // questions
  getAllQuestions,
  answerQuestion,
  createQuestion,
];
