import React, {useState} from 'react'
import {View, Image, StyleSheet, NativeModules, TouchableOpacity} from 'react-native'

import {RText} from './common'
import {colors} from '../constants'
import {k} from './Global'
import FormTextInput from './FormTextInput'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import CountryPicker, {getAllCountries} from 'react-native-country-picker-modal'
import {CountryCode, Country, FlagType} from 'react-native-country-picker-modal/lib/types'

import {Actions} from 'react-native-router-flux'
import {parse, AsYouType as asYouType, isSupportedCountry} from 'libphonenumber-js'
import {PINK} from 'src/constants/colors'
import {observer} from 'mobx-react'
import {useFirebaseStore} from 'src/utils/injectors'

const countryMap = {}
getAllCountries(FlagType.FLAT).then((countries) => {
  countries.forEach(country => (countryMap[country.cca2] = country))
})

const CarrierInfo = NativeModules.RNCarrierInfo

let defaultCountryCode: CountryCode = 'US'

if (CarrierInfo) {
  CarrierInfo.isoCountryCode(result => {
    if (result && result !== 'nil') {
      defaultCountryCode = result.toUpperCase()
    }
  })
}

const SignIn = observer(() => {
  const firebaseStore = useFirebaseStore()
  const [countryCode, setCountryCode] = useState<CountryCode>(defaultCountryCode)
  const [phoneValid, setPhoneValid] = useState<boolean>(false)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [phoneValue, setPhoneValue] = useState<string>('')

  const onSelect = (c: Country) => {
    setCountryCode(c.cca2)
  }

  function processText(text: string) {
    // Only pass in country codes that libphonenumber-js knows about
    const maybeSupportedCountryCode: any = isSupportedCountry(countryCode) ? countryCode : undefined
    const parsed = parse(text, maybeSupportedCountryCode)
    setPhoneValid(!!(parsed.country && parsed.phone))
    setPhoneValue(/\d{4,}/.test(text) ? new asYouType(maybeSupportedCountryCode).input(text) : text)
  }

  async function submit(): Promise<void> {
    if (phoneValid) {
      setSubmitting(true)
      const verified = await firebaseStore!.verifyPhone(
        `+${countryMap[countryCode].callingCode}${phoneValue!.replace(/\D/g, '')}`
      )
      if (verified) {
        Actions.verifyCode()
      }

      setSubmitting(false)
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
          countryCode={countryCode}
          onSelect={onSelect}
          withCallingCode
          withAlphaFilter
          withFilter
          renderFlagButton={({onOpen}) => (
            <TouchableOpacity onPress={onOpen}>
              <FormTextInput
                icon={require('../../images/globe.png')}
                label="Country Code"
                autoCapitalize="none"
                // validate={() => {}}
                value={`${countryMap[countryCode].name} +${countryMap[countryCode].callingCode}`}
                editable={false}
                pointerEvents="none"
              />
            </TouchableOpacity>
          )}
        />

        <FormTextInput
          icon={require('../../images/phone.png')}
          label="Phone Number"
          autoFocus
          autoCorrect={false}
          keyboardType="phone-pad"
          onChangeText={processText}
          value={phoneValue}
        />

        <View style={{marginHorizontal: 36 * k, marginVertical: 20 * k}}>
          {!!firebaseStore!.errorMessage && (
            <RText size={15} color={PINK} style={{textAlign: 'center', marginBottom: 15}}>
              {firebaseStore!.errorMessage}
            </RText>
          )}
          <TouchableOpacity
            style={styles.button}
            disabled={submitting || !phoneValid}
            onPress={submit}
          >
            <RText style={styles.text}>{submitting ? 'Sending...' : 'Send Confirmation'}</RText>
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
