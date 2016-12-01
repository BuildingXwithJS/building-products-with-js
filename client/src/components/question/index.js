import React from 'react';

export default ({question, onAnswer}) => {
  let answerInput;

  const handleClick = (e) => {
    e.preventDefault();
    onAnswer({question, answer: answerInput.value});
    answerInput.value = '';
    return false;
  };

  return (
    <div className="panel panel-default">
      <div className="panel-heading">{question.text}</div>
      <div className="panel-body">
        {question.answers.length > 0 ? (
          <ul className="list-group">
            {question.answers.map((answer, i) => (
              <li className="list-group-item" key={i}>{answer.answer}</li>
            ))}
          </ul>
        ) : 'No answers yet'}
      </div>
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
                <button type="submit" className="btn btn-default" onClick={handleClick}>
                  Answer
                </button>
              </span>
          </div>
        </form>
      </div>
    </div>
  );
};
