// npm packages
import configureMockStore from 'redux-mock-store';

// our packages
import RegisterPage, {Register} from '../index';

// create mock store
const mockStore = configureMockStore();

test('# Register page wrapper', () => {
  const store = mockStore({auth: {redirectToLogin() {}}});
  const wrapper = shallow(<RegisterPage store={store} />);
  expect(wrapper).toMatchSnapshot();
});

test('# Register page', () => {
  const newLogin = 'login123';
  const newPass = 'pwd123';
  const navToLogin = () => expect(true).toBeTruthy();
  const redirectToLogin = 'true';
  const onRegisterClick = ({login, password, passwordRepeat}) => {
    expect(login).toBe(newLogin);
    expect(password).toBe(newPass);
    expect(passwordRepeat).toBe(newPass);
  };

  const component = (
    <Register
      onRegisterClick={onRegisterClick}
      navToLogin={navToLogin}
      redirectToLogin={redirectToLogin}
    />
  );

  // test rendering
  const wrapper = shallow(component);
  expect(wrapper).toMatchSnapshot();

  // mount for testing
  const app = mount(component);
  // set new login, pass and remember
  app.find('#inputUsername').getDOMNode().value = newLogin;
  app.find('#inputPassword').getDOMNode().value = newPass;
  app.find('#inputPasswordRepeat').getDOMNode().value = newPass;
  // click login button
  app.find('button').simulate('click');
});
