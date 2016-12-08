import React, {Component} from 'react';
import {connect} from 'react-redux';

import {answerQuestion} from '../../store/actions';

const mapDispatchToProps = dispatch => ({
  doAnswer: payload => dispatch(answerQuestion(payload)),
});

class AddAnswer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let answerInput;
    const {question, doAnswer} = this.props;

    const handleAnswerClick = (e) => {
      e.preventDefault();
      doAnswer({question, answer: answerInput.value});
      answerInput.value = '';
      return false;
    };

    return (
      <div className="panel-footer">
        <form className="form-horizontal">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="answerInput"
              placeholder="Enter your answer..."
              ref={(i) => { answerInput = i; }}
            />
            <span className="input-group-btn">
              <button type="submit" className="btn btn-default" onClick={handleAnswerClick}>
                Answer
              </button>
            </span>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(AddAnswer);
