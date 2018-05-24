import React from 'react'
import {Animated} from 'react-native'

export default class extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      fadeAnim: new Animated.Value(0), // init opacity 0
    }
  }

  componentDidMount() {
    Animated.timing(
      // Uses easing functions
      this.state.fadeAnim, // The value to drive
      {toValue: this.props.toValue || 1} // Configuration
    ).start() // Don't forget start!
  }

  render() {
    return (
      <Animated.View style={[{opacity: this.state.fadeAnim}, this.props.style]}>
        {this.props.children}
      </Animated.View>
    )
  }
}
