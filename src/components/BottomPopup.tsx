import React, {useState} from 'react'
import {View, Image, StyleSheet, ViewStyle, TouchableOpacity} from 'react-native'
import {useHomeStore} from 'src/utils/injectors'
import {observer} from 'mobx-react'

type Props = {
  children: any
  style?: ViewStyle
  showPreviewButton?: boolean
  onPreviewButtonTap?: (isPreview: boolean) => void
}

const previewBtnUpImg = require('../../images/previewButtonUp.png')
const previewBtnDownImg = require('../../images/previewButtonDown.png')

const BottomPopup = observer(({children, style, showPreviewButton, onPreviewButtonTap}: Props) => {
  const {mapType} = useHomeStore()
  const [btnUp, setBtnUp] = useState(true)

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
      {showPreviewButton && (
        <TouchableOpacity
          style={{top: -28, alignSelf: 'center'}}
          onPress={() => {
            if (onPreviewButtonTap) {
              onPreviewButtonTap(!btnUp)
            }
            setBtnUp(!btnUp)
          }}
        >
          <Image source={btnUp ? previewBtnUpImg : previewBtnDownImg} />
        </TouchableOpacity>
      )}
      {children}
    </View>
  )
})

export default BottomPopup

const styles = StyleSheet.create({
  absolute: {
    width: '100%',
    position: 'absolute',
  },
})
