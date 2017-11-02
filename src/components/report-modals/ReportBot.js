// @flow

import React from 'react';
import {observer} from 'mobx-react/native';
import reportStore from '../../store/reportStore';
import {observable} from 'mobx';
import Profile from '../../model/Profile';
import botFactory from '../../factory/botFactory';
import Report, {afterReport} from './Report';

type ReportBotProps = {
  botId: string,
};

@observer
export default class ReportBot extends React.Component {
  props: ReportBotProps;

  static onRight = async ({botId}) => {
    if (reportStore.submitting) return;
    await reportStore.reportBot(botId);
    afterReport();
  };

  @observable bot: ?Profile;

  async componentDidMount() {
    this.bot = await botFactory.createAsync({id: this.props.botId});
  }

  render() {
    return <Report subtitle={`${this.bot ? this.bot.title : ''}`} placeholder={'Please describe why you are reporting this bot (e.g. spam, inappropriate content, etc.)'} />;
  }
}
