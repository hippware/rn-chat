import React, {useEffect} from 'react'
import {View, Image, StyleSheet} from 'react-native'
import {width, height} from './Global'
import SplashScreen from 'react-native-splash-screen'

export default props => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <View
      style={[styles.container, {flex: 1, backgroundColor: 'transparent'}]}
      testID="screenLaunch"
    >
      <View style={styles.container}>
        <Image style={{width, height}} source={require('../../images/Launch.gif')} />
      </View>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
