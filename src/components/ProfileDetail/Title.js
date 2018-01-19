// @flow

import React from 'react';
import {StyleSheet, TouchableOpacity, Image, View} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import {observable} from 'mobx';
import {Profile} from 'wocky-client';
import {k} from '../Global';
import {colors} from '../../constants';
import {ProfileHandle} from '../common';

@inject('wocky')
@observer
class Title extends React.Component<{}> {
  profile: Profile;
  componentWillMount() {
    this.profile = this.props.wocky.getProfile(this.props.item);
  }
  render() {
    return <ProfileHandle profile={this.profile} size={18} />;
  }
}

export default Title;
