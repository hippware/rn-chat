// @flow

import React from 'react';
import {View, TextInput, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
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
import {settings} from '../globals';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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
  @observable buttonText: string = 'Verify';
  input: any;

  static left = () => (
    <TouchableOpacity onPress={Actions.pop} style={{left: 27 * k, flexDirection: 'row', alignItems: 'center'}}>
      <Image source={require('../../images/left-chevron-small.png')} style={{marginRight: 3 * k}} />
      <RText size={15} color={colors.WARM_GREY_2}>
        Edit Number
      </RText>
    </TouchableOpacity>
  );

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
    this.code = '______';
    this.isResending = false;
    // only allow one resend?
    this.isResent = true;
  };

  verify = async () => {
    this.isConfirming = true;
    this.errorMessage = '';
    this.buttonText = 'Verifying...';
    try {
      await firebaseStore.confirmCode({code: this.code, resource: DeviceInfo.getUniqueID()});
    } catch (err) {
      this.handleError('Confirm', err, 'Error confirming code, please try again or resend code');
      return;
    }
    try {
      this.buttonText = 'Registering...';
      await profileStore.firebaseRegister();
    } catch (err) {
      this.handleError('Register', err, 'Error registering account, please try again');
      return;
    }
    try {
      this.buttonText = 'Connecting...';
      await profileStore.connect();
    } catch (err) {
      this.handleError('Connect', err, 'Error connecting, please try again');
      return;
    }
    Actions.pop({animated: false});
    Actions.pop({animated: false});
    Actions.checkProfile();
  };

  handleError = (title: string, err: string, message: string) => {
    if (settings.isStaging) {
      alert(`${title} error: ${err}`);
    }
    this.errorMessage = message;
    this.isConfirming = false;
    this.buttonText = 'Verify';
    this.input.focus();
  };

  render() {
    return (
      <KeyboardAwareScrollView
        style={{flex: 1}}
        contentContainerStyle={{alignItems: 'center', backgroundColor: colors.WHITE}}
        keyboardShouldPersistTaps='always'
      >
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
          <TouchableWithoutFeedback onPress={() => this.input.focus()}>
            {/* need inner view because of https://github.com/facebook/react-native/issues/10180 */}
            <View>
              <RText size={40} weight='Light' color={colors.PINK} style={{letterSpacing: 15, paddingLeft: 15}}>
                {this.code}
              </RText>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={{flexDirection: 'row', marginHorizontal: 20}}>
          <TouchableOpacity disabled={this.isResent || this.isConfirming} onPress={this.resend} style={[styles.button, styles.resendBtn]}>
            {this.isResent && (
              <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                <Image style={{marginRight: 10}} source={require('../../images/iconCheckBotAdded.png')} />
                <Text style={styles.resendTxt}>Code Sent</Text>
              </View>
            )}
            {!this.isResent && <Text style={styles.resendTxt}>{this.isResending ? 'Resending...' : 'Resend Code'}</Text>}
          </TouchableOpacity>
          <Button onPress={this.verify} style={styles.button} textStyle={styles.verifyTxt} isDisabled={this.hiddenCode.length < 6 || this.isConfirming}>
            {this.buttonText}
          </Button>
        </View>
        <TextInput
          style={{height: 1, width: 1, fontSize: 1, color: colors.WHITE, position: 'absolute', top: -100, left: -100}}
          autoFocus
          autoCorrect={false}
          keyboardType='numeric'
          onChangeText={this.processText}
          ref={r => (this.input = r)}
          maxLength={6}
          caretHidden
          {...this.props}
        />
      </KeyboardAwareScrollView>
    );
  }
}

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
