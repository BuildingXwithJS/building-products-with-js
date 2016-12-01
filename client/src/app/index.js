// npm packages
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import Header from '../components/header';
import Footer from '../components/footer';

const mapStateToProps = state => ({
  actualPath: state.routing.locationBeforeTransitions && state.routing.locationBeforeTransitions.pathname,
  user: state.auth.user,
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  navTo: (path) => dispatch(push(path)),
});

class App extends Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.token !== nextProps.token) {
      if (nextProps.token) {
        return this.props.navTo('/');
      } else {
        return this.props.navTo('/login');
      }
    }
  }

  render() {
    const {children} = this.props;
    return (
      <div className="container">
        <Header {...this.props} />
        {children}
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
