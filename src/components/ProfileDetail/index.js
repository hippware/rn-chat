// @flow

import React from 'react';
import {observer, inject} from 'mobx-react/native';
import {observable} from 'mobx';
import {Profile} from 'wocky-client';
import Screen from '../Screen';
import BotListView from '../BotListView';
import BotButton from '../BotButton';
import Header from './Header';
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
  static renderTitle = ({item}) => <Title item={item} />;

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
