import React from 'react';
import renderer from 'react-test-renderer';
import Search from '../../components/Search';

test('should render Search component correctly', () => {
  const component = renderer.create(<Search />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
