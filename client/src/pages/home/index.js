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
    <div>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Brand</Link>
          </div>

          <ul className="nav navbar-nav">
            <li>
              <Link to="/">Browse questions</Link>
            </li>
            <li>
              <Link to="/create">Create new question</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div>
        {questions.map(question => (
          <Question key={question.id} question={question} onAnswer={doAnswer} />
        ))}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
