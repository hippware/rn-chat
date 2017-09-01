// @flow

import React from 'react';
import {Alert} from 'react-native';
import {observer} from 'mobx-react/native';
import reportStore from '../../store/reportStore';
import profileStore from '../../store/profileStore';
import {observable} from 'mobx';
import {Actions} from 'react-native-router-flux';
import Profile from '../../model/Profile';
import botFactory from '../../factory/botFactory';
import Report from './Report';

type ReportBotProps = {
  botId: string,
};

@observer
class ReportBot extends React.Component {
  props: ReportBotProps;

  static onRight = async ({botId}) => {
    if (!reportStore.text || reportStore.submitting) return;
    await reportStore.reportBot(botId);
    afterReport();
  };

  @observable bot: ?Profile;

  async componentDidMount() {
    this.bot = await botFactory.createAsync({id: this.props.botId});
    // botStore.load(this.bot);
  }

  render() {
    return <Report subtitle={`${this.bot ? this.bot.title : ''}`} placeholder={'Please describe why you are reporting this bot (e.g. spam, inappropriate content, etc.)'} />;
  }
}

@observer
class ReportUser extends React.Component {
  static onRight = async ({userId}) => {
    if (!reportStore.text || reportStore.submitting) return;
    await reportStore.reportUser(userId);
    afterReport();
  };

  @observable profile: ?Profile;

  async componentDidMount() {
    this.profile = await profileStore.createAsync(this.props.userId);
  }

  render() {
    return (
      <Report subtitle={this.profile ? `@${this.profile.handle}` : ''} placeholder={'Please describe why you are reporting this user (e.g. spam, inappropriate content, etc.)'} />
    );
  }
}

const afterReport = () =>
  Alert.alert('Thank You', 'We have received your report.', [
    {
      text: 'OK',
      onPress: () => {
        Actions.pop();
        reportStore.text = '';
      },
    },
  ]);

export {ReportUser, ReportBot};
