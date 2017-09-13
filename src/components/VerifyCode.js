// @flow

import React from 'react';
import {View, Keyboard, TextInput, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Button from 'apsl-react-native-button';
import DeviceInfo from 'react-native-device-info';
import firebaseStore from '../store/firebaseStore';
import profileStore from '../store/profileStore';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';
import {k} from './Global';
import {colors} from '../constants';
import {RText} from './common';
import {Actions} from 'react-native-router-flux';

type Props = {
  error: string,
  onVerify: Function,
};

@observer
export default class VerifyCode extends React.Component {
  props: Props;
  @observable code: string = '______';
  @observable hiddenCode = '';
  @observable isConfirming: boolean = false;
  @observable isResending: boolean = false;
  @observable isResent: boolean = false;
  @observable errorMessage: string = '';
  input: any;

  static left = () => <LeftNav />;

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.error && nextProps.error !== this.props.error) {
      alert(nextProps.error);
    }
  }

  processText = (text: string): void => {
    this.hiddenCode = text;
    this.code = `${text}______`.slice(0, 6);
  };

  resend = async () => {
    this.isResending = true;
    await firebaseStore.resendCode();
    this.isResending = false;
    this.isResent = true;
  };

  verify = async () => {
    try {
      this.isConfirming = true;
      this.errorMessage = '';
      await firebaseStore.confirmCode({code: this.code, resource: DeviceInfo.getUniqueID()});
      await profileStore.firebaseRegister();
      await profileStore.connect();
      // should we continue awaiting all the other login/connect steps (checkProfile and checkHandle?)
      Actions.checkProfile();
      // Actions.logged();
      Keyboard.dismiss();
    } catch (err) {
      console.warn('Verify error', err.code, err.message);
      switch (err.code) {
        // TODO: figure out whch are the common errors and include more precise messages
        default:
          this.errorMessage = 'Invalid Confirmation Code';
      }
      // if (err.indexOf('credential is invalid')) {
      //   this.errorMessage = 'Invalid Confirmation Code';
      // }
    } finally {
      this.isConfirming = false;
    }
  };

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', backgroundColor: colors.WHITE}}>
        <View style={{flexDirection: 'row', marginTop: 80 * k}}>
          <Image style={[{width: 60, height: 69, margin: 20 * k}]} resizeMode='contain' source={require('../../images/iconBot.png')} />
          <View>
            <RText size={28} weight='Light' color={colors.PINK}>
              {'We sent you a\r\n6-digit code'}
            </RText>
            <RText size={20} weight='Medium' color={colors.PINK} style={{marginTop: 10 * k}}>
              {firebaseStore.phone}
            </RText>
          </View>
        </View>

        <View style={{marginVertical: 30 * k, alignItems: 'center'}}>
          <RText size={12.5} weight='Bold' color={colors.PINK}>
            {/* {!!this.props.error && 'Invalid Confirmation Code'} */}
            {this.errorMessage}
          </RText>
          <RText size={40} weight='Light' color={colors.PINK} style={{letterSpacing: 15, paddingLeft: 15}}>
            {this.code}
          </RText>
        </View>

        <View style={{flexDirection: 'row', marginHorizontal: 20}}>
          <TouchableOpacity disabled={this.isResent} onPress={this.resend} style={[styles.button, styles.resendBtn]}>
            {this.isResent &&
              <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                <Image style={{marginRight: 10}} source={require('../../images/iconCheckBotAdded.png')} />
                <Text style={styles.resendTxt}>Code Sent</Text>
              </View>}
            {!this.isResent &&
              <Text style={styles.resendTxt}>
                {this.isResending ? 'Resending...' : 'Resend Code'}
              </Text>}
          </TouchableOpacity>
          <Button onPress={this.verify} style={styles.button} textStyle={styles.verifyTxt} isDisabled={this.hiddenCode.length < 6 || this.isConfirming}>
            {this.isConfirming ? 'Verifying...' : 'Verify'}
          </Button>
        </View>
        <HiddenText onChangeText={this.processText} />
      </View>
    );
  }
}

const HiddenText = props =>
  (<TextInput
    style={{height: 1, width: 1, fontSize: 1, color: colors.WHITE, position: 'absolute', top: -100, left: -100}}
    autoFocus
    autoCorrect={false}
    keyboardType='numeric'
    // onChangeText={this.processText}
    maxLength={6}
    caretHidden
    // ref={r => (this.input = r)}
    {...props}
  />);

const LeftNav = () =>
  (<TouchableOpacity onPress={Actions.pop} style={{left: 27 * k, flexDirection: 'row', alignItems: 'center'}}>
    <Image source={require('../../images/left-chevron-small.png')} style={{marginRight: 3 * k}} />
    <RText size={15} color={colors.WARM_GREY_2}>
      Edit Number
    </RText>
  </TouchableOpacity>);

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
});
