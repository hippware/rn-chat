// @flow

import React from 'react';
import {View} from 'react-native';
import {format} from '../store/phoneStore';
import {k} from './Global';
import Card from './Card';
import Cell from './Cell';
import Separator from './Separator';
import MyAccountTextInput from './MyAccountTextInput';
import {colors} from '../constants';
import {RText} from './common';
import {Actions} from 'react-native-router-flux';

type Props = {
  profile: any,
  isDay: boolean,
  editMode: boolean,
};

const ProfileInfo = (props: Props) => {
  const {isDay, editMode} = props;
  return (
    <Card {...props} style={{opacity: 0.95}}>
      <View style={{padding: 15 * k}}>
        <RText size={16} weight='Medium' style={{flex: 1, color: isDay ? colors.navBarTextColorDay : colors.navBarTextColorNight}}>
          Profile Info
        </RText>
      </View>
      <Separator width={1} />

      {editMode ? <Editable {...props} /> : <ReadOnly {...props} />}

      <Cell style={{alignItems: 'flex-start'}} onPress={Actions.blocked}>
        <RText size={16}>Blocked Users</RText>
      </Cell>
    </Card>
  );
};

const Editable = (props: Props) =>
  (<View>
    <MyAccountTextInput isDay={props.isDay} autoFocus name='firstName' placeholder='First Name' {...props} />
    <MyAccountTextInput isDay={props.isDay} name='lastName' placeholder='Last Name' {...props} />
    <MyAccountTextInput isDay={props.isDay} name='handle' image={require('../../images/iconUsernameSmall.png')} placeholder='Handle' {...props} />
    <Cell image={require('../../images/iconPhoneSmall.png')}>
      {format(props.profile.phoneNumber)}
    </Cell>
    <Separator width={1} />
    <MyAccountTextInput isDay={props.isDay} name='email' image={require('../../images/iconEmail.png')} placeholder='Email' {...props} />
  </View>);

const ReadOnly = ({profile}: Props) =>
  (<View>
    <Cell image={require('../../images/iconMembersXs.png')}>
      {profile.displayName}
    </Cell>
    <Separator width={1} />
    <Cell image={require('../../images/iconUsernameSmall.png')}>
      {profile.handle}
    </Cell>
    <Separator width={1} />
    {!!profile.phoneNumber &&
      <Cell image={require('../../images/iconPhoneSmall.png')}>
        {format(profile.phoneNumber)}
      </Cell>}
    {!!profile.phoneNumber && <Separator width={1} />}
    {!!profile.email &&
      <Cell image={require('../../images/iconEmail.png')}>
        {profile.email}
      </Cell>}
  </View>);

export default ProfileInfo;
