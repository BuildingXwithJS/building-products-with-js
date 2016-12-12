// npm packages
import React from 'react';
import MediaQuery from 'react-responsive';

// our packages
import {QuestionList, QuestionSingle} from '../../components/question';

const Home = () => (
  <div className="container">
    <MediaQuery query="(min-width: 992px)">
      {(matches) => {
        if (matches) {
          return <QuestionList />;
        } else {
          return <QuestionSingle />;
        }
      }}
    </MediaQuery>
  </div>
);

export default Home;
