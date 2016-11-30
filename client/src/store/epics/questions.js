import {Observable} from 'rxjs/Observable';
import * as ActionTypes from '../actionTypes';
import * as Actions from '../actions';
import {signRequest, ajaxErrorToMessage} from '../../util';

export const getAllQuestions = action$ => action$
  .ofType(ActionTypes.GET_ALL_QUESTIONS)
  .map(signRequest)
  .switchMap(({headers}) => Observable
    .ajax.get('http://localhost:8080/api/question', headers)
    .map(res => res.response)
    .map(questions => ({
      type: ActionTypes.GET_ALL_QUESTIONS_SUCCESS,
      payload: {questions},
    }))
    .catch(error => Observable.of(
      {
        type: ActionTypes.GET_ALL_QUESTIONS_ERROR,
        payload: {error},
      },
      Actions.addNotificationAction(
        {text: `[get all questions] Error: ${ajaxErrorToMessage(error)}`, alertType: 'danger'},
      ),
    )),
  );

export const answerQuestion = action$ => action$
  .ofType(ActionTypes.ANSWER_QUESTION)
  .map(signRequest)
  .switchMap(({headers, payload}) => Observable
    .ajax.post(`http://localhost:8080/api/question/${payload.question.id}/answer`, {answer: payload.answer}, headers)
    .map(res => res.response)
    .mergeMap(question => Observable.of(
      {
        type: ActionTypes.ANSWER_QUESTION_SUCCESS,
        payload: question,
      },
      Actions.addNotificationAction(
        {text: `Answer: "${payload.answer}" added to question: "${question.text}"`, alertType: 'info'},
      ),
    ))
    .catch(error => Observable.of(
      {
        type: ActionTypes.ANSWER_QUESTION_ERROR,
        payload: {error},
      },
      Actions.addNotificationAction(
        {text: `[answer create] Error: ${ajaxErrorToMessage(error)}`, alertType: 'danger'},
      ),
    )),
  );

export const createQuestion = action$ => action$
  .ofType(ActionTypes.CREATE_QUESTION)
  .map(signRequest)
  .switchMap(({headers, payload}) => Observable
    .ajax.post('http://localhost:8080/api/question', payload, headers)
    .map(res => res.response)
    .mergeMap(question => Observable.of(
      {
        type: ActionTypes.CREATE_QUESTION_SUCCESS,
        payload: question,
      },
      Actions.addNotificationAction(
        {text: `Question with text "${question.text}" created`, alertType: 'info'},
      ),
    ))
    .catch(error => Observable.of(
      {
        type: ActionTypes.CREATE_QUESTION_ERROR,
        payload: {error},
      },
      Actions.addNotificationAction(
        {text: `[question create] Error: ${ajaxErrorToMessage(error)}`, alertType: 'danger'},
      ),
    )),
  );
