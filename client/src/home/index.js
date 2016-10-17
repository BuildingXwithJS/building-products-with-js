import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {helloWorldAction} from '../store';

const mapStateToProps = (state) => ({
  world: state.helloWorld.world,
});

const mapDispatchToProps = (dispatch) => ({
  onClick: () => dispatch(helloWorldAction()),
});


const Home = ({onClick, world}) => (
  <div className="jumbotron">
    <h1>Hello {world}!</h1>
    <button onClick={onClick}>Click me!</button>
    <Link to="/other">other</Link>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
