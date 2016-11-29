import {login, register} from './auth';
import {addNotification} from './notifications';
import {helloWorld} from './helloworld';

export default [
  // auth
  login,
  register,
  addNotification,
  // hello world
  helloWorld,
];
