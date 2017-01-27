// npm packages
import configureMockStore from 'redux-mock-store';

// our packages
import UserWrapper, {User} from '../index';

// create mock store
const mockStore = configureMockStore();

const user = {
  id: '0',
  login: 'test',
  registrationDate: new Date(2016, 1, 1, 1, 1, 1, 1),
};

test('# UserWrapper', () => {
  const store = mockStore({});
  const wrapper = shallow(<UserWrapper user={user} store={store} />);
  expect(wrapper).toMatchSnapshot();
});

test('# User', () => {
  const newLogin = 'newLogin';
  const updateUser = ({login}) => expect(login).toBe(newLogin);

  const component = (
    <User
      user={user}
      updateUser={updateUser}
      edit
    />
  );

  // test rendering
  const wrapper = shallow(component);
  expect(wrapper).toMatchSnapshot();

  // test user update
  const app = mount(component);
  // set new username
  app.find('#loginInput').getDOMNode().value = newLogin;
  // click answer button
  app.find('button').simulate('click');
});
