// @flow

import React from 'react';
import {View, Text} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import {k} from './Global';
import SignUpAvatar from './SignUpAvatar';
import {Actions} from 'react-native-router-flux';
import {GiftedForm, GiftedFormManager} from 'react-native-gifted-form'; // eslint-disable-line
import validators from '../utils/formValidators';
import LogoutButton from './LogoutButton';
import ProfileInfo from './ProfileInfo';
import Screen from './Screen';
import * as log from '../utils/log';

@inject('wocky')
@observer
export default class MyAccount extends React.Component<{}> {
  // static title = () => `@${wocky.profile.handle}`;
  // static rightTitle = 'Save';
  // static onRight() {
  //   profileStore.update(GiftedFormManager.stores.myAccount.values);
  //   Actions.pop();
  // }

  render() {
    const {profile} = this.props.wocky;
    if (!profile) {
      log.log('NULL PROFILE', {level: log.levels.ERROR});
      return <Screen isDay />;
    }
    const {handle, firstName, lastName, email, avatar} = profile;
    return (
      <Screen>
        <GiftedForm
          testID='myAccount'
          formName='myAccount'
          formStyles={{containerView: {backgroundColor: 'transparent'}}}
          validators={validators}
          defaults={{handle, firstName, lastName, email}}
        >
          <SignUpAvatar
            avatar={avatar}
            profile={this.props.profile}
            isDay
            style={{
              top: 5,
              backgroundColor: 'rgb(243,244,246)',
              borderRadius: 33 * k,
              width: 66 * k,
              height: 66 * k,
            }}
          />

          {profile.error && <Text style={{color: 'red', padding: 10, textAlign: 'center'}}>{profile.error}</Text>}

          <ProfileInfo isDay profile={profile} editMode />

          <View style={{height: 100}}>
            <LogoutButton />
          </View>
        </GiftedForm>
      </Screen>
    );
  }
}
