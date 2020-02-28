import React, {useEffect} from 'react'
import {StyleSheet, Image, Linking, View, Platform} from 'react-native'
import {colors} from '../../constants'
import {s, minHeight} from '../Global'
import {BlurView} from '@react-native-community/blur'
import {GradientButton, RText} from '../common'
import {WHITE, TRANSLUCENT_WHITE} from 'src/constants/colors'
import {observer} from 'mobx-react'

const MotionWarning = observer(() => {
  useEffect(() => {
    // todo: listen for motion permissions changes and dismiss when enabled
  }, [])

  const settingsName = Platform.OS === 'ios' ? 'Motion & Fitness' : 'Physical Activity'

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Platform.select({ios: 'transparent', android: TRANSLUCENT_WHITE}),
        },
      ]}
    >
      <BlurView blurType="xlight" blurAmount={10} style={StyleSheet.absoluteFill as any} />
      <RText style={styles.title}>{`Allow\r\n${settingsName}`}</RText>

      <RText style={styles.subtext}>
        {`Using "${settingsName}" increases battery efficiency by intelligently toggling location
        tracking while moving.`}
      </RText>

      <Image
        source={require('../../../images/walkingMan.png')}
        style={{width: 145 * minHeight, height: 114 * minHeight, marginVertical: 40 * s}}
      />

      <GradientButton
        isPink
        style={{height: 50, width: '80%', borderRadius: 4, marginBottom: 26 * s, marginTop: 40 * s}}
        onPress={() => Linking.openSettings()}
      >
        <RText color={WHITE} size={18.5}>
          Open Settings
        </RText>
      </GradientButton>
    </View>
  )
})

export default MotionWarning

const styles = StyleSheet.create({
  title: {
    color: colors.PINK,
    fontSize: 30,
    fontFamily: 'Roboto-Light',
    textAlign: 'center',
  },
  subtext: {
    fontFamily: 'Roboto-Light',
    fontSize: 18,
    color: colors.WARM_GREY_2,
    textAlign: 'center',
    width: '70%',
    marginTop: 35,
  },
})
