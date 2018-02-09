// @flow

import React from 'react';
import {Actions} from 'react-native-router-flux';
import Screen from '../Screen';
import BotAddress from './BotAddress';
import {observer, inject} from 'mobx-react/native';

@inject('wocky')
@observer
class BotAddressScene extends React.Component<{botId: string}> {
  bot: ?Bot;

  componentWillMount() {
    this.bot = this.props.wocky.getBot({id: this.props.botId});
  }

  render() {
    return (
      <Screen>
        <BotAddress edit onSave={Actions.pop} bot={this.bot} />
      </Screen>
    );
  }
}

export default BotAddressScene;
