// @flow

import React from 'react';
import {TouchableOpacity} from 'react-native';
import {toJS, when, observable} from 'mobx';
import {inject, observer} from 'mobx-react/native';
import {Actions} from 'react-native-router-flux';
import Screen from '../Screen';
import BotAddress from './BotAddress';

import {RText} from '../common';
import {k} from '../Global';
import {colors} from '../../constants';

const Right = inject('newBotStore')(observer(({newBotStore}) => (
  <TouchableOpacity
    onPress={async () => {
      const bot = await newBotStore.save();
      Actions.botCompose({botId: bot.id});
    }}
    style={{marginRight: 20 * k}}
  >
    <RText size={15} color={colors.PINK}>
        Next
    </RText>
  </TouchableOpacity>
)));

@inject('wocky', 'locationStore', 'analytics', 'geocodingStore', 'newBotStore')
@observer
class BotCreate extends React.Component<{}> {
  trackTimeout: any;
  @observable bot: any;

  static rightButton = () => <Right />;

  componentWillMount() {
    this.createBot();
  }

  createBot = async () => {
    this.bot = await this.props.wocky.createBot();
    this.props.newBotStore.setId(this.bot.id);
    const {location} = this.props.locationStore;
    // TODO: should we have to set title here?
    this.bot.update({location: {...location, isCurrent: true}, title: 'test'});
    const data = await this.props.geocodingStore.reverse(location);
    await this.bot.update({addressData: data.meta, address: data.address});
    // console.log('bot finally', this.bot.toJSON());
    // botStore.changeBotLocation({...data, location, isCurrent: true});
  };

  componentDidMount() {
    // HACK: prevent this from firing *after* creating a new bot and popping
    this.trackTimeout = setTimeout(() => this.props.analytics.track('botcreate_start'), 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.trackTimeout);
  }

  render() {
    return <Screen>{this.bot ? <BotAddress bot={this.bot} /> : null}</Screen>;
  }
}

export default BotCreate;
