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

@inject('wocky', 'locationStore', 'analytics')
@observer
class BotCreate extends React.Component<{}> {
  trackTimeout: any;
  @observable bot: any;

  static rightButton = () => {
    return (
      <TouchableOpacity onPress={() => BotCreate.save()} style={{marginRight: 20 * k}}>
        <RText size={15} color={colors.PINK}>
          Next
        </RText>
      </TouchableOpacity>
    );
  };

  componentWillMount() {
    this.createBot();
  }

  createBot = async () => {
    this.bot = await this.props.wocky.createBot();
    console.log('newly created bot', this.bot.toJSON());
    const {location} = this.props.locationStore;
    this.bot.update({location, title: 'test'});
    // when(() => this.bot.updated, () => console.log('bot now', this.bot.toJSON()));
    // TODO: changeBotLocation
    // // const data = await geocodingStore.reverse(location);
    // geocodingStore.reverse(location).then((data) => {
    //   botStore.changeBotLocation({...data, location, isCurrent: true});
    // });
  };

  componentDidMount() {
    // HACK: prevent this from firing *after* creating a new bot and popping
    this.trackTimeout = setTimeout(() => this.props.analytics.track('botcreate_start'), 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.trackTimeout);
  }

  static save = (data: Object) => {
    if (data) {
      // botStore.bot.load(data);
      this.bot.update(data);
    }
    this.props.analytics.track('botcreate_chooselocation', toJS(this.bot.toJSON()));
    Actions.botCompose();
  };

  render() {
    return <Screen>{this.bot ? <BotAddress onSave={BotCreate.save} bot={this.bot} /> : null}</Screen>;
  }
}

export default BotCreate;
