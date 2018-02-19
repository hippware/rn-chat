// @flow

import React from 'react';
import {StyleSheet, TouchableOpacity, Image, View} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import {observable} from 'mobx';
import {Profile} from 'wocky-client';
import {k} from '../Global';
import {colors} from '../../constants';
import {ProfileHandle} from '../common';
import {isAlive} from 'mobx-state-tree';

@inject('wocky')
@observer
class Title extends React.Component {
  @observable profile: Profile;
  async componentWillMount() {
    this.profile = await this.props.wocky.getProfile(this.props.item);
  }
  render() {
    if (!this.profile || !isAlive(this.profile)) {
      return null;
    }
    return <ProfileHandle profile={this.profile} size={18} />;
  }
}

export default Title;
