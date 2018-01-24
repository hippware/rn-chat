// @flow
/* global test */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('VirtualizedList', () => {
  const RealComponent = require.requireActual('VirtualizedList');
  const React2 = require('React');
  class VirtualizedList extends React2.Component {
    render() {
      delete this.props.getScrollableNode;
      return React2.createElement('VirtualizedList', this.props, this.props.children);
    }
  }
  VirtualizedList.propTypes = RealComponent.propTypes;
  return VirtualizedList;
});

jest.mock('TextInput', () => {
  const RealComponent = require.requireActual('TextInput');
  const React2 = require('React');
  class TextInput extends React2.Component {
    render() {
      delete this.props.autoFocus;
      return React2.createElement('TextInput', this.props, this.props.children);
    }
  }
  TextInput.propTypes = RealComponent.propTypes;
  return TextInput;
});

// @TODO: mocks
// import BotCompose from '../src/components/BotCompose';
// import Card from '../src/components/Card';

describe('Testing jest', () => {
  test('Card', () => {
    // const tree = renderer.create(<Card />).toJSON();
    // expect(tree).toMatchSnapshot();
  });

  test('BotCompose', () => {
    // console.log('something');
    // const tree = renderer.create(<BotCompose />).toJSON();
    // expect(tree).toMatchSnapshot();
  });
});
