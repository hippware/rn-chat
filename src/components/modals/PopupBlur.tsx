import React from 'react'
import {StyleSheet, View, ViewStyle, Platform} from 'react-native'
import {BlurView} from 'react-native-blur'
import {k} from '../Global'
import {CloseButton} from '../common'
import globalStyles from '../styles'
import {TRANSLUCENT_WHITE} from 'src/constants/colors'

type Props = {
  containerStyle?: ViewStyle
  children: any
  showCloseButton?: boolean
}

const PopupBlur = ({children, containerStyle, showCloseButton}: Props) => (
  <View
    style={[
      globalStyles.absolute,
      {backgroundColor: Platform.select({ios: 'transparent', android: TRANSLUCENT_WHITE})},
    ]}
  >
    {Platform.OS === 'ios' && (
      <BlurView
        blurType="light"
        blurAmount={15}
        style={
          [
            globalStyles.absolute,
            {
              alignItems: 'stretch',
              justifyContent: 'center',
              backgroundColor: TRANSLUCENT_WHITE,
            },
          ] as any
        }
      />
    )}
    <View style={[styles.container, containerStyle]}>{children}</View>
    {showCloseButton && <CloseButton style={styles.closeButton} />}
  </View>
)

export default PopupBlur

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 35 * k,
    left: 13 * k,
  },
})
