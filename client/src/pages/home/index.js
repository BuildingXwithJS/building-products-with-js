// npm packages
import React from 'react';
import _ from 'lodash';
import {Link} from 'react-router';
import {connect} from 'react-redux';

// our packages
import {getAllQuestions, answerQuestion} from '../../store/actions';
import Question from '../../components/question';

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: _.once(() => dispatch(getAllQuestions())),
  doAnswer: payload => dispatch(answerQuestion(payload)),
});


const Home = ({fetchQuestions, doAnswer, questions}) => {
  fetchQuestions();

  return (
    <div className="container">
      {questions.map(question => (
        <Question key={question.id} question={question} onAnswer={doAnswer} />
      ))}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
