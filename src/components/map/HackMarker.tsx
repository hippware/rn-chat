import React from 'react'
import {Marker, MarkerProps} from 'react-native-maps'

interface IProps extends MarkerProps {}

export default class HackMarker extends React.Component<IProps> {
  mounted = false
  state = {tracking: true}

  UNSAFE_componentDidMount() {
    this.mounted = true
    setTimeout(() => this.mounted && this.setState({tracking: false}), 1000)
  }

  UNSAFE_componentWillUnmount() {
    this.mounted = false
  }

  UNSAFE_componentDidUpdate(_0, previousState) {
    if (previousState.tracking && !this.state.tracking) {
      return
    }
    if (!previousState.tracking && this.state.tracking) {
      return
    }

    // open up a 0.5 sec window to allow re-rendering
    if (this.mounted && !this.state.tracking) {
      this.setState({tracking: true})
      setTimeout(() => this.mounted && this.setState({tracking: false}), 500)
    }
  }

  render() {
    const {children, style, ...props} = this.props
    return (
      <Marker {...props} tracksViewChanges={this.state.tracking} style={style}>
        {children}
      </Marker>
    )
  }
}
