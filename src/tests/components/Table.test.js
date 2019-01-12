import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Table from '../../components/Table';

// Adpater setup for enzyme

Enzyme.configure({ adapter: new Adapter() });

describe('List component', () => {
  const props = {
    list: [
      { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
      { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' }
    ]
  };

  test('render List without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Table {...props} />, div);
  });

  test('should List compoenent correctly', () => {
    const component = renderer.create(<Table {...props} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should show two item in the list', () => {
    const wrapper = shallow(<Table {...props} />);
    expect(wrapper.find('.table-row').length).toBe(2);
  });
});
