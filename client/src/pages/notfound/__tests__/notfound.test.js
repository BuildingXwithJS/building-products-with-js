// our packages
import NotFoundPage from '../index';

test('# Not found page', () => {
  const wrapper = shallow(<NotFoundPage />);
  expect(wrapper).toMatchSnapshot();
});
