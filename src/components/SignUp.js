// @flow

import React from 'react';
import {View, Image, StyleSheet, Text, Linking} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {k} from './Global';
import {StatelessForm} from '../../thirdparty/react-native-stateless-form';
import SignUpTextInput from './SignUpTextInput';
import SignUpAvatar from './SignUpAvatar';
import model from '../model/model';
import {observer} from 'mobx-react/native';
import * as log from '../utils/log';
import {observable} from 'mobx';
import {colors} from '../constants';
import Button from 'apsl-react-native-button';
import profileStore from '../store/profileStore';
import {RText, Spinner} from './common';

@observer
export default class SignUp extends React.Component<{}> {
  @observable saving: boolean = false;

  componentDidMount() {
    if (model.profile) {
      try {
        model.profile.validate();
      } catch (e) {} // eslint-disable-line
    }
  }

  done = async () => {
    this.saving = true;
    profileStore.isNew = true;
    await profileStore.save();
    this.saving = false;
    Actions.retrieveProfile();
  };

  render() {
    if (!model.profile) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Profile is not loaded</Text>
        </View>
      );
    }
    const {loaded, handle, user} = model.profile;
    if (!loaded) {
      log.log('PROFILE IS NOT LOADED', handle, user, {level: log.levels.ERROR});
    }
    const isLoading = this.saving;
    return (
      <StatelessForm>
        <View style={{marginLeft: 70 * k, marginRight: 70 * k, marginTop: 47.5 * k, flexDirection: 'row'}}>
          <Image style={{width: 60 * k, height: 69 * k}} source={require('../../images/pink.png')} />
          <View style={{paddingLeft: 20 * k}}>
            <RText weight='Light' size={30} color={colors.PINK} style={{lineHeight: 35 * k}}>
              Let's create your profile!
            </RText>
          </View>
        </View>
        <View style={{marginTop: 15 * k, marginBottom: 15 * k, alignItems: 'center'}}>
          <SignUpAvatar avatar={model.profile.avatar} />
        </View>
        <SignUpTextInput icon={require('../../images/iconUsernameNew.png')} name='handle' data={model.profile} label='Username' autoCapitalize='none' />
        <SignUpTextInput icon={require('../../images/iconSubsNew.png')} name='firstName' data={model.profile} label='First Name' />
        <SignUpTextInput name='lastName' data={model.profile} label='Last Name' />
        <SignUpTextInput
          onSubmit={this.done}
          icon={require('../../images/iconEmailNew.png')}
          name='email'
          data={model.profile}
          label='Email'
          autoCapitalize='none'
          keyboardType='email-address'
        />
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
        <Button isDisabled={!model.profile.isValid} onPress={this.done} style={styles.submitButton} textStyle={styles.text}>
          {isLoading ? <Spinner color='white' size={22} /> : 'Done'}
        </Button>
      </StatelessForm>
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
    textAlign: 'center',
  },
  paginationStyle: {bottom: 170 * k},
});
