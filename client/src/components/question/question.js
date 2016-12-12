import React, {Component} from 'react';

import Answers from './answers.js';
import AddAnswer from './addAnswer.js';

class Question extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
    };
  }

  render() {
    const {question} = this.props;
    const {collapse} = this.state;

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
        {collapse ? null : <Answers question={question} loading />}
        {collapse ? null : <AddAnswer question={question} />}
      </div>
    );
  }
}
export default Question;
