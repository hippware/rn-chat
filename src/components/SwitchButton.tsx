import React, {Component} from 'react'
import {View, TouchableOpacity, StyleSheet, Animated} from 'react-native'
import RText from '../components/common/RText'

type Props = {
  value?: 1 | 2
  switchSpeedChange?: number
  disabled?: boolean
  onValueChange: (index: number) => void
  switchWidth: number
  switchHeight: number
  switchBorderRadius?: number
  text1?: string
  text2?: string
  switchdirection?: string
  switchBorderColor?: string
  switchBackgroundColor: string
  activeFontColor?: string
  fontColor?: string
  btnHeight?: number
  btnBorderColor?: string
  btnBackgroundColor?: string
  btnStyle: any
}

type State = {
  activeSwitch: number
  sbWidth: number
  sbHeight: number
  direction: string
  offsetX: any
}

export default class SwitchButton extends Component<Props, State> {
  static defaultProps = {
    switchSpeedChange: 100,
  }

  constructor(props) {
    super(props)
    const value = props.value === 2 ? props.switchWidth / 2 - (props.btnHeight ? 0 : 6) : 0
    this.state = {
      activeSwitch: props.value || 1,
      sbWidth: 100,
      sbHeight: 44,
      direction: 'ltr',
      offsetX: new Animated.Value(value),
    }
  }

  _switchDirection(direction: string): 'row' | 'row-reverse' {
    let dir: 'row' | 'row-reverse' = 'row'

    if (direction === 'rtl') {
      dir = 'row-reverse'
    } else {
      dir = 'row'
    }
    return dir
  }

  _switchThump(direction: string) {
    const {onValueChange} = this.props
    let dirsign = 1
    if (direction === 'rtl') {
      dirsign = -1
    } else {
      dirsign = 1
    }

    if (this.state.activeSwitch === 1) {
      this.setState({activeSwitch: 2}, () => onValueChange(this.state.activeSwitch))

      Animated.timing(this.state.offsetX, {
        toValue:
          ((this.props.switchWidth || this.state.sbWidth) / 2 - (this.props.btnHeight ? 0 : 6)) *
          dirsign,
        duration: this.props.switchSpeedChange,
      }).start()
    } else {
      this.setState({activeSwitch: 1}, () => onValueChange(this.state.activeSwitch))
      Animated.timing(this.state.offsetX, {
        toValue: 0,
        duration: this.props.switchSpeedChange,
      }).start()
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            this._switchThump(this.props.switchdirection || this.state.direction)
          }}
        >
          <View
            style={[
              {
                width: this.props.switchWidth || this.state.sbWidth,
                height: this.props.switchHeight || this.state.sbHeight,
                borderRadius:
                  this.props.switchBorderRadius !== undefined
                    ? this.props.switchBorderRadius
                    : this.state.sbHeight / 2,
                borderWidth: 1,
                borderColor: this.props.switchBorderColor || '#d4d4d4',
                backgroundColor: this.props.switchBackgroundColor || '#fff',
              },
            ]}
          >
            <View
              style={{
                flexDirection: this._switchDirection(
                  this.props.switchdirection || this.state.direction
                ),
              }}
            >
              <Animated.View style={{transform: [{translateX: this.state.offsetX}]}}>
                <View
                  style={[
                    this.props.btnStyle || switchStyles.wayBtnActive,
                    {
                      top: -1,
                      left: -1,
                      width: this.props.switchWidth / 2 || this.state.sbWidth / 2,
                      height:
                        this.props.btnHeight ||
                        this.props.switchHeight - 6 ||
                        this.state.sbHeight - 6,
                      borderRadius:
                        this.props.switchBorderRadius !== undefined
                          ? this.props.switchBorderRadius
                          : this.state.sbHeight / 2,
                      borderColor: this.props.btnBorderColor || '#00a4b9',
                      backgroundColor: this.props.btnBackgroundColor || '#00bcd4',
                    },
                  ]}
                />
              </Animated.View>

              <View
                style={[
                  switchStyles.textPos,
                  {
                    width: this.props.switchWidth / 2 || this.state.sbWidth / 2,
                    height:
                      this.props.btnHeight ||
                      this.props.switchHeight - 6 ||
                      this.state.sbHeight - 6,
                    left: 0,
                  },
                ]}
              >
                <RText
                  size={14}
                  style={[
                    this.state.activeSwitch === 1
                      ? {color: this.props.activeFontColor || '#fff'}
                      : {color: this.props.fontColor || '#b1b1b1'},
                  ]}
                >
                  {this.props.text1 || 'ON'}
                </RText>
              </View>

              <View
                style={[
                  switchStyles.textPos,
                  {
                    width: this.props.switchWidth / 2 || this.state.sbWidth / 2,
                    height:
                      this.props.btnHeight ||
                      this.props.switchHeight - 6 ||
                      this.state.sbHeight - 6,
                    right: 0,
                  },
                ]}
              >
                <RText
                  size={14}
                  style={[
                    this.state.activeSwitch === 2
                      ? {color: this.props.activeFontColor || '#fff'}
                      : {color: this.props.fontColor || '#b1b1b1'},
                  ]}
                >
                  {this.props.text2 || 'OFF'}
                </RText>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {this.props.children}
      </View>
    )
  }
}

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
