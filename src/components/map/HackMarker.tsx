import React from 'react'
import {MarkerAnimated, Marker, MarkerProps} from 'react-native-maps'
import {observer} from 'mobx-react/native'

interface IProps extends MarkerProps {
  scale?: number
}

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
    const {scale, children, style, ...props} = this.props
    const y = scale === 1 ? 0.5 : 1 // fullMap ? -35 : -106
    const Wrapper = !!scale ? MarkerAnimated : Marker
    return (
      <Wrapper
        {...props}
        anchor={{x: 0.5, y}}
        tracksViewChanges={this.state.tracking}
        style={[{top: -2000}, style]} // DIRTY workaround to catch all onPress events for the marker.
      >
        {children}
      </Wrapper>
    )
  }
}
