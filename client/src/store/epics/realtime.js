import * as ActionTypes from '../actionTypes';

export const addObservable = action$ => action$
  .ofType(ActionTypes.ADD_OBSERVABLE)
  .mergeMap(({payload: observable}) =>
    observable.takeUntil(
      action$.ofType(ActionTypes.REMOVE_OBSERVABLE)
      .filter(action => action.payload === observable),
    ),
  );
