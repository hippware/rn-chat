import React from 'react'
import {StyleSheet} from 'react-native'
import {BlurView} from 'react-native-blur'
import {k} from '../Global'

const HeaderOverlay = ({children}) => (
  <BlurView blurType="xlight" blurAmount={10} style={styles.container}>
    {children}
  </BlurView>
)

export default HeaderOverlay

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    padding: 20 * k,
    paddingTop: 35 * k,
    paddingHorizontal: 30 * k,
    alignItems: 'center',
  },
})
