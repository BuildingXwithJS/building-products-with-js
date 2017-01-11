// npm packages
import React from 'react';
import _ from 'lodash';
import {Link} from 'react-router';
import {connect} from 'react-redux';

// our packages
import {getUser} from '../../store/actions';
import Navbar from '../../components/navbar';
import User from '../../components/user';

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loadedUser: state.users.user,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: payload => dispatch(getUser(payload)),
});

class Home extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  componentWillMount() {
    this.props.getUser(this.props.params);
  }

  render() {
    const {user, loadedUser, params, getUser} = this.props;

    return (
      <div>
        <Navbar user={user} current={`/profile/${params.id}`} />

        <User user={loadedUser} />
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
