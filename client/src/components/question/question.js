import React, {Component} from 'react';

class Question extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
    };
  }

  render() {
    const {question, doAnswer} = this.props;
    const {collapse} = this.state;
    let answerInput;

    const handleAnswerClick = (e) => {
      e.preventDefault();
      doAnswer({question, answer: answerInput.value});
      answerInput.value = '';
      return false;
    };

    const handleCollapseClick = (e) => {
      e.preventDefault();
      this.setState({
        collapse: !this.state.collapse,
      });
      return false;
    };

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <span className={`glyphicon glyphicon-${collapse ? 'plus' : 'minus'}`}
            style={{cursor: 'pointer'}}
            onClick={handleCollapseClick} />{' '}
          {question.text}
        </div>
        {collapse ? null :
        <div className="panel-body">
          {question.answers.length > 0 ? (
            <ul className="list-group">
              {question.answers.map((answer, i) => (
                <li className="list-group-item" key={i}>{answer.answer}</li>
              ))}
            </ul>
          ) : 'No answers yet'}
        </div>
        }
        {collapse ? null :
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
      }
      </div>
    );
  }
}
export default Question;
