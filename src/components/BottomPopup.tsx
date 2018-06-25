import React from 'react'
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native'

type Props = {
  onClose: () => void
  children: any
}

export default class BottomPopup extends React.Component<Props> {
  render() {
    return (
      <View style={{flex: 1}}>
        <Image style={styles.container} source={require('../../images/bottomPopup.png')} />
        <View style={styles.container}>
          <TouchableOpacity style={styles.close} onPress={this.props.onClose}>
            <Image source={require('../../images/popupClose.png')} />
          </TouchableOpacity>
          {this.props.children}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  close: {
    width: 75,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 394,
  },
})
