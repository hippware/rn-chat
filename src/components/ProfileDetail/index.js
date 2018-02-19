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
import {isAlive} from 'mobx-state-tree';

type Props = {
  item: string,
};

@inject('wocky')
@observer
export default class ProfileDetail extends React.Component<Props> {
  handler: ?Function;
  list: any;
  @observable profile: Profile;

  static rightButton = ({item}) => <Right item={item} />;
  static renderTitle = ({item}) => <Title item={item} />;

  componentWillMount() {
    this.load();
  }

  load = async () => {
    this.profile = await this.props.wocky.getProfile(this.props.item);
  };

  _header = () => <Header profile={this.profile} isDay />;

  render() {
    if (!this.profile || !isAlive(this.profile)) {
      return null;
    }
    return (
      <Screen isDay>
        <BotListView ref={r => (this.list = r)} list={this.profile.ownBots} user={this.profile} hideAvatar header={this._header} />
        <BotButton />
      </Screen>
    );
  }
}
