// @flow

import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react/native';
import location from '../store/locationStore';
import Switch from './Switch';
import Bot from '../model/Bot';
import {colors} from '../constants';
import {RText} from './common';
import {k} from './Global';

type Props = {
  bot: Bot,
};

const VisibilitySwitch = ({bot}: Props) => {
  const color = location.isDay ? colors.DARK_PURPLE : 'white';
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 5 * k}}>
      <TouchableOpacity style={{width: 113, alignItems: 'center'}} onPress={() => this.switch.deactivate()}>
        <RText color={color} size={15} style={{opacity: bot.isPublic ? 0.3 : 1}}>
          Private
        </RText>
      </TouchableOpacity>
      <Switch
        style={{flex: 1, alignItems: 'center'}}
        ref={r => (this.switch = r)}
        active={bot.isPublic}
        buttonRadius={15}
        onChangeState={isPublic => (bot.isPublic = isPublic)}
        buttonContent={<Image source={bot.isPublic ? require('../../images/iconPublic.png') : require('../../images/iconPrivate.png')} />}
        toggleHeight={32}
        toggleWidth={75}
        switchHeight={38}
        switchWidth={150}
        activeBackgroundColor={colors.GREY}
        inactiveBackgroundColor={colors.GREY}
        activeButtonColor='white'
        inactiveButtonColor='white'
        activeButtonPressedColor='white'
        inactiveButtonPressedColor='white'
        buttonShadow={{
          shadowColor: '#000',
          shadowOpacity: 0.5,
          shadowRadius: 0,
          shadowOffset: {height: 0, width: 0},
        }}
      />
      <TouchableOpacity style={{width: 113, alignItems: 'center'}} onPress={() => this.switch.activate()}>
        <RText color={color} size={15} style={{opacity: bot.isPublic ? 1 : 0.3}}>
          Public
        </RText>
      </TouchableOpacity>
    </View>
  );
  // {/* <Separator width={1} /> */}
  // {/* <Cell style={{alignItems: 'flex-start', padding: 10 * k}} imageStyle={{paddingLeft: 14 * k}} image={require('../../images/iconSubs.png')}>
  //   <TouchableOpacity onPress={() => bot.followersSize && Actions.subscribers({item: bot.id})} style={{flex: 1}}>
  //     <Text style={{fontSize: 15 * k, fontFamily: 'Roboto-Regular', color}}>{bot.followersSize} Subscribers</Text>
  //   </TouchableOpacity>
  // </Cell> */}
  // );
};

export default observer(VisibilitySwitch);
