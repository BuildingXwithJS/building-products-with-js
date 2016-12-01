import React, {Component} from 'react';

import Question from './question';

const showQuestions = (question, doAnswer, leftEnable, rightEnable, onClick) => {
  return (
    <div>
      <Question question={question} doAnswer={doAnswer} />
      <div className="btn-group col-xs-4 col-xs-offset-5" role="group">
        <button type="button" className="btn btn-default" aria-label="Left Align" disabled={!leftEnable} onClick={() => onClick(-1)}>
          <span className="glyphicon glyphicon-arrow-left" aria-hidden="true" />
        </button>
        <button type="button" className="btn btn-default" aria-label="Left Align" disabled={!rightEnable} onClick={() => onClick(+1)}>
          <span className="glyphicon glyphicon-arrow-right" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

class QuestionSingle extends Component {
  constructor(props) {
    super(props);
    const {questions} = props;
    this.state = {
      questionIndex: 0,
    };
  }

  render() {
    const {questions, doAnswer} = this.props;
    const {questionIndex} = this.state;
    const question = questions[questionIndex];
    const handleClick = (inc) => {
      this.setState({
        questionIndex: questionIndex + inc,
      });
      return false;
    };

    return (
      <div>
        {
         question ?
            showQuestions(question, doAnswer, questionIndex > 0, questionIndex < questions.length - 1, handleClick)
         :
            <div>No questions yet!</div>
        }
      </div>
    );
  }
}

export default QuestionSingle;
