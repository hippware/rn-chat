jest.doMock('VirtualizedList', () => {
  const RealComponent = require.requireActual('VirtualizedList')
  const React2 = require('React')
  class VirtualizedList extends React2.Component {
    render() {
      delete this.props.getScrollableNode
      return React2.createElement('VirtualizedList', this.props, this.props.children)
    }
  }
  VirtualizedList.propTypes = RealComponent.propTypes
  return VirtualizedList
})
