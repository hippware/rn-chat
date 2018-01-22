// @flow

import React from 'react';
import {StyleSheet, TouchableOpacity, Image, View} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import {observable} from 'mobx';
import {Actions} from 'react-native-router-flux';
import {Profile} from 'wocky-client';
import {k} from '../Global';
import BlockReport from './BlockReport';

type Props = {
  item: string,
};

@inject('wocky')
@observer
class Right extends React.Component<Props> {
  @observable profile: Profile;
  async componentWillMount() {
    this.profile = await this.props.wocky.loadProfile(this.props.item);
  }
  render() {
    if (!this.profile) {
      return null;
    }
    if (this.profile.isOwn) {
      return (
        <TouchableOpacity onPress={Actions.myAccount} style={styles.rightContainer}>
          <Image source={require('../../../images/settings.png')} />
        </TouchableOpacity>
      );
    } else if (this.profile.isMutual) {
      return (
        <View style={styles.rightContainer}>
          <TouchableOpacity
            onPress={() => {
              // messageStore.createChat(profile);
              // Actions.chat({item: profile.user});
            }}
            style={styles.rightButton}
          >
            <Image source={require('../../../images/createmessage.png')} />
          </TouchableOpacity>
          <BlockReport profile={this.profile} />
        </View>
      );
    }
    return (
      <View style={styles.rightContainer}>
        <BlockReport profile={this.profile} />
      </View>
    );
  }
}

export default Right;

const styles = StyleSheet.create({
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
