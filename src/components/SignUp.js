// @flow

import React from 'react';
import {View, Image, StyleSheet, Text, Linking} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {k} from './Global';
import {StatelessForm} from 'react-native-stateless-form';
import SignUpTextInput from './SignUpTextInput';
import SignUpAvatar from './SignUpAvatar';
import model from '../model/model';
import {observer} from 'mobx-react/native';
import * as log from '../utils/log';
import {observable} from 'mobx';
import autobind from 'autobind-decorator';
import {colors} from '../constants';
import Button from 'apsl-react-native-button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import profileStore from '../store/profileStore';

@autobind
@observer
export default class SignUp extends React.Component {
  componentDidMount() {
    // set correct isValid
    if (model.profile) {
      try {
        model.profile.validate();
      } catch (e) {
      }
    }
  }
  @observable loading: boolean = false;
  render() {
    if (!model.profile) {
      log.log('NULL PROFILE!', {level: log.levels.ERROR});
      return null;
    }
    const {loaded, handle, user} = model.profile;
    if (!loaded) {
      log.log('PROFILE IS NOT LOADED', handle, user, {level: log.levels.ERROR});
    }
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>
        <StatelessForm>
          <View style={{marginLeft: 70 * k, marginRight: 70 * k, marginTop: 47.5 * k, flexDirection: 'row'}}>
            <Image style={{width: 60 * k, height: 69 * k}} source={require('../../images/pink.png')} />
            <View style={{paddingLeft: 20 * k}}>
              <Text style={{fontFamily: 'Roboto-Light', fontSize: 30 * k, color: colors.PINK, lineHeight: 35 * k}}>Let's create your profile!</Text>
            </View>
          </View>
          <View style={{marginTop: 15 * k, marginBottom: 15 * k, alignItems: 'center'}}>
            <SignUpAvatar avatar={model.profile.avatar} />
          </View>
          <SignUpTextInput icon={require('../../images/iconUsernameNew.png')} name='handle' data={model.profile} label='Username' autoCapitalize='none' />
          <SignUpTextInput icon={require('../../images/iconSubsNew.png')} name='firstName' data={model.profile} label='First Name' />
          <SignUpTextInput name='lastName' data={model.profile} label='Last Name' />
          <SignUpTextInput
            onSubmit={Actions.states.signUp.success}
            icon={require('../../images/iconEmailNew.png')}
            name='email'
            data={model.profile}
            label='Email'
            autoCapitalize='none'
          />
          <Text style={styles.agreeNote}>
            {'By signing up you agree to our '}
            <Text onPress={() => Linking.openURL('https://tinyrobot.com/privacy-policy/')} style={styles.linkText}>
              Privacy Policy
            </Text>
            {',\r\n '}
            <Text onPress={() => Linking.openURL('https://tinyrobot.com/terms-of-service/')} style={styles.linkText}>
              Terms of Service
            </Text>
            <Text>{', and for us to contact you via email\r\nfor updates and information.'}</Text>
          </Text>
          <Button
            isLoading={Actions.currentScene !== this.props.name}
            isDisabled={!model.profile.isValid}
            onPress={() => {
              profileStore.isNew = true;
              Actions.states.signUp.success();
            }}
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
    color: colors.DARK_GREY,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
  },
  linkText: {
    fontSize: 12.5 * k,
    color: colors.DARK_GREY,
    fontFamily: 'Roboto-Bold',
  },
  paginationStyle: {bottom: 170 * k},
});
