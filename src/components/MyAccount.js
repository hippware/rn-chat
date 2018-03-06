// @flow

import React from 'react';
import {View, TouchableOpacity} from 'react-native';
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
import FormTextInput from './FormTextInput';
import {colors} from '../constants';
import {RText, Separator} from './common';
import {ValidatableProfile} from '../utils/formValidation';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Title = inject('wocky')(observer(({wocky}) =>
  (wocky.profile ? (
    <RText
      size={16}
      style={{
        letterSpacing: 0.5,
        color: colors.DARK_PURPLE,
      }}
    >
      {`@${wocky.profile.handle}`}
    </RText>
  ) : null)));

const Right = inject('profileValidationStore', 'wocky')(observer(({profileValidationStore, wocky}) => {
  const {profile} = wocky;
  if (!profile) {
    return null;
  }
  return (
    <TouchableOpacity
      onPress={async () => {
        try {
          await profileValidationStore.save();
          Actions.pop();
        } catch (e) {
          alert(e);
        }
      }}
      disabled={profile.updating}
    >
      <RText
        size={16}
        style={{
          marginRight: 10 * k,
          color: colors.PINK,
          opacity: profile.updating ? 0.5 : 1,
        }}
      >
          Save
      </RText>
    </TouchableOpacity>
  );
}));

@inject('wocky', 'profileValidationStore')
@observer
export default class MyAccount extends React.Component<{}> {
  static title = () => <Title />;
  static rightButton = () => <Right />;

  @observable saving: boolean = false;
  @observable vProfile: ValidatableProfile;
  handle: any;
  firstName: any;
  lastName: any;
  email: any;

  componentDidMount() {
    this.vProfile = new ValidatableProfile(this.props.wocky.profile);
    this.props.profileValidationStore.setProfile(this.vProfile);
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
        <KeyboardAwareScrollView>
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
            <Separator />
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
        </KeyboardAwareScrollView>
      </Screen>
    );
  }
}
