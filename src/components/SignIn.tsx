import React from 'react'
import {View, Image, StyleSheet, NativeModules, TouchableOpacity} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {observable} from 'mobx'
import {RText} from './common'
import {colors} from '../constants'
import {k} from './Global'
import FormTextInput from './FormTextInput'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import CountryPicker, {getAllCountries} from 'react-native-country-picker-modal'
import Button from 'apsl-react-native-button'
import {Actions} from 'react-native-router-flux'
import {parse, asYouType} from 'libphonenumber-js'

// TODO: inject this dependency
const CarrierInfo = NativeModules.RNCarrierInfo

const countryMap = {}
getAllCountries().forEach(country => (countryMap[country.cca2] = country))

type Props = {
  firebaseStore: any
}

@inject('firebaseStore')
@observer
class SignIn extends React.Component<Props> {
  picker: any
  @observable cca2: any = 'US'
  @observable callingCode: string = '1'
  @observable countryName: string = 'United States'
  @observable phoneValue: string = ''
  @observable submitting: boolean = false
  @observable sendText: string = 'Send Confirmation'
  phoneText: any

  componentDidMount() {
    if (CarrierInfo)
      CarrierInfo.isoCountryCode(result => {
        if (result && result !== 'nil') {
          this.cca2 = result.toUpperCase()
          const data = countryMap[this.cca2]
          this.callingCode = data.callingCode
          this.countryName = data.name.common
        }
      })
  }

  processText = (text: string) => {
    const parsed = parse(text, this.cca2)
    this.phoneValue = /\d{4,}/.test(text) ? new asYouType(this.cca2).input(text) : text // eslint-disable-line
    if (parsed.country && parsed.phone) {
      // TODO: fix phonetext validation
      this.phoneText.valid = true
    } else {
      this.phoneText.valid = false
    }
  }

  submit = async () => {
    if (!this.phoneText.valid) {
      this.phoneText.message = 'Please check your phone number and try again'
    } else {
      this.submitting = true
      this.phoneText.message = ''
      try {
        await this.props.firebaseStore.verifyPhone({
          phone: `+${this.callingCode}${this.phoneValue.replace(/\D/g, '')}`,
        })
        Actions.verifyCode()
      } finally {
        this.submitting = false
      }
    }
  }

  render() {
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
            {/* {!!firebaseStore.errorMessage && (
              <RText size={15} color='red' style={{marginTop: 7 * k, paddingRight: 120 * k}}>
                {firebaseStore.errorMessage}
              </RText>
            )} */}
          </View>
        </View>
        <View style={{marginTop: 20 * k}}>
          <CountryPicker
            onChange={value => {
              this.cca2 = value.cca2
              this.callingCode = value.callingCode
              this.countryName = value.name
            }}
            cca2={this.cca2}
            translation="eng"
            filterable
            closeable
            ref={r => (this.picker = r)}
          >
            <TouchableOpacity onPress={() => this.picker.openModal()}>
              <FormTextInput
                icon={require('../../images/globe.png')}
                label="Country Code"
                autoCapitalize="none"
                // validate={() => {}}
                value={`${this.countryName} +${this.callingCode}`}
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
            ref={r => (this.phoneText = r)}
            onChangeText={this.processText}
            value={this.phoneValue}
          />

          <View style={{marginHorizontal: 36 * k, marginVertical: 20 * k}}>
            <Button
              style={styles.button}
              isDisabled={this.submitting || !this.phoneText || !this.phoneText.valid}
              onPress={this.submit}
              textStyle={styles.text}
            >
              {this.submitting ? 'Sending...' : 'Send Confirmation'}
            </Button>
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
  }
}

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
