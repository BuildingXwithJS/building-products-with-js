// npm packages
import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';

// our packages
import {updateUser} from '../../store/actions';

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
  updateUser: payload => dispatch(updateUser(payload)),
});

export const User = ({user, edit, updateUser}) => {
  let userInput;

  const saveUser = () => {
    updateUser({
      ...user,
      login: userInput.value,
    });
  };

  return user ? (
    <div className="panel panel-default" key={user.id}>
      <div className="panel-heading">
        User: {edit ? (
          <input type="text" id="loginInput" ref={i => { userInput = i; } } defaultValue={user.login} />
        ) : user.login }

        {edit && (
          <div className="pull-right">
            <button className="btn btn-default" onClick={saveUser}>
              Save
            </button>
          </div>
        )}
      </div>
      <div className="panel-body">
        Registration date: {moment(user.registrationDate).toString()}
      </div>
    </div>
  ) : null;
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
