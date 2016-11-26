import {login, register} from './auth';
import {helloWorld} from './helloworld';
import {getAllQuestions, answerQuestion, createQuestion} from './questions';

export default [
  // auth
  login,
  register,
  // hello world
  helloWorld,
  // questions
  getAllQuestions,
  answerQuestion,
  createQuestion,
];
