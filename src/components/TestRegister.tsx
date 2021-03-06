import React, {useState} from 'react'
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native'
import {inject} from 'mobx-react'
import {observer} from 'mobx-react'
import {Actions} from 'react-native-router-flux'
import {k, width} from './Global'
import {colors} from '../constants'
import {INavStore} from '../store/NavStore'
import {IAuthStore} from 'src/store/AuthStore'
import {RTextInput, RText} from './common'

type Props = {
  navStore?: INavStore
  name: string
  authStore: IAuthStore
}

const TestRegister = inject(
  'wocky',
  'analytics',
  'navStore',
  'authStore'
)(
  observer(({navStore, name, authStore}: Props) => {
    const [text, setText] = useState('')

    const onRegister = async () => {
      if (navStore!.scene !== name) {
        return
      }

      authStore!.register(`+1555${text}`, 'bypass')
      Actions.connect()
    }

    return (
      <View style={{flex: 1, alignItems: 'center', paddingTop: 83 * k}}>
        <Image source={require('../../images/logoMark.png')} />
        <RText
          style={{
            paddingTop: 15 * k,
            fontFamily: 'Roboto-Light',
            fontSize: 18,
            color: colors.PINK,
          }}
        >
          STAGING
        </RText>
        <RText
          style={{
            padding: 10 * k,
            paddingTop: 15 * k,
            width,
            textAlign: 'left',
            fontFamily: 'Roboto-Medium',
            fontSize: 16,
            color: colors.PINK,
          }}
        >
          Enter your test phone number
        </RText>
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
          <RText
            style={{
              fontFamily: 'Roboto-Regular',
              fontSize: 16 * k,
            }}
          >
            +1555
          </RText>
          <RTextInput
            autoFocus
            maxLength={7}
            keyboardType="phone-pad"
            onChangeText={setText}
            value={text}
            style={{
              paddingLeft: 10 * k,
              fontSize: 16 * k,
              fontFamily: 'Roboto-Regular',
              width: 300 * k,
              height: 40 * k,
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
          onPress={onRegister}
          style={styles.buttonStyle}
          testID="bypassRegisterButton"
        >
          <RText style={styles.textStyle}>Next</RText>
        </TouchableOpacity>
      </View>
    )
  })
)

const styles = StyleSheet.create({
  buttonStyle: {
    top: 10 * k,
    width: (width - 30) * k,
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
