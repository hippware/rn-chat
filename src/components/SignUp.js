import React from 'react';
import {View, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity, Text, Dimensions} from 'react-native';
import {Actions} from 'react-native-router-native';
import {width, k} from './Global';
import {StatelessForm, InlineTextInput} from 'react-native-stateless-form';
import SignUpTextInput from './SignUpTextInput';
import SignUpAvatar from './SignUpAvatar';
import validators from './FormValidators';
import model from '../model/model';
import profileStore from '../store/profileStore';
import {observer} from 'mobx-react/native';
import * as log from '../utils/log';
import {observable} from 'mobx';
import autobind from 'autobind-decorator';
import Profile from '../model/Profile';
import {colors} from '../constants';
import Button from 'apsl-react-native-button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import statem from '../../gen/state';

@autobind
@observer
class SignUp extends React.Component {
  @observable loading: boolean = false;
  async onSubmit() {
    this.loading = true;
    try {
      await profileStore.update({
        handle: model.profile.handle,
        firstName: model.profile.firstName,
        lastName: model.profile.lastName,
        email: model.profile.email,
      });
      statem.signUpScene.success();
    } catch (e) {
      alert(e);
    } finally {
      this.loading = false;
    }
  }
  render() {
    if (!model.profile) {
      log.log('NULL PROFILE!', {level: log.levels.ERROR});
      return null;
    }
    const avatar = model.profile.avatar;
    const {loaded, handle, firstName, lastName, email, user} = model.profile;
    if (!loaded) {
      log.log('PROFILE IS NOT LOADED', handle, user, {level: log.levels.ERROR});
    }
    return (
      <KeyboardAwareScrollView>
        <StatelessForm>
          <Text style={{paddingLeft: 312 * k, paddingTop: 20 * k, fontFamily: 'Roboto-Medium', fontSize: 18 * k, color: colors.PINK}}>Beta</Text>
          <View style={{marginLeft: 70 * k, marginRight: 70 * k, marginTop: 47.5 * k, flexDirection: 'row'}}>
            <Image style={{width: 60 * k, height: 69 * k}} source={require('../../images/pink.png')} />
            <View style={{paddingLeft: 20 * k}}>
              <Text style={{fontFamily: 'Roboto-Light', fontSize: 30 * k, color: colors.PINK, lineHeight: 35 * k}}>Let's create your profile</Text>
            </View>
          </View>
          <View style={{marginTop: 15 * k, marginBottom: 15 * k}}><SignUpAvatar avatar={model.profile.avatar} /></View>
          <SignUpTextInput icon={require('../../images/iconUsernameNew.png')} name='handle' data={model.profile} label='Username' />
          <SignUpTextInput icon={require('../../images/iconSubsNew.png')} name='firstName' data={model.profile} label='First Name' />
          <SignUpTextInput name='lastName' data={model.profile} label='Last Name' />
          <SignUpTextInput onSubmit={this.onSubmit} icon={require('../../images/iconEmailNew.png')} name='email' data={model.profile} label='Email' />
          <View style={styles.agreeNote}>
            <View style={styles.wrap}>
              <Text style={styles.agreeNoteText}>
                By signing up, you agree to the{' '}
              </Text>
              <TouchableOpacity onPress={Actions.privacyPolicy}>
                <Text style={styles.linkText}>Privacy Policy</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.wrap}>
              <Text style={styles.agreeNoteText}> and the </Text>
              <TouchableOpacity onPress={Actions.termsOfService}>
                <Text style={styles.linkText}>Terms of Service.</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Button
              isLoading={this.loading}
              isDisabled={!model.profile.isValid}
              onPress={this.onSubmit}
              style={styles.submitButton}
              textStyle={styles.text}
          >
            Done
          </Button>
        </StatelessForm>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 110 * k,
    backgroundColor: 'transparent',
    right: 0,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  welcomeText: {
    top: 55 * k,
    paddingRight: 30 * k,
    paddingLeft: 30 * k,
    fontSize: 30 * k,
    textAlign: 'center',
    shadowOpacity: 0.2,
    shadowColor: 'rgb(0,0,0)',
    shadowRadius: 2 * k,
    shadowOffset: {width: 0, height: 0},
    color: 'white',
    fontFamily: 'Roboto-Regular',
  },
  text: {fontSize: 17.5 * k, letterSpacing: 0.8, fontFamily: 'Roboto-Regular', color: 'white'},
  signUpButtonView: {
    top: 95 * k,
    paddingLeft: 37.5 * k,
    paddingRight: 37.5 * k,
    height: 50 * k,
  },
  submitButton: {
    marginLeft: 37.5 * k,
    marginRight: 37.5 * k,
    borderRadius: 4 * k,
    height: 50 * k,
    borderWidth: 0,
    backgroundColor: 'rgb(254,92,108)',
  },
  signUpForm: {top: 110 * k, paddingLeft: 37 * k, paddingRight: 37 * k},
  signUpFormInner: {borderRadius: 2 * k, backgroundColor: 'rgba(228,228,228,0.3)'},
  agreeNote: {
    marginTop: 35 * k,
    marginBottom: 35 * k,
  },
  agreeNoteText: {
    fontSize: 12.5 * k,
    color: colors.DARK_GREY,
    fontFamily: 'Roboto-Regular',
  },
  textInput: {
    flex: 1,
    height: 51 * k,
    left: 20 * k,
    right: 15.2 * k,
    color: 'rgba(255,255,255,0.75)',
    fontFamily: 'Roboto-Regular',
    fontSize: 18 * k,
  },
  phoneInput: {
    flex: 1,
    height: 51 * k,
    left: (17 + 12.5) * k,
    right: 15.2 * k,
    color: 'rgba(255,255,255,0.75)',
    fontFamily: 'Roboto-Regular',
  },
  linkText: {
    fontSize: 12.5 * k,
    color: colors.DARK_GREY,
    fontFamily: 'Roboto-Bold',
  },
  paginationStyle: {bottom: 170 * k},
  wrap: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default SignUp;
