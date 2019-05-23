import React from 'react'
import {Marker, MarkerProps} from 'react-native-maps'
import {observer} from 'mobx-react/native'

interface IProps extends MarkerProps {}

@observer
export default class HackMarker extends React.Component<IProps> {
  mounted = false
  state = {tracking: true}

  componentDidMount() {
    this.mounted = true
    setTimeout(() => this.mounted && this.setState({tracking: false}), 1000)
  }

  componentWillUnmount() {
    this.mounted = false
  }

  componentDidUpdate(_0, previousState) {
    if (previousState.tracking && !this.state.tracking) {
      return
    }
    if (!previousState.tracking && this.state.tracking) {
      return
    }
    if (this.mounted && !this.state.tracking) {
      this.setState({tracking: true})
      setTimeout(() => this.mounted && this.setState({tracking: false}), 500)
    }
  }

  render() {
    const {children, style, ...props} = this.props
    return (
      <Marker
        {...props}
        anchor={{x: 0.5, y: 0.5}}
        tracksViewChanges={this.state.tracking}
        style={[{borderWidth: 1, borderColor: 'red'}, style]}
      >
        {children}
      </Marker>
    )
  }
}
