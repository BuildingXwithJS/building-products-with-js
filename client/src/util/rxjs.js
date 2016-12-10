import {Observable} from 'rxjs/Observable';

Observable.prototype.delayInDebug = function(...options) {
  if (process.env && process.env.NODE_ENV === 'development') {
    return this.delay(...options);
  }
  return this.share();
};
