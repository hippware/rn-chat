import React, {useState, useEffect} from 'react'
import {View, TouchableOpacity, StyleSheet, Animated} from 'react-native'
import RText from '../components/common/RText'

type Props = {
  value: boolean
  disabled?: boolean
  onValueChange: (value: boolean) => void
  switchWidth: number
  switchHeight: number
  switchBorderRadius?: number
  text1?: string
  text2?: string
  switchBorderColor?: string
  switchBackgroundColor: string
  activeFontColor?: string
  fontColor?: string
  btnHeight?: number
  btnBorderColor?: string
  btnBackgroundColor?: string
  btnStyle: any
  children: any
}

const switchSpeed = 100
const translucent = 0.5

const SwitchButton = ({
  value,
  disabled,
  onValueChange,
  switchWidth,
  switchHeight,
  switchBorderRadius,
  text1,
  text2,
  switchBorderColor,
  switchBackgroundColor,
  activeFontColor,
  fontColor,
  btnHeight,
  btnBorderColor,
  btnBackgroundColor,
  btnStyle,
  children,
}: Props) => {
  const [offsetX] = useState(new Animated.Value(value ? switchWidth / 2 : 0))

  useEffect(() => {
    Animated.timing(offsetX, {
      toValue: (switchWidth / 2) * (value ? 1 : 0),
      duration: switchSpeed,
    }).start()
  }, [value])

  return (
    <View style={{opacity: disabled ? translucent : 1}}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => (disabled ? null : onValueChange(!value))}
        style={{
          width: switchWidth,
          height: switchHeight,
          borderRadius: !!switchBorderRadius ? switchBorderRadius : switchHeight / 2,
          borderWidth: 1,
          borderColor: switchBorderColor || '#d4d4d4',
          backgroundColor: switchBackgroundColor || '#fff',
          flexDirection: 'row',
        }}
      >
        <Animated.View style={{transform: [{translateX: offsetX}]}}>
          <View
            style={[
              btnStyle || switchStyles.wayBtnActive,
              {
                top: -1,
                left: -1,
                width: switchWidth / 2,
                height: btnHeight,
                borderRadius: !!switchBorderRadius ? switchBorderRadius : switchHeight / 2,
                borderColor: btnBorderColor || '#00a4b9',
                backgroundColor: btnBackgroundColor || '#00bcd4',
              },
            ]}
          />
        </Animated.View>

        <View
          style={[
            switchStyles.textPos,
            {
              width: switchWidth / 2,
              height: btnHeight || switchHeight - 6,
              left: 0,
            },
          ]}
        >
          <RText
            size={14}
            style={!value ? {color: activeFontColor || '#fff'} : {color: fontColor || '#b1b1b1'}}
          >
            {text1}
          </RText>
        </View>

        <View
          style={[
            switchStyles.textPos,
            {
              width: switchWidth / 2,
              height: btnHeight || switchHeight - 6,
              right: 0,
            },
          ]}
        >
          <RText
            size={14}
            style={value ? {color: activeFontColor || '#fff'} : {color: fontColor || '#b1b1b1'}}
          >
            {text2}
          </RText>
        </View>
      </TouchableOpacity>
      {children}
    </View>
  )
}

export default SwitchButton

const switchStyles = StyleSheet.create({
  textPos: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rtl: {
    flexDirection: 'row-reverse',
  },
  ltr: {
    flexDirection: 'row',
  },
  wayBtnActive: {
    borderWidth: 1,
    marginTop: 2,
    marginRight: 2,
    marginLeft: 2,
  },
})
