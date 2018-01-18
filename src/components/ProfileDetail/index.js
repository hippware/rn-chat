// @flow

import React from 'react';
import {StyleSheet, TouchableOpacity, Image, View} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';
import type {IObservableArray} from 'mobx';
import {Actions} from 'react-native-router-flux';
import {Profile} from 'wocky-client';
import Screen from '../Screen';
import {k} from '../Global';
import {colors} from '../../constants';
// import BotListView from '../BotListView';
// import BotButton from '../BotButton';
import BlockReport from './BlockReport';
import Header from './Header';
import {ProfileHandle} from '../common';

type Props = {
  item: string,
};

@observer
export default class ProfileDetail extends React.Component<Props> {
  handler: ?Function;
  list: any;

  static right = ({item}: {item: string}) => {
    const profile: Profile = profileStore.create(item);

    if (profile.isOwn) {
      return (
        <TouchableOpacity onPress={Actions.myAccount} style={styles.rightContainer}>
          <Image source={require('../../../images/settings.png')} />
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
            <Image source={require('../../../images/createmessage.png')} />
          </TouchableOpacity>
          <BlockReport profile={profile} />
        </View>
      );
    }
    return (
      <View style={styles.rightContainer}>
        <BlockReport profile={profile} />
      </View>
    );
  };

  // TODO: onPress to scroll botlist to top
  static renderTitle = ({item}) => <ProfileHandle profile={profileStore.create(item)} size={18} />;

  componentDidMount() {
    this._load();
  }

  _load = async () => {
    // botStore.list(this.bots, this.props.item);
    this.profile = await profileStore.createAsync(this.props.item, null, true);
  };

  _header = () => <Header profile={this.profile} isDay={location.isDay} />;

  render() {
    const {isDay} = location;
    return this.profile ? (
      <Screen isDay={isDay}>
        {/* <BotListView ref={r => (this.list = r)} list={this.bots} user={this.props.item} hideAvatar header={this._header} />
        <BotButton /> */}
      </Screen>
    ) : null;
  }
}

const styles = StyleSheet.create({
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
