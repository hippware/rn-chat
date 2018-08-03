import React from 'react'
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native'

type Props = {
  back?: boolean
  onClose?: () => void
  children: any
}

export default class BottomPopup extends React.Component<Props> {
  render() {
    const {onClose, children} = this.props
    return !onClose ? (
      <View>{children}</View>
    ) : (
      <View>
        <Image style={styles.absolute} source={require('../../images/bottomPopup.png')} />
        <View style={{flex: 1}}>
          <TouchableOpacity style={styles.close} onPress={onClose}>
            <Image source={require('../../images/popupClose.png')} />
          </TouchableOpacity>
          {children}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
  },
  close: {
    width: 75,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
})
