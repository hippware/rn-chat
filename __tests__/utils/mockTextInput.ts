// mock autofocus: https://github.com/facebook/jest/issues/3707#issuecomment-311169259
export default jest.mock('TextInput', () => {
  // TODO: @types/jest broken for `requireActual`
  const RealComponent = (jest as any).requireActual('TextInput')
  const React = require('React')
  class TextInput extends React.Component {
    render() {
      // delete this.props.autoFocus
      return React.createElement('TextInput', this.props, this.props.children)
    }
  }
  TextInput.propTypes = RealComponent.propTypes
  return TextInput
})
