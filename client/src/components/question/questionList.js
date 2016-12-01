import React from 'react';

import Question from './question';

const QuestionList = ({questions, doAnswer}) => (
  <div>
    {questions.map(question => (
      <Question key={question.id} question={question} doAnswer={doAnswer} />
    ))}
  </div>
);

export default QuestionList;
