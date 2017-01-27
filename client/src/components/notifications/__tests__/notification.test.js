// npm packages
import configureMockStore from 'redux-mock-store';

// our packages
import NotificationWrapper, {Notification} from '../notification';

// create mock store
const mockStore = configureMockStore();

const notification = {
  id: '0',
  text: 'Test notification',
  alertType: 'test',
};

test('# NotificationWrapper', () => {
  const store = mockStore({});
  const wrapper = shallow(<NotificationWrapper notification={notification} store={store} />);
  expect(wrapper).toMatchSnapshot();
});

test('# Notification', () => {
  const onClick = (id) => expect(id).toBe(notification.id);
  const component = <Notification notification={notification} onRemoveNotificationClick={onClick} />;
  const wrapper = shallow(component);
  expect(wrapper).toMatchSnapshot();
  // test interaction
  const app = mount(component);
  const item = app.find('button');
  item.simulate('click');
});

