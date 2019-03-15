import React from 'react'
import {StyleSheet, View, Platform} from 'react-native'
import {BlurView} from 'react-native-blur'
import {k} from '../Global'
import globalStyles from '../styles'
import {TRANSLUCENT_WHITE} from 'src/constants/colors'

const HeaderOverlay = ({children}) => (
  <View
    style={
      [
        globalStyles.absolute,
        styles.container,
        {backgroundColor: Platform.select({ios: 'transparent', android: TRANSLUCENT_WHITE})},
      ] as any
    }
  >
    {Platform.OS === 'ios' && (
      <BlurView blurType="xlight" blurAmount={10} style={globalStyles.absolute} />
    )}
    {children}
  </View>
)

export default HeaderOverlay

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20 * k,
    paddingTop: 35 * k,
    paddingHorizontal: 30 * k,
    alignItems: 'center',
  },
})
