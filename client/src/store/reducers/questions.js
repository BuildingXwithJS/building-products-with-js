import * as ActionTypes from '../actionTypes';

const initialState = {questions: [], status: 'inited', hasMore: true};

export const questions = (state = initialState, action) => {
  switch (action.type) {
    // all questions logic
    case ActionTypes.GET_MORE_QUESTIONS:
      return {...state, status: 'loading', error: null};
    case ActionTypes.GET_MORE_QUESTIONS_SUCCESS: {
      const hasMore = action.payload.questions.length === 10;
      return {...state, questions: state.questions.concat(action.payload.questions), status: 'done', hasMore};
    }
    case ActionTypes.GET_ANSWERS_ERROR:
    case ActionTypes.ANSWER_QUESTION_ERROR:
    case ActionTypes.CREATE_QUESTION_ERROR:
      return {
        ...state,
        status: 'error',
        error: action.payload.error,
      };
    case ActionTypes.GET_ANSWERS_SUCCESS:
    case ActionTypes.ANSWER_QUESTION_SUCCESS: {
      const newQuestions = state.questions.map(q => q.id === action.payload.id ? action.payload : q);
      return {questions: newQuestions, status: 'done', hasMore: state.hasMore};
    }
    case ActionTypes.ANSWER_QUESTION: {
      return {...state, status: {answering: action.payload.question.id}};
    }
    case ActionTypes.CREATE_QUESTION_SUCCESS: {
      const newQuestions = [action.payload, ...state.questions];
      return {questions: newQuestions, status: 'done', hasMore: state.hasMore};
    }
    default:
      return state;
  }
};
