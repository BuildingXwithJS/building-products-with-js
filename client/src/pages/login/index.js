// npm packages
import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

// our packages
import {loginAction} from '../../store/actions';

const mapDispatchToProps = dispatch => ({
  onLoginClick: params => dispatch(loginAction(params)),
});

const Login = ({onLoginClick}) => {
  let usernameInput;
  let passwordInput;
  let rememberInput;

  const handleClick = (e) => {
    e.preventDefault();

    onLoginClick({
      login: usernameInput.value,
      password: passwordInput.value,
      remember: rememberInput.checked,
    });
  };

  return (
    <div className="jumbotron">
      <h2>Experts portal:</h2>
      <p>Please log in. Or <Link to="/register">register</Link></p>

      <form>
        <div className="form-group">
          <label htmlFor="inputUsername">Username:</label>
          <input
            type="text"
            className="form-control"
            id="inputUsername"
            placeholder="Username"
            ref={(i) => { usernameInput = i; }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Password</label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            placeholder="Password"
            ref={(i) => { passwordInput = i; }}
          />
        </div>
        <div className="checkbox">
          <label htmlFor="inputRemember">
            <input
              type="checkbox"
              id="inputRemember"
              ref={(i) => { rememberInput = i; }}
            /> Remember me
          </label>
        </div>
        <button type="submit" className="btn btn-default" onClick={handleClick}>Login</button>
      </form>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Login);
