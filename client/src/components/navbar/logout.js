import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {logoutAction} from '../../store/actions';

const mapDispatchToProps = dispatch => ({
  onLogoutClick: () => dispatch(logoutAction()),
});

const Logout = ({onLogoutClick}) => {
  const handleLogoutClick = (e) => {
    e.preventDefault();
    onLogoutClick();
  };

  return (
    <li>
      <a href="#" onClick={handleLogoutClick}>logout</a>
    </li>
  );
};

Logout.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Logout);
