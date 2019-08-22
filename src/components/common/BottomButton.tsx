import React, {useEffect, useState} from 'react'
import {Keyboard, Animated} from 'react-native'
import GradientButton from './GradientButton'
import {minHeight} from '../Global'

type Props = {
  style?: any
  children?: any
  isDisabled?: boolean
  onPress?: () => void
}

const BottomButton = (props: Props) => {
  const [height] = useState(new Animated.Value(0))

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardWillShow',
      ({endCoordinates, duration}: any) => {
        Animated.timing(height, {
          toValue: endCoordinates.height,
          duration,
        }).start()
      }
    )
    const keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', ({duration}: any) => {
      Animated.timing(height, {
        toValue: 0,
        duration,
      }).start()
    })

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  const {style, children, ...rest} = props
  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          bottom: height,
          right: 0,
          left: 0,
          padding: 0,
          margin: 0,
        },
        style,
      ]}
    >
      <GradientButton
        isPink={!props.isDisabled}
        style={{height: 50 * minHeight}}
        {...rest}
        onPress={!props.isDisabled ? props.onPress : null}
      >
        {children}
      </GradientButton>
    </Animated.View>
  )
}

export default BottomButton
