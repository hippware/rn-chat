import React, {useEffect, useRef} from 'react'
import {View, Image, StyleSheet, NativeModules, TouchableOpacity} from 'react-native'
import {inject} from 'mobx-react'

import {RText} from './common'
import {colors} from '../constants'
import {k} from './Global'
import FormTextInput from './FormTextInput'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import CountryPicker, {getAllCountries} from 'react-native-country-picker-modal'
import {Actions} from 'react-native-router-flux'
import {parse, AsYouType as asYouType, CountryCode} from 'libphonenumber-js'
import {IFirebaseStore} from 'src/store/FirebaseStore'
import {PINK} from 'src/constants/colors'
import {observer, useLocalStore} from 'mobx-react-lite'
const CarrierInfo = NativeModules.RNCarrierInfo

const countryMap = {}
getAllCountries().forEach(country => (countryMap[country.cca2] = country))

type Props = {
  firebaseStore?: IFirebaseStore
}

type State = {
  cca2: CountryCode
  callingCode: string
  countryName: string
  phoneValue: string
  submitting: boolean
  sendText: string
  phoneValid: boolean
}

type Setter = (state: Partial<State>) => void

const SignIn = inject('firebaseStore')(
  observer(({firebaseStore}: Props) => {
    const picker: any = useRef(null)

    const store = useLocalStore<State & {set: Setter}>(() => ({
      cca2: 'US',
      callingCode: '1',
      countryName: 'United States',
      phoneValue: '',
      submitting: false,
      sendText: 'Send Confirmation',
      phoneValid: false,
      set(state) {
        Object.assign(store, {...store, ...state})
      },
    }))

    useEffect(() => {
      if (CarrierInfo)
        CarrierInfo.isoCountryCode(result => {
          if (result && result !== 'nil') {
            const cca2 = result.toUpperCase()
            const data = countryMap[cca2]
            store.set({
              cca2,
              callingCode: data.callingCode,
              countryName: data.name.common,
            })
          }
        })
    }, [])

    function processText(text: string) {
      const parsed = parse(text, store.cca2)
      store.set({
        phoneValid: !!(parsed.country && parsed.phone),
        phoneValue: /\d{4,}/.test(text) ? new asYouType(store.cca2).input(text) : text,
      })
    }

    async function submit(): Promise<void> {
      if (store.phoneValid) {
        store.set({submitting: true})
        const verified = await firebaseStore!.verifyPhone(
          `+${store.callingCode}${store.phoneValue!.replace(/\D/g, '')}`
        )
        if (verified) {
          Actions.verifyCode()
        }

        store.set({submitting: false})
      }
    }

    return (
      <KeyboardAwareScrollView
        style={{flex: 1, backgroundColor: colors.WHITE}}
        keyboardShouldPersistTaps="always"
      >
        <View style={{flexDirection: 'row', marginLeft: 60 * k, marginTop: 32 * k}}>
          <Image
            style={[{width: 60, height: 69}]}
            resizeMode="contain"
            source={require('../../images/iconBot.png')}
          />
          <View style={{marginLeft: 20, marginTop: -5}}>
            <RText size={28} weight="Light" color={colors.PINK}>
              {'Please verify\r\nyour phone\r\nnumber.'}
            </RText>
            <RText size={15} color={colors.DARK_GREY} style={{marginTop: 7 * k}}>
              {"Don't worry we won't share\r\nyour phone number."}
            </RText>
          </View>
        </View>
        <View style={{marginTop: 20 * k}}>
          <CountryPicker
            onChange={value => {
              store.set({
                cca2: value.cca2 as any,
                callingCode: value.callingCode,
                countryName: value.name as any,
              })
            }}
            cca2={store.cca2 as any}
            translation="common"
            filterable
            closeable
            ref={picker}
          >
            <TouchableOpacity onPress={() => (picker.current as any).openModal()}>
              <FormTextInput
                icon={require('../../images/globe.png')}
                label="Country Code"
                autoCapitalize="none"
                // validate={() => {}}
                value={`${store.countryName} +${store.callingCode}`}
                editable={false}
                pointerEvents="none"
              />
            </TouchableOpacity>
          </CountryPicker>

          <FormTextInput
            icon={require('../../images/phone.png')}
            label="Phone Number"
            autoFocus
            autoCorrect={false}
            keyboardType="phone-pad"
            onChangeText={processText}
            value={store.phoneValue}
          />

          <View style={{marginHorizontal: 36 * k, marginVertical: 20 * k}}>
            {!!firebaseStore!.errorMessage && (
              <RText size={15} color={PINK} style={{textAlign: 'center', marginBottom: 15}}>
                {firebaseStore!.errorMessage}
              </RText>
            )}
            <TouchableOpacity
              style={styles.button}
              disabled={store.submitting || !store.phoneValid}
              onPress={submit}
            >
              <RText style={styles.text}>
                {store.submitting ? 'Sending...' : 'Send Confirmation'}
              </RText>
            </TouchableOpacity>
            <RText
              size={12.5}
              color={colors.DARK_GREY}
              style={{marginTop: 10 * k, textAlign: 'center'}}
            >
              {
                'By tapping "Send Confirmation", we will send you a SMS. Message, data rates may apply.'
              }
            </RText>
          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  })
)

export default SignIn

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
  text: {fontSize: 17.5 * k, letterSpacing: 0.8, fontFamily: 'Roboto-Regular', color: colors.WHITE},
})
