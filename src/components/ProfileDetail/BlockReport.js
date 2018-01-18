// @flow

import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Alert, Image} from 'react-native';
import {observer} from 'mobx-react/native';
import ActionSheet from 'react-native-actionsheet';
import {Actions} from 'react-native-router-flux';
import {Profile} from 'wocky-client';
import {k} from '../Global';
import {colors} from '../../constants';

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
      const {handle} = this.props.profile;
      Alert.alert(
        `Are you sure you want to block @${handle}?`,
        `If you’re friends, blocking @${handle} will unfriend him/her, and you will no longer be able to view each other's profiles and bots.`,
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Block',
            style: 'destructive',
            onPress: () => {
              friendStore.block(this.props.profile);
              Actions.reset('root');
            },
          },
        ],
      );
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
