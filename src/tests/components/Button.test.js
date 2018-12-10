import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../../components/Button';
import { wrap } from 'module';

test('should render Button correctly', () => {
  const component = renderer.create(<Button />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
