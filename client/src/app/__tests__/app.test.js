import App from '../index';

test('# App', () => {
  const wrapper = shallow(
    <App>test</App>
  );
  expect(wrapper).toMatchSnapshot();
});
