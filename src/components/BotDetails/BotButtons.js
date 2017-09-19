// @flow

import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {colors} from '../../constants';
import {k} from '../../globals';
import {observer} from 'mobx-react/native';
import AddBotButton from './AddBotButton';
import {Actions} from 'react-native-router-flux';

export default observer(({isOwn, bot, ...props}) => {
  return (
    <View style={{backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 15 * k, paddingBottom: 5 * k}}>
      <AddBotButton {...props} />
      {bot.isPublic && <TouchableOpacity onPress={() => Actions.botShareSelectFriends({item: bot.id})} style={{paddingLeft: 15 * k}}>
        <Image source={require('../../../images/shareButton.png')} />
      </TouchableOpacity>}
      {<TouchableOpacity style={{paddingLeft: 15 * k}}>
        <Image source={require('../../../images/editButton.png')} />
      </TouchableOpacity>}
    </View>
  );
});
