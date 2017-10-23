// @flow

import React from 'react';
import {Text, Clipboard, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import botFactory from '../factory/botFactory';
import {colors} from '../constants';
import ButtonWithPopover from './ButtonWithPopover';

// Mixin for DRY principle, check article:
// http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/
const BotNavBarMixin = superclass =>
  class extends superclass {
    static renderTitle = ({item, scale}) => {
      const bot = botFactory.create({id: item});
      const map = scale === 0;
      return (
        <ButtonWithPopover
          contentStyle={{backgroundColor: colors.DARK_PURPLE}}
          placement='bottom'
          onLongPress={() => Clipboard.setString(bot.address)}
          // @TODO: need a way to call scrollToEnd on a ref in the mixin implementer
          onPress={() => scale === 0 && Actions.refresh({scale: 0.5})}
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
          {map &&
            <Text adjustsFontSizeToFit minimumFontScale={0.8} numberOfLines={1} style={styles.address}>
              {bot.address}
            </Text>}
        </ButtonWithPopover>
      );
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
