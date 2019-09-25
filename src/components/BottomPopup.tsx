import React from 'react'
import {View, Image, StyleSheet} from 'react-native'
import {useHomeStore} from 'src/utils/injectors'

type Props = {
  children: any
}

const BottomPopup = ({children}: Props) => {
  const {mapType} = useHomeStore()
  // TODO: style this with border radius and shadow rather than an image. Allows setting background color to white
  return (
    <View style={{paddingTop: 50}}>
      <Image
        style={styles.absolute}
        source={
          mapType === 'hybrid'
            ? require('../../images/bottomPopupDarkShadow.png')
            : require('../../images/bottomPopup.png')
        }
        resizeMode="stretch"
      />
      {children}
    </View>
  )
}
export default BottomPopup

const styles = StyleSheet.create({
  absolute: {
    width: '100%',
    position: 'absolute',
  },
})
