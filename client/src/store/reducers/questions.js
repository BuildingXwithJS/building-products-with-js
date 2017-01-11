import * as ActionTypes from '../actionTypes';

const initialState = {questions: [], status: 'inited'};

export const questions = (state = initialState, action) => {
  switch (action.type) {
    // all questions logic
    case ActionTypes.GET_ALL_QUESTIONS:
      return {
        questions: [],
        status: 'loading...',
      };
    case ActionTypes.GET_ALL_QUESTIONS_SUCCESS:
      return {
        questions: action.payload.questions,
        status: 'done',
      };
    // answer questions logic
    case ActionTypes.ANSWER_QUESTION_SUCCESS: {
      const newQuestions = state.questions.map(q => q.id === action.payload.id ? action.payload : q);
      return Object.assign({}, state, {questions: newQuestions});
    }
    case ActionTypes.CREATE_QUESTION_SUCCESS: {
      const newQuestions = [...state.questions, action.payload];
      return {...state, questions: newQuestions};
    }
    case ActionTypes.DELETE_QUESTION_SUCCESS: {
      const newQuestions = state.questions.filter(q => q.id !== action.payload.id);
      return {...state, questions: newQuestions};
    }
    case ActionTypes.UPDATE_QUESTION_SUCCESS: {
      const newQuestions = state.questions.map(q => {
        if (q.id === action.payload.id) {
          return {
            ...action.payload,
            owner: q.owner,
          };
        }
        return q;
      });
      return {...state, questions: newQuestions};
    }
    case ActionTypes.ANSWER_QUESTION_ERROR:
    case ActionTypes.CREATE_QUESTION_ERROR:
    case ActionTypes.GET_ALL_QUESTIONS_ERROR:
    case ActionTypes.DELETE_QUESTION_ERROR:
    case ActionTypes.UPDATE_QUESTION_ERROR:
      return {
        ...state,
        status: 'error',
        error: action.payload.error,
      };
    default:
      return state;
  }
};
