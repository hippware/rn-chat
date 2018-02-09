// @flow

import React from 'react';
import {View, Image, StyleSheet, Text, Linking} from 'react-native';
import {observable, when} from 'mobx';
import {observer, inject} from 'mobx-react/native';
import {Actions} from 'react-native-router-flux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {k} from './Global';
import FormTextInput from './FormTextInput';
import SignUpAvatar from './SignUpAvatar';
// import * as log from '../utils/log';
import {colors} from '../constants';
import Button from 'apsl-react-native-button';
import {RText, Spinner} from './common';
import {ValidatableProfile} from '../utils/formValidation';

@inject('wocky')
@observer
class SignUp extends React.Component<{}> {
  @observable vProfile: ValidatableProfile;
  handle: any;
  firstName: any;
  lastName: any;
  email: any;
  when: any;

  componentDidMount() {
    this.vProfile = this.props.wocky.profile && new ValidatableProfile(this.props.wocky.profile);
  }

  done = () => {
    const {profile} = this.props.wocky;
    profile.update(this.vProfile.asObject);
    this.when = when(() => !profile.updating && !profile.updateError, () => Actions.logged());
  };

  render() {
    const {profile} = this.props.wocky;
    if (!profile) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Profile is not loaded</Text>
        </View>
      );
    }
    const {updating, updateError} = profile;
    // TODO: handle update errors with notificationStore. Watch for updateError in componentDidMount and flash error
    if (updateError !== '') {
      console.warn('update error?', updateError);
    }

    const buttonDisabled = (this.vProfile && !this.vProfile.isValid) || updating;
    return (
      <KeyboardAwareScrollView style={{flex: 1}}>
        <View style={{marginLeft: 70 * k, marginRight: 70 * k, marginTop: 47.5 * k, flexDirection: 'row'}}>
          <Image style={{width: 60 * k, height: 69 * k}} source={require('../../images/pink.png')} />
          <View style={{paddingLeft: 20 * k}}>
            <RText weight='Light' size={30} color={colors.PINK} style={{lineHeight: 35 * k}}>
              Let's create your profile!
            </RText>
          </View>
        </View>
        <View style={{marginTop: 15 * k, marginBottom: 15 * k, alignItems: 'center'}}>
          <SignUpAvatar />
        </View>
        <View style={{marginHorizontal: 36 * k}}>
          <FormTextInput
            icon={require('../../images/iconUsernameNew.png')}
            ref={r => (this.handle = r)}
            name='handle'
            label='Username'
            autoCapitalize='none'
            onSubmitEditing={() => this.firstName.focus()}
            store={this.vProfile && this.vProfile.handle}
          />
          <FormTextInput
            icon={require('../../images/iconSubsNew.png')}
            name='firstName'
            label='First Name'
            ref={r => (this.firstName = r)}
            onSubmitEditing={() => this.lastName.focus()}
            store={this.vProfile && this.vProfile.firstName}
          />
          <FormTextInput
            name='lastName'
            label='Last Name'
            ref={r => (this.lastName = r)}
            onSubmitEditing={() => this.email.focus()}
            store={this.vProfile && this.vProfile.lastName}
          />
          <FormTextInput
            onSubmit={this.done}
            icon={require('../../images/iconEmailNew.png')}
            name='email'
            label='Email'
            autoCapitalize='none'
            keyboardType='email-address'
            returnKeyType='done'
            ref={r => (this.email = r)}
            store={this.vProfile && this.vProfile.email}
          />
        </View>
        <RText size={12.5} color={colors.DARK_GREY} style={styles.agreeNote}>
          {'By signing up you agree to our '}
          <RText weight='Bold' onPress={() => Linking.openURL('https://tinyrobot.com/privacy-policy/')}>
            Privacy Policy
          </RText>
          {',\r\n '}
          <RText weight='Bold' onPress={() => Linking.openURL('https://tinyrobot.com/terms-of-service/')}>
            Terms of Service
          </RText>
          <RText>{', and for us to contact you via email\r\nfor updates and information.'}</RText>
        </RText>
        <Button onPress={this.done} style={styles.submitButton} textStyle={styles.text}>
          {updating ? <Spinner color='white' size={22} /> : 'Done'}
        </Button>
      </KeyboardAwareScrollView>
    );
  }
}

export default SignUp;

const styles = StyleSheet.create({
  text: {fontSize: 17.5 * k, letterSpacing: 0.8, fontFamily: 'Roboto-Regular', color: 'white'},
  submitButton: {
    marginLeft: 37.5 * k,
    marginRight: 37.5 * k,
    borderRadius: 4 * k,
    height: 50 * k,
    borderWidth: 0,
    backgroundColor: 'rgb(254,92,108)',
  },
  agreeNote: {
    marginTop: 35 * k,
    marginBottom: 35 * k,
    fontSize: 12.5 * k,
    textAlign: 'center',
  },
  paginationStyle: {bottom: 170 * k},
});
