// npm packages
import React from 'react';
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

export class Profile extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  componentWillMount() {
    this.props.getUser(this.props.params);
  }

  render() {
    const {user, loadedUser, params, getUser} = this.props;
    const allowEdit = user && loadedUser && user.id === loadedUser.id;

    return (
      <div>
        <Navbar user={user} current={`/profile/${params.id}`} />

        <User user={loadedUser} edit={allowEdit} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
