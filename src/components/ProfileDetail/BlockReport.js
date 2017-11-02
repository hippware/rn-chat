// @flow

import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Alert, Image, View} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';
import type {IObservableArray} from 'mobx';
import ActionSheet from 'react-native-actionsheet';
import {Actions} from 'react-native-router-flux';

import Screen from '../Screen';
import ProfileAvatar from '../ProfileAvatar';
import Card from '../Card';
import Profile from '../../model/Profile';
import location from '../../store/locationStore';
import profileStore from '../../store/profileStore';
import friendStore from '../../store/friendStore';
import Bots from '../../model/Bots';
import {k} from '../Global';
import {colors} from '../../constants';
import botStore from '../../store/botStore';
import BotListView from '../BotListView';
import BotButton from '../BotButton';
import messageStore from '../../store/messageStore';
import model from '../../model/model';
import {RText} from '../common';

@observer
export default class BlockReport extends Component {
  actionSheet: any;
  props: {
    profile: Profile,
  };

  onTap = (index: number) => {
    if (index === 0) {
      Actions.reportUser({userId: this.props.profile.user});
    } else if (index === 1) {
      Alert.alert(null, `Are you sure you want to block @${this.props.profile.handle}?`, [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Block',
          style: 'destructive',
          onPress: () => {
            friendStore.block(this.props.profile);
            Actions.reset('root');
          },
        },
      ]);
    }
  };

  render() {
    return (
      <TouchableOpacity onPress={() => this.actionSheet.show()} style={styles.rightButton}>
        <Image source={require('../../../images/ellipsis.png')} />
        <ActionSheet ref={o => (this.actionSheet = o)} options={['Report', 'Block', 'Cancel']} cancelButtonIndex={2} destructiveButtonIndex={1} onPress={this.onTap} />
      </TouchableOpacity>
    );
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
