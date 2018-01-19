// @flow

import React from 'react';
import {View} from 'react-native';
import {observer} from 'mobx-react/native';
// import {format} from '../store/phoneStore';
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

const ProfileInfo = observer((props: Props) => {
  const {isDay, editMode, profile} = props;
  return (
    <Card {...props} style={{opacity: 0.95}}>
      <View style={{padding: 15 * k}}>
        <RText size={16} weight='Medium' style={{flex: 1, color: isDay ? colors.navBarTextColorDay : colors.navBarTextColorNight}}>
          Profile Info
        </RText>
      </View>
      <Separator width={1} />
      {editMode ? <Editable profile={profile} {...props} /> : <ReadOnly profile={profile} />}
    </Card>
  );
});

const Editable = observer((props: Props) => (
  <View>
    <MyAccountTextInput isDay={props.isDay} autoFocus name='firstName' placeholder='First Name' {...props} />
    <MyAccountTextInput isDay={props.isDay} name='lastName' placeholder='Last Name' {...props} />
    <MyAccountTextInput isDay={props.isDay} name='handle' image={require('../../images/iconUsernameSmall.png')} placeholder='Handle' {...props} />
    {/* TODO: phoneStore.format
    <Cell image={require('../../images/iconPhoneSmall.png')}>{format(props.profile.phoneNumber)}</Cell> */}
    <Separator width={1} />
    <MyAccountTextInput isDay={props.isDay} name='email' image={require('../../images/iconEmail.png')} placeholder='Email' {...props} />
    <Cell image={require('../../images/block.png')} onPress={Actions.blocked}>
      <RText numberOfLines={1} size={15} style={{flex: 1, color: colors.navBarTextColorDay}}>
        Blocked Users
      </RText>
    </Cell>
  </View>
));

const ReadOnly = observer(({profile}: Props) => (
  <View>
    <Cell image={require('../../images/iconMembersXs.png')}>{profile.displayName}</Cell>
    <Separator width={1} />
    <Cell image={require('../../images/iconUsernameSmall.png')}>{profile.handle}</Cell>
    <Separator width={1} />
    {/* {!!profile.phoneNumber && <Cell image={require('../../images/iconPhoneSmall.png')}>{format(profile.phoneNumber)}</Cell>} */}
    {!!profile.phoneNumber && <Separator width={1} />}
    {!!profile.email && <Cell image={require('../../images/iconEmail.png')}>{profile.email}</Cell>}
  </View>
));

export default ProfileInfo;
