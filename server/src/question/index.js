// our packages
import get from './get';
import create from './create';
// import update from './update';
// import delete from './delete';

export default (app) => {
  get(app);
  create(app);
  // update(app);
  // delete(app);
};
