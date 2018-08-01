import React from 'react'
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native'

type Props = {
  back?: boolean
  onClose?: () => void
  children: any
  onLayout?: (event) => void
}

export default class BottomPopup extends React.Component<Props> {
  state = {
    childrenHeight: null,
  }
  render() {
    const {onClose, children} = this.props
    return !onClose ? (
      <View onLayout={this.props.onLayout}>{children}</View>
    ) : (
      <View
        style={{
          height: this.state.childrenHeight ? this.state.childrenHeight + 50 : 10,
        }}
        onLayout={event =>
          this.state.childrenHeight && this.props.onLayout && this.props.onLayout(event)
        }
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
