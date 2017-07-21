import React from 'react';
import {View, Text, Clipboard, StyleSheet} from 'react-native';
import Screen from './Screen';
import botFactory from '../factory/botFactory';
import Map from './Map';
import {k, width, height} from './Global';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';
import location from '../store/locationStore';
import Bot, {LOCATION, NOTE, IMAGE} from '../model/Bot';
import autobind from 'autobind-decorator';
import {colors} from '../constants';
import * as log from '../utils/log';
import {Actions} from 'react-native-router-flux';
import ButtonWithPopover from './ButtonWithPopover';

// Mixin for DRY principle, check article:
// http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/
const BotNavBarMixin = superclass => class extends superclass {
  static renderTitle = ({item, map}) => {
    const bot = botFactory.create({id: item});
    return (
      <ButtonWithPopover
        contentStyle={{backgroundColor: colors.DARK_PURPLE}}
        placement='bottom'
        onLongPress={() => Clipboard.setString(bot.address)}
        popover={<Text style={{fontFamily: 'Roboto-Regular', color: 'white', fontSize: 14}}>Address copied to clipboard</Text>}
      >
        <Text
          numberOfLines={2}
          adjustsFontSizeToFit
          minimumFontScale={0.9}
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 18,
            textAlign: 'center',
            color: colors.DARK_PURPLE,
          }}
        >
          {bot.title}
        </Text>
        {map && <Text adjustsFontSizeToFit minimumFontScale={0.9} numberOfLines={2} style={styles.address}>{bot.address}</Text>}
      </ButtonWithPopover>);
  };

  static rightTitle = ({item}) => {
    const bot = botFactory.create({id: item});
    const isOwn = !bot.owner || bot.owner.isOwn;
    return isOwn || bot.isPublic ? 'Share' : ' ';
  };

  static onRight = ({item}) => {
    const bot = botFactory.create({id: item});
    const isOwn = !bot.owner || bot.owner.isOwn;
    isOwn || bot.isPublic ? Actions.botShareSelectFriends({item}) : null;
  };

};

export default BotNavBarMixin;

const styles = StyleSheet.create({
  address: {textAlign: 'center', fontFamily: 'Roboto-Light', fontSize: 14, color: colors.DARK_PURPLE},
});
