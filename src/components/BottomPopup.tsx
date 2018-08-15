import React from 'react'
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native'

type Props = {
  onClose: () => void
  children: any
}

const BottomPopup = ({onClose, children}: Props) => {
  return (
    <View>
      <Image
        style={styles.absolute}
        source={require('../../images/bottomPopup.png')}
        resizeMode="stretch"
      />
      <TouchableOpacity style={styles.close} onPress={onClose}>
        <Image source={require('../../images/popupClose.png')} />
      </TouchableOpacity>
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
  close: {
    width: 75,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
})
