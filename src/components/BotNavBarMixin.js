// @flow

import React from 'react';
import {Clipboard, TouchableOpacity, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import botFactory from '../factory/botFactory';
import {colors} from '../constants';
import ButtonWithPopover from './ButtonWithPopover';
import {k} from './Global';
import {RText} from './common';

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
          popover={
            <RText color={colors.WHITE} size={14}>
              Address copied to clipboard
            </RText>
          }
        >
          <RText
            numberOfLines={map ? 1 : 2}
            // must wait for solution to https://github.com/facebook/react-native/issues/14981
            // adjustsFontSizeToFit
            minimumFontScale={0.8}
            weight='Medium'
            size={18}
            color={colors.DARK_PURPLE}
            style={{
              textAlign: 'center',
            }}
          >
            {bot.title}
          </RText>
          {map && (
            <RText /* adjustsFontSizeToFit*/ minimumFontScale={0.6} numberOfLines={1} weight='Light' size={14} color={colors.DARK_PURPLE} style={{textAlign: 'center'}}>
              {bot.address}
            </RText>
          )}
        </ButtonWithPopover>
      );
    };

    static rightButton = ({item}) => {
      const bot = botFactory.create({id: item});
      const isOwn = !bot.owner || bot.owner.isOwn;
      return isOwn || bot.isPublic ? (
        <TouchableOpacity onPress={() => Actions.botShareSelectFriends({item})} style={{marginRight: 20 * k}}>
          <Image source={require('../../images/shareIcon.png')} />
        </TouchableOpacity>
      ) : null;
    };
  };

export default BotNavBarMixin;
