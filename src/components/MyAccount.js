import React from 'react';
import {View, Text} from 'react-native';
import {k} from './Global';
import SignUpAvatar from './SignUpAvatar';
import {Actions} from 'react-native-router-flux';
import {GiftedForm, GiftedFormManager} from 'react-native-gifted-form';
import validators from '../utils/formValidators';
import LogoutButton from './LogoutButton';
import ProfileInfo from './ProfileInfo';
import Screen from './Screen';
import profileStore from '../store/profileStore';
import location from '../store/locationStore';
import model from '../model/model';
import {observer} from 'mobx-react/native';
import * as log from '../utils/log';

@observer
export default class MyAccount extends React.Component {
  static title = () => `@${model.profile.handle}`;
  static rightTitle = 'Save';
  static onRight() {
    profileStore.update(GiftedFormManager.stores.myAccount.values);
    Actions.pop();
  }

  render() {
    const isDay = location.isDay;
    const profile = model.profile;
    if (!profile) {
      log.log('NULL PROFILE', {level: log.levels.ERROR});
      return <Screen isDay={isDay} />;
    }
    const {handle, firstName, lastName, email, avatar} = profile;
    return (
      <Screen isDay={isDay}>
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
            isDay={isDay}
            style={{
              top: 5,
              backgroundColor: 'rgb(243,244,246)',
              borderRadius: 33 * k,
              width: 66 * k,
              height: 66 * k,
            }}
          />

          {profile.error && <Text style={{color: 'red', padding: 10, textAlign: 'center'}}>{profile.error}</Text>}

          <ProfileInfo isDay={isDay} profile={profile} editMode />

          <View style={{height: 100}}>
            <LogoutButton />
          </View>
        </GiftedForm>
      </Screen>
    );
  }
}
