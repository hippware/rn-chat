import React from 'react'
import {Keyboard, Animated} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {observable, when} from 'mobx'
import Button from '../Button'

type Props = {
  style?: any
  children?: any
  isDisabled?: boolean
  onPress?: () => void
}

type State = {
  height: Animated.Value
}

@inject('wocky', 'notificationStore', 'analytics', 'log')
@observer
class BottomButton extends React.Component<Props, State> {
  @observable keyboardHeight: number = 0
  keyboardDidShowListener: any
  keyboardDidHideListener: any
  animation: any
  @observable animating: boolean = false

  constructor(props: Props) {
    super(props)
    this.state = {
      height: new Animated.Value(0),
    }
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide)
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  render() {
    const {style, children, ...rest} = this.props
    return (
      <Animated.View
        style={[
          {
            position: 'absolute',
            bottom: Animated.add(this.state.height, -12),
            // bottom: Animated.add(this.state.height, -50),
            // bottom: 0,
            right: 0,
            left: 0,
            padding: 0,
            margin: 0,
          },
          style,
        ]}
      >
        <Button
          style={{
            padding: 0,
            margin: 0,
            bottom: 0,
            right: 0,
            left: 0,
          }}
          {...rest}
        >
          {children}
        </Button>
      </Animated.View>
    )
  }

  private _keyboardWillShow = ({endCoordinates, duration}: any) => {
    when(
      () => !this.animating,
      () => {
        this.animating = true
        this.animation = Animated.timing(this.state.height, {
          toValue: endCoordinates.height,
          duration,
        }).start(this.animationCb)
      }
    )
  }

  private _keyboardWillHide = ({duration}: any) => {
    when(
      () => !this.animating,
      () => {
        this.animating = true
        this.animation = Animated.timing(this.state.height, {
          toValue: 0,
          duration,
        }).start(this.animationCb)
      }
    )
  }

  private animationCb = () => {
    this.animating = false
  }
}

export default BottomButton
