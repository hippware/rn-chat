// @flow

import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {k, defaultCover} from './Global';
import Bot from '../model/Bot';
import {observer} from 'mobx-react/native';
import location from '../store/locationStore';
import LinearGradient from 'react-native-linear-gradient';
import Avatar from './Avatar';
import {Actions} from 'react-native-router-flux';
import * as colors from '../constants/colors.js';
import {width} from './Global';

const MainImage = observer(({item}: {item: Bot}) => {
  const source = item.thumbnail && item.thumbnail.source;
  return (
    <View style={{width: 120 * k, height: 120 * k}}>
      <View style={{position: 'absolute'}}>
        <Image style={{width: 120 * k, height: 120 * k}} source={source || defaultCover[item.coverColor % 4]} />
      </View>
    </View>
  );
});

const UserName = observer(({profile}: {profile: Object}) =>
  (<TouchableOpacity
    onPress={() =>
      Actions.profileDetails({
        parent: '_home',
        item: profile.user,
      })}
    style={styles.userNameButton}
  >
    <Text numberOfLines={2} style={styles.userName}>
      @{profile && profile.handle}
    </Text>
  </TouchableOpacity>),
);

const BottomLine = observer(({item, hideAvatar}: {item: Bot, hideAvatar: ?boolean}) => {
  const distance = location.location
    ? location.distanceToString(location.distance(location.location.latitude, location.location.longitude, item.location.latitude, item.location.longitude))
    : null;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Image style={{width: 15 * k, height: 16 * k}} source={require('../../images/iconSubSmall.png')} />
      <Text style={styles.followersSize}>
        {item.followersSize}
      </Text>
      <View style={{paddingLeft: 10 * k}}>
        <Image style={{width: 14 * k, height: 17 * k}} source={require('../../images/iconBotLocation2.png')} />
      </View>
      <Text style={styles.distance}>
        {distance}
      </Text>
      {!hideAvatar && <UserName profile={item.owner} />}
    </View>
  );
});

type Props = {
  style: any,
  hideAvatar: ?boolean,
  item: Bot,
};

const BotCardInner = (props: Props) => {
  const {item, style, hideAvatar} = props;
  const profile = item.owner;

  return (
    <View style={[styles.container, style]}>
      <MainImage item={item} />
      <View style={styles.rightSide}>
        <Text numberOfLines={1} style={styles.botTitle}>
          {item.title}
        </Text>
        <View style={{flexDirection: 'row', flex: 1}}>
          <Text numberOfLines={2} style={styles.smallText}>
            {item.address}
          </Text>
          {!hideAvatar &&
            <View style={styles.avatar}>
              <Avatar size={30} profile={profile} tappable isDay={location.isDay} borderWidth={0} />
            </View>}
        </View>
        <BottomLine {...props} />
      </View>
    </View>
  );
};

export default observer(BotCardInner);

const styles = StyleSheet.create({
  avatar: {
    width: 60 * k,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  rightSide: {
    flex: 1,
    padding: 15 * k,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    width,
  },
  smallText: {
    flex: 1,
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    color: colors.DARK_GREY,
    marginBottom: 10 * k,
  },
  distance: {
    paddingLeft: 10 * k,
    paddingRight: 10 * k,
    fontSize: 12,
    color: colors.DARK_GREY,
    fontFamily: 'Roboto-Regular',
  },
  followersSize: {
    paddingLeft: 5 * k,
    paddingRight: 10 * k,
    fontSize: 12,
    color: colors.DARK_GREY,
    fontFamily: 'Roboto-Regular',
  },
  imagesCount: {
    fontSize: 11,
    color: colors.WHITE,
    backgroundColor: 'transparent',
    fontFamily: 'Roboto-Regular',
  },
  image: {
    position: 'absolute',
    flexDirection: 'row',
    height: 13 * k,
    width: 36 * k,
    right: 2 * k,
    bottom: 7 * k,
  },
  innerWrapper: {
    position: 'absolute',
    top: 70 * k,
    right: 0,
    left: 0,
    bottom: 0,
  },
  botTitle: {
    fontFamily: 'Roboto-Regular',
    color: location.isDay ? colors.PURPLE : 'white',
    fontSize: 15,
  },
  bottomLine: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderColor: 'blue',
  },
  userName: {
    textAlign: 'right',
    fontFamily: 'Roboto-Regular',
    fontSize: 10 * k,
    color: colors.BLUE,
  },
  userNameButton: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
});
