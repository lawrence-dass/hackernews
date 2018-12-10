import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import List from '../../components/List';

describe('List component', () => {
  const props = {
    list: [
      { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
      { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' }
    ]
  };

  test('render List without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<List {...props} />, div);
  });

  test('should List compoenent correctly', () => {
    const component = renderer.create(<List />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
