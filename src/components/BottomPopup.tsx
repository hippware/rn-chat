import React from 'react'
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native'

type Props = {
  back?: boolean
  onClose?: () => void
  children: any
  onLayout?: (event) => void
}

export default class BottomPopup extends React.Component<Props> {
  render() {
    const {onClose, children} = this.props
    return !onClose ? (
      <View style={styles.container} onLayout={this.props.onLayout}>
        {children}
      </View>
    ) : (
      <View
        style={styles.container} // keep contents "glued" to the bottom
        onLayout={this.props.onLayout}
      >
        <Image style={styles.absolute} source={require('../../images/bottomPopup.png')} />
        <View style={{flex: 1}}>
          <TouchableOpacity style={styles.close} onPress={onClose}>
            <Image source={require('../../images/popupClose.png')} />
          </TouchableOpacity>
          <View
            onLayout={({nativeEvent}) => this.setState({childrenHeight: nativeEvent.layout.height})}
          >
            {children}
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end', // keep children "locked" to the bottom
  },
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
