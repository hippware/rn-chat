import React from 'react'
import {Animated, Keyboard} from 'react-native'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react/native'

export default Component => {
  @observer
  class KeyboardAwareView extends React.Component {
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
      }).start()
    }

    @action
    _keyboardWillHide = ({duration}: any) => {
      this.keyboardShowing = false
      Animated.timing(this.keyboardHeight, {
        toValue: 0,
        duration,
      }).start()
    }

    render() {
      return (
        <Animated.View
          style={{
            transform: [
              {
                translateY: this.keyboardHeight,
              },
            ],
          }}
        >
          <Component {...this.props} keyboardShowing={this.keyboardShowing} />
        </Animated.View>
      )
    }
  }

  return KeyboardAwareView
}
