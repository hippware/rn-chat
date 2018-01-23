// @flow

import React from 'react';
import {StyleSheet, TouchableOpacity, Image, View, Text} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import {observable} from 'mobx';
import type {IObservableArray} from 'mobx';
import {Actions} from 'react-native-router-flux';
import {Profile} from 'wocky-client';
import Screen from '../Screen';
import {k} from '../Global';
import {colors} from '../../constants';
import BotListView from '../BotListView';
import BotButton from '../BotButton';
import BlockReport from './BlockReport';
import Header from './Header';
import {ProfileHandle} from '../common';
import Right from './RightNavButton';
import Title from './Title';

type Props = {
  item: string,
};

@inject('wocky')
@observer
export default class ProfileDetail extends React.Component<Props> {
  handler: ?Function;
  list: any;
  @observable profile: Profile;

  static right = Right;

  // static right = inject('wocky')(observer(({wocky}) => {}));

  // NOTE: injecting into rnrf static throws Error "Cannot call a class as a function"
  // TODO: onPress to scroll botlist to top
  // static renderTitle = inject('wocky')(({item, wocky}) => <ProfileHandle profile={wocky.getProfile(item)} size={18} />);

  // NOTE: this never renders at all
  // static renderTitle = Title;

  async componentWillMount() {
    this.profile = await this.props.wocky.loadProfile(this.props.item);
  }

  _header = () => <Header profile={this.profile} isDay />;

  render() {
    return this.profile ? (
      <Screen isDay>
        <BotListView ref={r => (this.list = r)} list={this.bots} user={this.profile} hideAvatar header={this._header} />
        <BotButton />
      </Screen>
    ) : null;
  }
}
