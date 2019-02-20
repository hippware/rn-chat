import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native'

type Props = {
  isOn: boolean
  label?: string
  onColor: string
  offColor: string
  size: string
  labelStyle: any
  onToggle: (toggle: boolean) => void
  icon: any
}
export default class Switch extends React.Component<Props> {
  static calculateDimensions(size) {
    switch (size) {
      case 'large':
        return {
          width: 51,
          padding: 20,
          circleWidth: 20,
          circleHeight: 20,
          translateX: 38,
        }
      default:
        return {
          width: 41,
          padding: 13,
          circleWidth: 17,
          circleHeight: 17,
          translateX: 26,
        }
    }
  }

  static defaultProps = {
    isOn: false,
    onColor: '#634fc9',
    offColor: '#ecf0f1',
    size: 'medium',
    labelStyle: {},
    icon: null,
  }

  componentWillReceiveProps(nextProps) {
    const toValue = nextProps.isOn ? this.dimensions.width - this.dimensions.translateX : 0

    Animated.timing(this.offsetX, {
      toValue,
      duration: 300,
    }).start()
  }

  dimensions = Switch.calculateDimensions(this.props.size)
  offsetX = new Animated.Value(
    this.props.isOn ? this.dimensions.width - this.dimensions.translateX : 0
  )

  render() {
    return (
      <View style={styles.container}>
        {this.props.label ? (
          <Text style={[styles.labelStyle, this.props.labelStyle]}>{this.props.label}</Text>
        ) : null}
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            width: this.dimensions.width,
            borderRadius: 20,
            padding: this.dimensions.padding,
            backgroundColor: this.props.isOn ? this.props.onColor : this.props.offColor,
          }}
          activeOpacity={0.8}
          onPress={() => this.props.onToggle(!this.props.isOn)}
        >
          <Animated.View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              margin: 4,
              position: 'absolute',
              backgroundColor: 'white',
              transform: [{translateX: this.offsetX}],
              width: this.dimensions.circleWidth,
              height: this.dimensions.circleHeight,
              borderRadius: this.dimensions.circleWidth / 2,
            }}
          >
            {this.props.icon}
          </Animated.View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelStyle: {
    marginHorizontal: 10,
  },
})
