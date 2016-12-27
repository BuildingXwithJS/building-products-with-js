// npm packages
import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import moment from 'moment';

// our packages
import {createQuestion} from '../../store/actions';

const mapStateToProps = (state) => ({
  // questions: state.questions.questions,
});

const mapDispatchToProps = (dispatch) => ({
  doCreateQuestion: payload => dispatch(createQuestion(payload)),
});


const Create = ({doCreateQuestion}) => {
  let questionText;
  let questionDate;

  const handleCreate = (e) => {
    e.preventDefault();

    const text = questionText.value;
    const expirationDate = moment(questionDate.value).toISOString();

    doCreateQuestion({text, expirationDate});

    return false;
  };

  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="questionText">Question text</label>
          <input
            type="text"
            className="form-control"
            id="questionText"
            placeholder="Question text"
            ref={(t) => { questionText = t; }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="expirationDate">Expiration date</label>
          <input
            type="date"
            className="form-control"
            id="expirationDate"
            placeholder="Expiration date"
            ref={(d) => { questionDate = d; }}
          />
        </div>
        <button type="submit" className="btn btn-default" onClick={handleCreate}>
          Create new question
        </button>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
