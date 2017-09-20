// @flow

import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {k} from '../Global';
import {colors} from '../../constants';
import Bot from '../../model/Bot';
import {observer} from 'mobx-react/native';
import location from '../../store/locationStore';

type Props = {
  bot: Bot,
};

const styles = StyleSheet.create({
  text: {
    color: colors.DARK_GREY,
    fontFamily: 'Roboto-Regular',
    fontSize: 13 * k,
  },
});

const EventBotMetabar = ({bot}: Props) => {
  const distance = location.location
    ? location.distanceToString(location.distance(location.location.latitude, location.location.longitude, bot.location.latitude, bot.location.longitude))
    : null;
  return (
    <View style={{flexDirection: 'row', height: 40 * k, alignItems: 'center'}}>
      <View style={{padding: 10 * k}}>
        <Image source={require('../../../images/iconSubSmall.png')} />
      </View>
      <View style={{paddingRight: 10 * k}}>
        <Text style={styles.text}>{bot.followersSize}</Text>
      </View>
      <View style={{flex: 1}} />
      <View style={{padding: 10 * k}}>
        <Image source={require('../../../images/iconBotLocation2.png')} />
      </View>
      <View style={{paddingRight: 15 * k}}>
        <Text style={styles.text}>{distance}</Text>
      </View>
    </View>
  );
};

export default observer(EventBotMetabar);
