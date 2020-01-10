import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native'

type Props = {
  isOn: boolean
  label?: string
  onColor: string
  offColor: string
  size: string
  labelStyle?: any
  onToggle: (toggle: boolean) => void
  icon?: any
}

const Switch = ({isOn, label, onColor, offColor, size, labelStyle, onToggle, icon}: Props) => {
  const dimensions = calculateDimensions(size)
  const [offsetX] = useState(
    new Animated.Value(isOn ? dimensions.width - dimensions.translateX : 0)
  )

  useEffect(() => {
    const toValue = isOn ? dimensions.width - dimensions.translateX : 0
    Animated.timing(offsetX, {
      toValue,
      duration: 300,
    }).start()
  }, [isOn])

  return (
    <View style={styles.container}>
      {label ? <Text style={[styles.labelStyle, labelStyle]}>{label}</Text> : null}
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          width: dimensions.width,
          borderRadius: 20,
          padding: dimensions.padding,
          backgroundColor: isOn ? onColor : offColor,
        }}
        activeOpacity={0.8}
        onPress={() => onToggle(!isOn)}
      >
        <Animated.View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            margin: 4,
            position: 'absolute',
            backgroundColor: 'white',
            transform: [{translateX: offsetX}],
            width: dimensions.circleWidth,
            height: dimensions.circleHeight,
            borderRadius: dimensions.circleWidth / 2,
          }}
        >
          {icon}
        </Animated.View>
      </TouchableOpacity>
    </View>
  )
}

export default Switch

function calculateDimensions(size) {
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelStyle: {
    marginHorizontal: 10,
  },
})
