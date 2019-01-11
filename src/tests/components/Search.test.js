import React from 'react';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import Search from '../../components/Search';

describe('Search Component', () => {
  test('renders search without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  test('should render Search component correctly', () => {
    const component = renderer.create(<Search />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
