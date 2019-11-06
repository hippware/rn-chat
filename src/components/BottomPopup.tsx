import React from 'react'
import {View, Image, StyleSheet, ViewStyle, TouchableOpacity} from 'react-native'
import {useHomeStore} from 'src/utils/injectors'
import {observer} from 'mobx-react'
import {Actions} from 'react-native-router-flux'

type Props = {
  children: any
  style?: ViewStyle
  preview?: boolean
}

const previewBtnUpImg = require('../../images/previewButtonUp.png')
const previewBtnDownImg = require('../../images/previewButtonDown.png')

const BottomPopup = observer(({children, style, preview}: Props) => {
  const {mapType} = useHomeStore()

  // TODO: style this with border radius and shadow rather than an image. Allows setting background color to white

  // todo: adjust bottom margins for iPhones with bottom notches
  return (
    <View style={[{paddingTop: 50}, style]}>
      <Image
        style={styles.absolute}
        source={
          mapType === 'hybrid'
            ? require('../../images/bottomPopupDarkShadow.png')
            : require('../../images/bottomPopup.png')
        }
        resizeMode="stretch"
      />
      {preview !== undefined && (
        <PreviewButton onPress={() => Actions.refresh({preview: !preview})} preview={preview} />
      )}
      {children}
    </View>
  )
})

export default BottomPopup

const PreviewButton = ({onPress, preview}) => {
  return (
    <TouchableOpacity
      style={{top: -28, alignSelf: 'center'}}
      onPress={() => {
        if (onPress) {
          onPress(!preview)
        }
      }}
    >
      <Image source={preview ? previewBtnUpImg : previewBtnDownImg} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  absolute: {
    width: '100%',
    position: 'absolute',
  },
})
