jest.mock('VirtualizedList', () => {
  const RealComponent = (jest as any).requireActual('VirtualizedList')
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
