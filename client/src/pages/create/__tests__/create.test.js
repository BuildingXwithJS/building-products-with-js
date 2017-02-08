// npm packages
import configureMockStore from 'redux-mock-store';

// our packages
import CreatePage, {Create} from '../index';

// create mock store
const mockStore = configureMockStore();

const user = {
  id: '0',
  login: 'test',
  registrationDate: new Date(2016, 1, 1, 1, 1, 1, 1),
};

test('# Create page wrapper', () => {
  const store = mockStore({auth: {user}});
  const wrapper = shallow(<CreatePage store={store} />);
  expect(wrapper).toMatchSnapshot();
});

test('# Create page', () => {
  const newText = 'newText';
  const newExpirationDate = new Date(2016, 1, 1, 1, 1, 1, 1);
  const doCreateQuestion = ({text, expirationDate}) => {
    expect(text).toBe(newText);
    expect(expirationDate).toBe(newExpirationDate.toISOString());
  };

  const component = (
    <Create
      user={user}
      doCreateQuestion={doCreateQuestion}
    />
  );

  // test rendering
  const wrapper = shallow(component);
  expect(wrapper).toMatchSnapshot();

  // test user update
  const app = mount(component);
  // set new question text
  app.find('#questionText').getDOMNode().value = newText;
  // set new question expiration date
  app.find('#expirationDate').getDOMNode().value = newExpirationDate.toISOString();
  // click answer button
  app.find('button').simulate('click');
});
