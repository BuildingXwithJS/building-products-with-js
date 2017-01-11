import {login, register} from './auth';
import {addNotification} from './notifications';
import {helloWorld} from './helloworld';
import {getAllQuestions, answerQuestion, createQuestion, deleteQuestion} from './questions';
import {getUser, updateUser} from './users';

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
  deleteQuestion,
  // users
  getUser,
  updateUser,
];
