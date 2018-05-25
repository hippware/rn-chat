import PropTypes from 'prop-types'
import React from 'react'
import {StyleSheet} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

export default class BackgroundGradient extends React.Component<any> {
  render() {
    if (this.props.isDay) {
      return (
        <LinearGradient
          colors={['rgb(255,255,255)', 'rgba(255,255,255,0)']}
          locations={[0, 1]}
          style={[styles.container, this.props.style]}
        />
      )
    } else {
      return (
        <LinearGradient
          colors={['rgb(45,33,55)', 'rgba(48,35,59,0)']}
          locations={[0, 1]}
          style={[styles.container, this.props.style]}
        />
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {},
})
;(BackgroundGradient as any).propTypes = {
  isDay: PropTypes.bool.isRequired,
}
