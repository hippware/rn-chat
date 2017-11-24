// @flow

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
