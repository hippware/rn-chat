import React from 'react'
import {Animated, Keyboard} from 'react-native'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react/native'

export default (Component): any => {
  @observer
  class KeyboardAwareView extends React.Component<any> {
    @observable keyboardShowing: boolean = false
    keyboardHeight = new Animated.Value(0)
    keyboardDidShowListener: any
    keyboardDidHideListener: any

    componentDidMount() {
      this.keyboardDidShowListener = Keyboard.addListener(
        'keyboardWillShow',
        this._keyboardWillShow
      )
      this.keyboardDidHideListener = Keyboard.addListener(
        'keyboardWillHide',
        this._keyboardWillHide
      )
    }

    componentWillUnmount() {
      Keyboard.removeListener('keyboardWillHide', this.keyboardDidHideListener)
      Keyboard.removeListener('keyboardWillShow', this.keyboardDidShowListener)
    }

    @action
    _keyboardWillShow = ({endCoordinates, duration}: any) => {
      this.keyboardShowing = true
      Animated.timing(this.keyboardHeight, {
        toValue: -endCoordinates.height,
        duration,
        useNativeDriver: true,
      }).start()
    }

    @action
    _keyboardWillHide = ({duration}: any) => {
      this.keyboardShowing = false
      Animated.timing(this.keyboardHeight, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }).start()
    }

    render() {
      const {forwardedRef, ...rest} = this.props
      return (
        <Animated.View
          pointerEvents="box-none"
          style={{
            flex: 1,
            transform: [
              {
                translateY: this.keyboardHeight,
              },
            ],
          }}
        >
          <Component ref={forwardedRef} {...rest} keyboardShowing={this.keyboardShowing} />
        </Animated.View>
      )
    }
  }

  // https://reactjs.org/docs/forwarding-refs.html
  return React.forwardRef((props, ref) => {
    return <KeyboardAwareView {...props} forwardedRef={ref} />
  })
}
