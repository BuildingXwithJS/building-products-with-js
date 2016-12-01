// npm packages
import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

// our packages
import {registerAction} from '../../store/actions';

const mapDispatchToProps = dispatch => ({
  onRegisterClick: params => dispatch(registerAction(params)),
});

const Register = ({onRegisterClick}) => {
  let usernameInput;
  let passwordInput;
  let passwordInputRepeat;

  const handleClick = (e) => {
    e.preventDefault();

    onRegisterClick({
      login: usernameInput.value,
      password: passwordInput.value,
      passwordRepeat: passwordInputRepeat.value,
    });
  };

  return (
    <div className="container" style={{marginTop: '100px'}}>
      <div className="jumbotron">
        <h2>Experts portal:</h2>
        <p>Please register. Or <Link to="/login">login</Link></p>

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
          <div className="form-group">
            <label htmlFor="inputPasswordRepeat">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPasswordRepeat"
              placeholder="Repeat password"
              ref={(i) => { passwordInputRepeat = i; }}
            />
          </div>
          <button type="submit" className="btn btn-default" onClick={handleClick}>Register</button>
        </form>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Register);
