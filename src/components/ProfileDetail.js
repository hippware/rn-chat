// @flow

import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Alert, Image, View, Text} from 'react-native';
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
      <Text style={styles.number}>
        {profile.botsSize}
      </Text>
      <Text style={styles.word}>BOTS</Text>
    </View>
    <Separator />
    <TouchableOpacity style={{flex: 1}} onPress={() => Actions.followers({userId: profile.user})}>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={styles.number}>
          {profile.isOwn ? model.friends.followers.length : profile.followersSize}
        </Text>
        {profile.isOwn && model.friends.newFollowers.length > 0 && <NewFollowerDot />}
      </View>
      <Text style={styles.word}>FOLLOWERS</Text>
    </TouchableOpacity>
    <Separator />
    <TouchableOpacity style={{flex: 1}} onPress={() => Actions.following({userId: profile.user})}>
      <Text style={styles.number}>
        {profile.followedSize}
      </Text>

      <Text style={styles.word}>FOLLOWING</Text>
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
        <Text style={styles.displayName}>
          {profile.displayName}
        </Text>
        <Text style={styles.tagline}>
          {profile.tagline}
        </Text>
        {profile.botsSize !== undefined && <MetaBar profile={profile} />}
      </Card>
      <FollowButton {...props} />
    </View>
  );
});

type Props = {
  item: string,
};

@observer
export default class ProfileDetail extends Component {
  @observable bots: IObservableArray<Bots> = new Bots();
  @observable profile: Profile;
  handler: ?Function;
  props: Props;

  static onRight = ({item}) => {
    const profile: Profile = profileStore.create(item);
    if (profile.isOwn) {
      Actions.myAccount();
    } else if (profile.isMutual) {
      messageStore.createChat(profile);
      Actions.chat({item: profile.user});
    } else if (!profile.isFollowed) {
      friendStore.follow(profile);
    }
  };
  static rightButtonImage = ({item}) => {
    const profile: Profile = profileStore.create(item);
    return (profile.isOwn && require('../../images/settings.png')) || (profile.isMutual && require('../../images/createmessage.png'));
  };
  static rightTitle = ({item}) => {
    const profile: Profile = profileStore.create(item);
    return !profile.isOwn && !profile.isMutual && !profile.isFollowed && 'Follow';
  };
  //
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
          ref='list'
          list={this.bots}
          user={this.props.item}
          hideAvatar
          header={() => <Header profile={profile} isDay={isDay} unfollow={() => this.unfollow(profile)} follow={() => this.follow(profile)} />}
        />
        <BotButton />
      </Screen>;
  }
}

const styles = StyleSheet.create({
  header: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
  },
  displayName: {
    paddingTop: 10 * k,
    fontFamily: 'Roboto-Regular',
    fontSize: 16 * k,
    color: colors.navBarTextColorDay,
    textAlign: 'center',
  },
  tagline: {
    paddingBottom: 23 * k,
    fontFamily: 'Roboto-Regular',
    fontSize: 13 * k,
    color: colors.navBarTextColorDay,
    textAlign: 'center',
  },
  metabar: {
    flexDirection: 'row',
    paddingBottom: 30 * k,
  },
  number: {
    fontFamily: 'Roboto-Regular',
    fontSize: 22 * k,
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
  follow: {
    color: colors.PINK,
    fontFamily: 'Roboto-Regular',
    fontSize: 15 * k,
  },
  word: {
    fontFamily: 'Roboto-Light',
    fontSize: 11 * k,
    color: colors.DARK_GREY,
    textAlign: 'center',
  },
});
