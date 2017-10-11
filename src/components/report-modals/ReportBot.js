// @flow

import React from 'react';
import {observer} from 'mobx-react/native';
import reportStore from '../../store/reportStore';
import Report, {afterReport} from './Report';
import {injectBot} from '../hocs';
import Bot from '../../model/Bot';

type ReportBotProps = {
  botId: string,
  bot: Bot,
};

@observer
class ReportBot extends React.Component {
  props: ReportBotProps;

  static onRight = async ({botId}) => {
    if (reportStore.submitting) return;
    await reportStore.reportBot(botId);
    afterReport();
  };

  render() {
    return (
      <Report subtitle={`${this.props.bot ? this.props.bot.title : ''}`} placeholder={'Please describe why you are reporting this bot (e.g. spam, inappropriate content, etc.)'} />
    );
  }
}

export default injectBot(ReportBot);
