// npm packages
import React from 'react';
import _ from 'lodash';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import MediaQuery from 'react-responsive';

// our packages
import {getAllQuestions, answerQuestion} from '../../store/actions';
import {QuestionList, QuestionSingle} from '../../components/question';

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
      <MediaQuery query="(min-width: 992px)">
        {(matches) => {
          if (matches) {
            return <QuestionList questions={questions} doAnswer={doAnswer} />;
          } else {
            return <QuestionSingle questions={questions} doAnswer={doAnswer} />;
          }
        }}
      </MediaQuery>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
