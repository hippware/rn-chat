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
import * as Progress from 'react-native-progress';

type Props = {
  item: BotPost,
  bot: Bot,
};

const BotPostCard = (props: Props) => {
  const post = props.item;
  const bot = props.bot;
  const timestamp = post.relativeDateAsString;
  return (
    <View style={{backgroundColor: 'white'}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'row', flex: 1, paddingVertical: 5 * k}}>
          <View style={{paddingHorizontal: 15 * k, marginTop: -14 * k}}>
            <Avatar size={40 * k} profile={post.profile} />
          </View>
          <View style={{flex: 1, paddingRight: 8 * k, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => Actions.profileDetails({item: post.profile.user})}>
              <RText color={colors.COOL_BLUE} weight='Medium' size={15} style={styles.hyperlink}>
                @{post.profile.handle}
              </RText>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <RText size={12} weight='Light' color={colors.DARK_GREY}>
                {timestamp}
              </RText>
              <BotPostOptions bot={bot} item={post} />
            </View>
          </View>
        </View>
      </View>
      {!!post.content &&
        <View style={{flex: 1, paddingBottom: 15 * k, paddingLeft: 20 * k, paddingRight: 20 * k}}>
          <RText size={14} color={colors.DARK_PURPLE}>
            {post.content}
          </RText>
        </View>}
      {!!post.image &&
        !!post.image.source &&
        <View style={{flex: 1}}>
          <Image style={{height: width, width}} source={post.image.source} resizeMode='contain' />
          {post.imageSaving && <View style={styles.container}>
            <Progress.CircleSnail size={26 * k} thickness={2} color={colors.PINK} />
          </View>}
        </View>}
    </View>
  );
};

export default observer(BotPostCard);

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
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
