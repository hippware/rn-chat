// @flow

import React from 'react';
import {Clipboard, TouchableOpacity, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import botFactory from '../../factory/botFactory';
import {colors} from '../../constants';
import {k} from '../Global';
import {RText} from '../common';
import notificationStore from '../../store/notificationStore';

// Mixin for DRY principle, check article:
// http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/
const BotNavBarMixin = superclass =>
  class extends superclass {
    static renderTitle = ({item, scale}) => {
      const bot = botFactory.create({id: item});
      const map = scale === 0;
      return (
        <TouchableOpacity
          onLongPress={() => {
            Clipboard.setString(bot.address);
            notificationStore.flash('Address copied to clipboard 👍');
          }}
          // @TODO: need a way to call scrollToEnd on a ref in the mixin implementer
          onPress={() => scale === 0 && Actions.refresh({scale: 0.5})}
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
            <RText minimumFontScale={0.6} numberOfLines={1} weight='Light' size={14} color={colors.DARK_PURPLE} style={{textAlign: 'center'}}>
              {bot.address}
            </RText>
          )}
        </TouchableOpacity>
      );
    };

    static rightButton = ({item}) => {
      const bot = botFactory.create({id: item});
      const isOwn = !bot.owner || bot.owner.isOwn;
      return isOwn || bot.isPublic ? (
        <TouchableOpacity onPress={() => Actions.botShareSelectFriends({botId: item})} style={{marginRight: 20 * k}}>
          <Image source={require('../../../images/shareIcon.png')} />
        </TouchableOpacity>
      ) : null;
    };
  };

export default BotNavBarMixin;
