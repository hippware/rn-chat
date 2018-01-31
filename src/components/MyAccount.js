// @flow

import React from 'react';
import {View} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import {observable} from 'mobx';
import {k} from './Global';
import SignUpAvatar from './SignUpAvatar';
import {Actions} from 'react-native-router-flux';
import LogoutButton from './LogoutButton';
import Screen from './Screen';
import * as log from '../utils/log';
import Card from './Card';
import Cell from './Cell';
import Separator from './Separator';
import FormTextInput from './FormTextInput';
import {colors} from '../constants';
import {RText} from './common';
import {ValidatableProfile} from '../utils/formValidation';

@inject('wocky')
@observer
export default class MyAccount extends React.Component<{}> {
  // static title = () => `@${wocky.profile.handle}`;
  // static rightTitle = 'Save';
  // static onRight() {
  //   profileStore.update(GiftedFormManager.stores.myAccount.values);
  //   Actions.pop();
  // }

  @observable saving: boolean = false;
  @observable vProfile: ValidatableProfile;
  handle: any;
  firstName: any;
  lastName: any;
  email: any;

  componentDidMount() {
    this.vProfile = new ValidatableProfile(this.props.wocky.profile);
  }

  render() {
    const {profile} = this.props.wocky;
    if (!profile) {
      log.log('NULL PROFILE', {level: log.levels.ERROR});
      return <Screen isDay />;
    }
    const {handle, firstName, lastName, email, avatar} = profile;
    return (
      <Screen>
        <SignUpAvatar
          style={{
            top: 5,
            backgroundColor: 'rgb(243,244,246)',
            borderRadius: 33 * k,
            width: 66 * k,
            height: 66 * k,
          }}
        />
        <Card isDay style={{opacity: 0.95}}>
          <View style={{padding: 15 * k}}>
            <RText size={16} weight='Medium' style={{color: colors.navBarTextColorDay}}>
              Profile Info
            </RText>
          </View>
          <Separator width={1} />
          <FormTextInput label='First Name' store={this.vProfile && this.vProfile.firstName} icon={require('../../images/iconSubsNew.png')} />
          <FormTextInput label='Last Name' store={this.vProfile && this.vProfile.lastName} />
          <FormTextInput label='Username' store={this.vProfile && this.vProfile.handle} autoCapitalize='none' icon={require('../../images/iconUsernameNew.png')} />
          {/* TODO: phoneStore.format
            <Cell image={require('../../images/iconPhoneSmall.png')}>{format(props.profile.phoneNumber)}</Cell>
          <Separator width={1} /> */}
          <FormTextInput label='Email' store={this.vProfile && this.vProfile.email} icon={require('../../images/iconEmailNew.png')} />
          <Cell
            image={require('../../images/block.png')}
            onPress={Actions.blocked}
            imageStyle={{height: 20 * k, width: 20 * k, marginHorizontal: 5 * k}}
            style={{marginTop: 10 * k}}
          >
            <RText numberOfLines={1} size={18} style={{flex: 1, color: colors.DARK_PURPLE}}>
              Blocked Users
            </RText>
          </Cell>
          {/* <Cell image={icon} style={{justifyContent: 'center'}} imageStyle={{height: 20 * k, width: 20 * k, marginHorizontal: 5 * k}}> */}
        </Card>

        <View style={{height: 100}}>
          <LogoutButton />
        </View>
      </Screen>
    );
  }
}
