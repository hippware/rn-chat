// @flow

import React, {Component} from 'react';
import {Alert} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';
import {Actions} from 'react-native-router-flux';
import Profile from '../../model/Profile';
import reportStore from '../../store/reportStore';
import Report from './Report';
import botFactory from '../../factory/botFactory';

type Props = {
  botId: string,
};

@observer
export default class ReportBot extends Component {
  static onRight = async ({botId}: Props) => {
    if (!reportStore.text) return;
    const submitted = await reportStore.reportUser(botId);
    Alert.alert('Thank You', 'We have received your report.', [
      {
        text: 'OK',
        onPress: () => {
          reportStore.text = '';
          Actions.pop();
        },
      },
    ]);
  };

  static rightButtonImage = require('../../../images/sendActive.png');

  static onLeft = Actions.pop;

  static leftButtonImage = require('../../../images/iconClose.png');

  props: Props;

  @observable bot: ?Profile;

  async componentDidMount() {
    this.bot = await botFactory.createAsync({id: this.props.botId});
    // botStore.load(this.bot);
  }

  render() {
    return <Report subtitle={`${this.bot ? this.bot.title : ''}`} placeholder={'Please describe why you are reporting this bot (e.g. spam, inappropriate content, etc.)'} />;
  }
}
