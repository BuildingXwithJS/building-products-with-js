// npm packages
import configureMockStore from 'redux-mock-store';

// our packages
import HomePage, {Home} from '../index';

// create mock store
const mockStore = configureMockStore();

const user = {
  id: '0',
  login: 'test',
  registrationDate: new Date(2016, 1, 1, 1, 1, 1, 1),
};

test('# Home page wrapper', () => {
  const store = mockStore({auth: {user}, questions: {questions: []}});
  const wrapper = shallow(<HomePage store={store} />);
  expect(wrapper).toMatchSnapshot();
});

test('# Home page', () => {
  const questions = [];
  const fetchQuestions = () => {
    questions.push({
      id: 0,
      owner: user,
      text: 'Question text',
      answers: [{answer: 'Test answer'}],
    });
  };

  const component = (
    <Home
      user={user}
      questions={questions}
      fetchQuestions={fetchQuestions}
      doAnswer={() => {}}
    />
  );

  // test rendering
  const wrapper = shallow(component);
  expect(wrapper).toMatchSnapshot();
});
