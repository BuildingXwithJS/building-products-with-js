// npm packages
import configureMockStore from 'redux-mock-store';

// our packages
import LoginPage, {Login} from '../index';

// create mock store
const mockStore = configureMockStore();

const user = {
  id: '0',
  login: 'test',
  registrationDate: new Date(2016, 1, 1, 1, 1, 1, 1),
};

test('# Login page wrapper', () => {
  const store = mockStore({auth: {user}});
  const wrapper = shallow(<LoginPage store={store} />);
  expect(wrapper).toMatchSnapshot();
});

test('# Login page', () => {
  const newLogin = 'test';
  const newPassword = '123';
  const token = 'asd';
  const navToHome = () => expect(true).toBeTruthy();
  const onLoginClick = ({login, password, remember}) => {
    expect(login).toBe(newLogin);
    expect(password).toBe(newPassword);
    expect(remember).toBeTruthy();
  };

  const component = (
    <Login
      token={token}
      navToHome={navToHome}
      onLoginClick={onLoginClick}
    />
  );

  // test rendering
  const wrapper = shallow(component);
  expect(wrapper).toMatchSnapshot();

  // mount for testing
  const app = mount(component);
  // set new login, pass and remember
  app.find('#inputUsername').getDOMNode().value = newLogin;
  app.find('#inputPassword').getDOMNode().value = newPassword;
  app.find('#inputRemember').getDOMNode().checked = true;
  // click login button
  app.find('button').simulate('click');
});
