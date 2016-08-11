// our packages
import get from './get';
import create from './create';
import update from './update';
import deleteQuestion from './delete';

export default (app) => {
  get(app);
  create(app);
  update(app);
  deleteQuestion(app);
};
