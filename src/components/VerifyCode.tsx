import React, {useState, useRef, useEffect} from 'react'
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import DeviceInfo from 'react-native-device-info'
import {inject} from 'mobx-react'
import {observer} from 'mobx-react'
import {when} from 'mobx'
import {k} from './Global'
import {colors} from '../constants'
import {RText, RTextInput} from './common'
import {Actions} from 'react-native-router-flux'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {IFirebaseStore} from '../store/FirebaseStore'

type Props = {
  firebaseStore?: IFirebaseStore
}

const VerifyCode = inject('firebaseStore')(
  observer(({firebaseStore}: Props) => {
    const [code, setCode] = useState('______')
    const [hiddenCode, setHiddenCode] = useState('')
    const [isConfirming, setIsConfirming] = useState(false)
    const [isResending, setIsResending] = useState(false)
    const [isResent, setIsResent] = useState(false)

    const input = useRef<TextInput>(null)

    useEffect(() => {
      const disposer = when(
        () => firebaseStore!.registered,
        () => {
          setIsConfirming(false)
          Actions.checkProfile()
        }
      )
      return () => disposer()
    }, [])

    const processText = (text: string): void => {
      setHiddenCode(text)
      setCode(`${text}______`.slice(0, 6))
    }

    const resend = async () => {
      setIsResending(true)
      processText('')
      // only allow one resend?
      if (await firebaseStore!.resendCode()) {
        setIsResent(true)
        input.current!.focus()
      }
      setIsResending(false)
    }

    const verify = async () => {
      try {
        setIsConfirming(true)
        await firebaseStore!.confirmCode({code, resource: await DeviceInfo.getUniqueId()})
        // nav will occur as a reaction in UNSAFE_componentDidMount
      } finally {
        setIsConfirming(false)
      }
    }

    return (
      <KeyboardAwareScrollView
        style={{flex: 1}}
        contentContainerStyle={{alignItems: 'center', backgroundColor: colors.WHITE}}
        keyboardShouldPersistTaps="always"
      >
        <View style={{flexDirection: 'row', marginTop: 80 * k}}>
          <Image
            style={[{width: 60, height: 69, margin: 20 * k}]}
            resizeMode="contain"
            source={require('../../images/iconBot.png')}
          />
          <View>
            <RText size={28} weight="Light" color={colors.PINK}>
              {'We sent you a\r\n6-digit code'}
            </RText>
            <RText size={20} weight="Medium" color={colors.PINK} style={{marginTop: 10 * k}}>
              {firebaseStore!.phone}
            </RText>
          </View>
        </View>

        <View style={{marginVertical: 30 * k, alignItems: 'center'}}>
          <RText size={12.5} weight="Bold" color={colors.PINK}>
            {firebaseStore!.errorMessage}
          </RText>
          <TouchableWithoutFeedback onPress={() => input.current!.focus()}>
            {/* need inner view because of https://github.com/facebook/react-native/issues/10180 */}
            <View>
              <RText
                size={40}
                weight="Light"
                color={colors.PINK}
                style={{letterSpacing: 15, paddingLeft: 15}}
              >
                {code}
              </RText>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={{flexDirection: 'row', marginHorizontal: 20}}>
          <TouchableOpacity
            disabled={isResent || isConfirming}
            onPress={resend}
            style={[styles.button, styles.resendBtn]}
          >
            {isResent ? (
              <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                <Image
                  style={{marginRight: 10}}
                  source={require('../../images/iconCheckBotAdded.png')}
                />
                <RText style={styles.resendTxt}>Code Sent</RText>
              </View>
            ) : (
              <RText style={styles.resendTxt}>{isResending ? 'Resending...' : 'Resend Code'}</RText>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={verify}
            style={styles.button}
            disabled={hiddenCode.length < 6 || isConfirming}
          >
            <RText style={styles.verifyTxt}>{firebaseStore!.buttonText}</RText>
          </TouchableOpacity>
        </View>
        <RTextInput
          value={hiddenCode}
          onChangeText={processText}
          style={styles.hiddenText}
          autoFocus
          autoCorrect={false}
          keyboardType="numeric"
          ref={input}
          maxLength={6}
          caretHidden
        />
      </KeyboardAwareScrollView>
    )
  })
)
;(VerifyCode as any).navigationOptions = {
  headerLeft: (
    <TouchableOpacity
      onPress={() => Actions.pop()}
      style={{left: 27 * k, flexDirection: 'row', alignItems: 'center'}}
    >
      <Image source={require('../../images/left-chevron-small.png')} style={{marginRight: 3 * k}} />
      <RText size={15} color={colors.WARM_GREY_2}>
        Edit Number
      </RText>
    </TouchableOpacity>
  ),
}

export default VerifyCode

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 50 * k,
    borderWidth: 0,
    borderRadius: 5 * k,
    backgroundColor: colors.PINK,
    alignItems: 'center',
    marginHorizontal: 5 * k,
    justifyContent: 'center',
  },
  resendBtn: {
    backgroundColor: colors.WHITE,

    borderWidth: 1,
    borderColor: colors.PINK,
  },
  resendTxt: {
    color: colors.PINK,
    fontSize: 17.5,
    fontFamily: 'Roboto-Regular',
  },
  verifyTxt: {
    color: colors.WHITE,
    fontSize: 17.5,
    fontFamily: 'Roboto-Regular',
  },
  hiddenText: {
    height: 1,
    width: 1,
    fontSize: 1,
    color: colors.WHITE,
    position: 'absolute',
    top: -100,
    left: -100,
  },
})
