import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from '../../components/Button';

Enzyme.configure({ adapter: new Adapter() });

describe('Button Component', () => {
  test('should render Button component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('should render Button correctly', () => {
    const component = renderer.create(<Button> Awesome Button </Button>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should have button element', () => {
    const wrapper = shallow(<Button className="test" />);
    expect(wrapper.find('.test').length).toBe(1);
  });
});
