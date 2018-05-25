import React from 'react'
import {StyleSheet} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {colors} from '../constants'
import PropTypes from 'prop-types'

export default class BackgroundGradient extends React.Component<any> {
  render() {
    if (this.props.isDay) {
      return (
        <LinearGradient
          colors={[colors.WHITE, 'rgb(241,242,244)', 'rgb(243,244,246)']}
          locations={[0, 0.2, 1]}
          style={styles.container}
        />
      )
    } else {
      return (
        <LinearGradient
          colors={['rgb(45,33,55)', 'rgb(48,35,59)']}
          locations={[0, 1]}
          style={styles.container}
        />
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})
;(BackgroundGradient as any).propTypes = {
  isDay: PropTypes.bool.isRequired,
}
