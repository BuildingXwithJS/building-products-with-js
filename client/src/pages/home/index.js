// npm packages
import React from 'react';
import {connect} from 'react-redux';
import MediaQuery from 'react-responsive';

// our packages
import {QuestionList, QuestionSingle} from '../../components/question';

const mapStateToProps = state => ({
  questions: state.questions.questions,
});

const Home = ({questions}) => (
  <div className="container">
    <MediaQuery query="(min-width: 992px)">
      {(matches) => {
        if (matches) {
          return <QuestionList questions={questions} />;
        } else {
          return <QuestionSingle questions={questions} />;
        }
      }}
    </MediaQuery>
  </div>
);

export default connect(mapStateToProps)(Home);
