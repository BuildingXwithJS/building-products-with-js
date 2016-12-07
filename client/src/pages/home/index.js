// npm packages
import React, {Component} from 'react';
import {connect} from 'react-redux';
import MediaQuery from 'react-responsive';

// our packages
import {getAllQuestions, answerQuestion} from '../../store/actions';
import {QuestionList, QuestionSingle} from '../../components/question';

const mapStateToProps = state => ({
  questions: state.questions.questions,
});

const mapDispatchToProps = dispatch => ({
  fetchQuestions: () => dispatch(getAllQuestions()),
  doAnswer: payload => dispatch(answerQuestion(payload)),
});


class Home extends Component {

  componentWillMount() {
    this.props.fetchQuestions();
  }

  render() {
    const {doAnswer, questions} = this.props;

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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
