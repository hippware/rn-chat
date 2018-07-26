import React from 'react'
import {View, Image, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import {inject, observer} from 'mobx-react/native'
import {Actions} from 'react-native-router-flux'
import {k, width} from './Global'
import {colors} from '../constants'

type Props = {
  wocky?: any
  analytics?: any
  name: string
  warn?: any
}

type State = {
  text: string
}

@inject('wocky', 'analytics', 'warn')
@observer
class TestRegister extends React.Component<Props, State> {
  state: State = {
    text: '',
  }

  onRegister = async () => {
    if (Actions.currentScene !== this.props.name) {
      return
    }
    try {
      await this.props.wocky.testRegister({phoneNumber: this.state.text})
      Actions.connect()
    } catch (err) {
      this.props.warn('Test Register error', err)
      this.props.analytics.track('error_bypass_register', {error: err})
      // TODO: notificationStore.showNotification with error message
    }
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', paddingTop: 83 * k}}>
        <Image source={require('../../images/logoMark.png')} />
        <Text
          style={{
            paddingTop: 15 * k,
            fontFamily: 'Roboto-Light',
            fontSize: 18,
            color: colors.PINK,
          }}
        >
          STAGING
        </Text>
        <Text
          style={{
            padding: 10 * k,
            paddingTop: 40 * k,
            width,
            textAlign: 'left',
            fontFamily: 'Roboto-Medium',
            fontSize: 16,
            color: colors.PINK,
          }}
        >
          Enter your test phone number
        </Text>
        <View
          style={{
            height: 0.5 * k,
            width,
            backgroundColor: colors.GREY,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width,
            padding: 10 * k,
          }}
        >
          <Text
            style={{
              fontFamily: 'Roboto-Regular',
              fontSize: 16 * k,
            }}
          >
            +1555
          </Text>
          <TextInput
            autoFocus
            maxLength={7}
            keyboardType="phone-pad"
            onChangeText={text => this.setState({text})}
            value={this.state.text}
            style={{
              paddingLeft: 10 * k,
              fontSize: 16 * k,
              fontFamily: 'Roboto-Regular',
              width: 300 * k,
              height: 30 * k,
            }}
            testID="bypassPhoneInput"
          />
        </View>
        <View
          style={{
            height: 0.5 * k,
            width,
            backgroundColor: colors.GREY,
          }}
        />

        <TouchableOpacity
          onPress={this.onRegister}
          style={styles.buttonStyle}
          testID="bypassRegisterButton"
        >
          <Text style={styles.textStyle}>Next</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    position: 'absolute',
    bottom: 290 * k,
    left: 30 * k,
    right: 30 * k,
    height: 50 * k,
    borderWidth: 0,
    borderRadius: 2 * k,
    backgroundColor: 'rgb(254,92,108)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 15 * k,
    fontFamily: 'Roboto-Regular',
    color: 'white',
  },
})

export default TestRegister
