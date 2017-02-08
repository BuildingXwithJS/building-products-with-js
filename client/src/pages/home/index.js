// npm packages
import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';

// our packages
import {getAllQuestions, answerQuestion} from '../../store/actions';
import Question from '../../components/question';
import Navbar from '../../components/navbar';

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: _.once(() => dispatch(getAllQuestions())),
  doAnswer: payload => dispatch(answerQuestion(payload)),
});


export const Home = ({fetchQuestions, doAnswer, questions, user}) => {
  fetchQuestions();

  return (
    <div>
      <Navbar user={user} current={'/'} />

      <div>
        {questions.map(question => (
          <Question key={question.id} question={question} onAnswer={doAnswer} />
        ))}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
