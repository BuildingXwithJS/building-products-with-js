// npm packages
import configureMockStore from 'redux-mock-store';

// our packages
import ProfilePage, {Profile} from '../index';

// create mock store
const mockStore = configureMockStore();

const user = {
  id: '0',
  login: 'test',
  registrationDate: new Date(2016, 1, 1, 1, 1, 1, 1),
};

test('# Profile page wrapper', () => {
  const store = mockStore({auth: {user}, users: {user}});
  const wrapper = shallow(<ProfilePage store={store} />);
  expect(wrapper).toMatchSnapshot();
});

test('# Profile page', () => {
  const getUser = (u) => {
    expect(u).toEqual(user);
  };

  const component = (
    <Profile
      getUser={getUser}
      params={user}
      user={user}
      loadedUser={user}
    />
  );

  // test rendering
  const wrapper = shallow(component);
  expect(wrapper).toMatchSnapshot();
});
