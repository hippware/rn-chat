import React from 'react';
import location from '../store/locationStore';
import statem from '../../gen/state';
import Screen from './Screen';
import bot from '../store/botStore';
import {LOCATION} from '../model/Bot';
import BotAddress from './BotAddress';
import autobind from 'autobind-decorator';
import {observer} from 'mobx-react/native';

@autobind
@observer
export default class extends React.Component {
  componentWillMount() {
    bot.create({type: LOCATION});
  }

  save(data) {
    if (data) {
      bot.bot.load(data);
    }
    statem.createBot.save();
  }

  render() {
    return (
      <Screen isDay={location.isDay}>
        <BotAddress onSave={this.save} />
      </Screen>
    );
  }
}
