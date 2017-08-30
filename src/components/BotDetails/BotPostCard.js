// @flow

import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import BotPost from '../../model/BotPost';
import Bot from '../../model/Bot';
import Avatar from '../Avatar';
import {k, width} from '../Global';
import {Actions} from 'react-native-router-flux';
import * as colors from '../../constants/colors';
import {observer} from 'mobx-react/native';
import BotPostOptions from './BotPostOptions';
import {RText} from '../common';

type Props = {
  item: BotPost,
  bot: Bot,
};

export default observer((props: Props) => {
  const post = props.item;
  const bot = props.bot;
  const timestamp = post.relativeDateAsString;
  return (
    <View style={{backgroundColor: 'white'}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'row', flex: 1, paddingVertical: 10 * k}}>
          <View style={{paddingHorizontal: 15 * k, marginTop: -20 * k}}>
            <Avatar size={36 * k} profile={post.profile} />
          </View>
          <View style={{flex: 1, paddingRight: 8 * k}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => Actions.profileDetails({item: post.profile.user})}>
                  <RText color={colors.DARK_PURPLE} weight='Medium' size={13} style={styles.hyperlink}>
                    @{post.profile.handle}
                  </RText>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1}}>
                <RText size={12} weight='Light' color={colors.DARK_GREY} style={styles.timestamp}>
                  {timestamp}
                </RText>
              </View>
            </View>
          </View>
        </View>
        <BotPostOptions bot={bot} item={post} />
      </View>
      {post.content &&
        <View style={{flex: 1, paddingBottom: 15 * k, paddingLeft: 20 * k, paddingRight: 20 * k}}>
          <RText weight='Light' size={16} color={colors.DARK_PURPLE}>
            {post.content}
          </RText>
        </View>}
      {post.image &&
        post.image.source &&
        <View style={{flex: 1}}>
          <Image style={{height: width, width}} source={post.image.source} resizeMode='contain' />
        </View>}
    </View>
  );
});

const styles = StyleSheet.create({
  hyperlink: {
    letterSpacing: -0.1,
  },
  action: {
    color: colors.PURPLISH_GREY,
    fontFamily: 'Roboto-Regular',
    fontSize: 13 * k,
    letterSpacing: -0.1,
  },
  title: {
    flex: 1,
    fontFamily: 'Roboto-Regular',
    fontSize: 15 * k,
  },
  timestamp: {
    textAlign: 'right',
  },
});
