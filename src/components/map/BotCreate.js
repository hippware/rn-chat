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

const Right = inject('wocky', 'newBotStore', 'analytics')(observer(({newBotStore, wocky, analytics}) => (
  <TouchableOpacity
    onPress={async () => {
      const bot = wocky.getBot({id: newBotStore.botId});
      Actions.botCompose({botId: bot.id});
      analytics.track('botcreate_chooselocation', bot.toJSON());
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
    const {wocky, locationStore} = this.props;
    const bot = await wocky.createBot();
    const {location} = locationStore;
    if (location) {
      bot.load({location});
      bot.location.load({isCurrent: true});
    }
    this.bot = bot;
    this.props.newBotStore.setId(this.bot.id);
    const data = await this.props.geocodingStore.reverse(location);
    this.bot.load({addressData: data.meta, address: data.address});
  };

  componentDidMount() {
    // TODO HACK: prevent this from firing *after* creating a new bot and popping
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
