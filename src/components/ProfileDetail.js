// @flow

import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Alert, Image, View, Text, ActionSheetIOS} from 'react-native';
import Screen from './Screen';
import ProfileAvatar from './ProfileAvatar';
import Card from './Card';
import Profile from '../model/Profile';
import location from '../store/locationStore';
import profileStore from '../store/profileStore';
import friendStore from '../store/friendStore';
import {observer} from 'mobx-react/native';
import {observable, when} from 'mobx';
import type {IObservableArray} from 'mobx';
import Bots from '../model/Bots';
import {k} from './Global';
import {colors} from '../constants';
import botStore from '../store/botStore';

import BotListView from './BotListView';
import BotButton from './BotButton';
import messageStore from '../store/messageStore';
import model from '../model/model';
import {Actions} from 'react-native-router-flux';
import {RText} from './common';

type Props = {
  item: string,
};

@observer
export default class ProfileDetail extends Component {
  @observable bots: IObservableArray<Bots> = new Bots();
  @observable profile: Profile;
  handler: ?Function;
  props: Props;
  list: any;

  static right = ({item}: {item: string}) => {
    const profile: Profile = profileStore.create(item);

    if (profile.isOwn) {
      return (
        <TouchableOpacity onPress={Actions.myAccount} style={styles.rightContainer}>
          <Image source={require('../../images/settings.png')} />
        </TouchableOpacity>
      );
    } else if (profile.isMutual) {
      return (
        <View style={styles.rightContainer}>
          <TouchableOpacity
            onPress={() => {
              messageStore.createChat(profile);
              Actions.chat({item: profile.user});
            }}
            style={styles.rightButton}
          >
            <Image source={require('../../images/createmessage.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showBlockReportActionSheet(profile)} style={styles.rightButton}>
            <Image source={require('../../images/ellipsis.png')} />
          </TouchableOpacity>
        </View>
      );
    } else if (profile.isFollowing) {
      return (
        <TouchableOpacity onPress={() => showBlockReportActionSheet(profile)}>
          <Image source={require('../../images/ellipsis.png')} />
        </TouchableOpacity>
      );
    }
    return null;
  };

  // TODO: onPress to scroll botlist to top
  static title = ({item}) => `@${profileStore.create(item).handle}`;

  unfollow = (profile: Profile) => {
    Alert.alert(null, `Are you sure you want to unfollow ${profile.handle}?`, [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Unfollow',
        style: 'destructive',
        onPress: () => friendStore.unfollow(profile),
      },
    ]);
  };

  follow = (profile: Profile) => {
    friendStore.follow(profile);
  };

  componentDidMount() {
    this.handler = when(
      () => model.connected,
      () => {
        this.profile = profileStore.create(this.props.item, null, true);
        botStore.list(this.bots, this.props.item);
      },
    );
  }

  componentWillUnmount() {
    this.handler && this.handler();
    this.handler = null;
  }

  render() {
    const isDay = location.isDay;
    const profile = this.profile;
    return !profile
      ? null
      : <Screen isDay={isDay}>
        <BotListView
          ref={r => (this.list = r)}
          list={this.bots}
          user={this.props.item}
          hideAvatar
          header={() => <Header profile={profile} isDay={isDay} unfollow={() => this.unfollow(profile)} follow={() => this.follow(profile)} />}
        />
        <BotButton />
      </Screen>;
  }
}

const showBlockReportActionSheet = (profile: Profile) =>
  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: ['Report', 'Block', 'Cancel'],
      cancelButtonIndex: 2,
      destructiveButtonIndex: 1,
      // title,
    },
    (index: number) => {
      if (index === 0) console.warn('Report');
      if (index === 1) {
        Alert.alert(null, `Are you sure you want to block @${profile.handle}?`, [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Block',
            style: 'destructive',
            onPress: () => {
              friendStore.block(profile);
              Actions.pop();
            },
          },
        ]);
      }
    },
  );

const Separator = () => <View style={{width: 1 * k, top: 7 * k, height: 34 * k, backgroundColor: colors.SILVER}} />;

const NewFollowerDot = () =>
  (<View
    style={{
      height: 1,
      width: 1,
      borderWidth: 4,
      borderColor: colors.PINK,
      borderRadius: 4,
    }}
  />);

const MetaBar = observer(({profile}: {profile: Profile}) =>
  (<View style={styles.metabar}>
    <View style={{flex: 1}}>
      <RText size={22} style={styles.number}>
        {profile.botsSize}
      </RText>
      <RText weight='Light' size={11} style={styles.word}>
        BOTS
      </RText>
    </View>
    <Separator />
    <TouchableOpacity style={{flex: 1}} onPress={() => Actions.followers({userId: profile.user})}>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <RText size={22} style={styles.number}>
          {profile.isOwn ? model.friends.followers.length : profile.followersSize}
        </RText>
        {profile.isOwn && model.friends.newFollowers.length > 0 && <NewFollowerDot />}
      </View>
      <RText weight='Light' size={11} style={styles.word}>
        FOLLOWERS
      </RText>
    </TouchableOpacity>
    <Separator />
    <TouchableOpacity style={{flex: 1}} onPress={() => Actions.following({userId: profile.user})}>
      <RText size={22} style={styles.number}>
        {profile.followedSize}
      </RText>

      <RText weight='Light' size={11} style={styles.word}>
        FOLLOWING
      </RText>
    </TouchableOpacity>
  </View>),
);

type HeaderProps = {
  profile: Profile,
  isDay: boolean,
  unfollow: Function,
  follow: Function,
};

const FollowButton = observer(({profile, follow, unfollow}: HeaderProps) => {
  if (profile.isFollowed) {
    return (
      <View style={styles.followContainer}>
        <TouchableOpacity onPress={unfollow} style={styles.followButton}>
          <Image source={require('../../images/buttonFollowing.png')} />
        </TouchableOpacity>
      </View>
    );
  } else if (!profile.isOwn) {
    return (
      <View style={styles.followContainer}>
        <TouchableOpacity onPress={follow} style={styles.followButton}>
          <Image source={require('../../images/buttonFollow.png')} />
        </TouchableOpacity>
      </View>
    );
  } else return null;
});

const Header = observer((props: HeaderProps) => {
  const {profile, isDay} = props;
  return (
    <View style={{backgroundColor: colors.WHITE}}>
      <Card style={styles.header}>
        <ProfileAvatar size={100} isDay={isDay} profile={profile} tappable={false} />
        <RText size={16} style={styles.displayName}>
          {profile.displayName}
        </RText>
        <RText size={13} style={styles.tagline}>
          {profile.tagline}
        </RText>
        {profile.botsSize !== undefined && <MetaBar profile={profile} />}
      </Card>
      <FollowButton {...props} />
    </View>
  );
});

const styles = StyleSheet.create({
  header: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
  },
  displayName: {
    paddingTop: 10 * k,
    color: colors.navBarTextColorDay,
    textAlign: 'center',
  },
  tagline: {
    paddingBottom: 23 * k,
    color: colors.navBarTextColorDay,
    textAlign: 'center',
  },
  metabar: {
    flexDirection: 'row',
    paddingBottom: 30 * k,
  },
  number: {
    color: colors.navBarTextColorDay,
    textAlign: 'center',
  },
  followContainer: {
    alignItems: 'center',
    height: 15 * k,
  },
  followButton: {
    marginTop: -30 * k,
  },
  word: {
    color: colors.DARK_GREY,
    textAlign: 'center',
  },
  rightContainer: {
    marginRight: 10 * k,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightButton: {
    marginLeft: 15,
    width: 24,
    height: 24,
    justifyContent: 'center',
  },
});
