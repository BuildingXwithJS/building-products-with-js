import React from 'react';
import {Link} from 'react-router';

export default class Home extends React.Component {
  constructor() {
    super();

    this.state = {world: 'world'};
  }

  render() {
    return (
      <div>
        <h1>Hello {this.state.world}!</h1>
        <Link to="/other">other</Link>
      </div>
    );
  }
}
