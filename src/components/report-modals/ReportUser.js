// @flow

import React, {Component} from 'react';
import {Alert} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';
import {Actions} from 'react-native-router-flux';
import Profile from '../../model/Profile';
import profileStore from '../../store/profileStore';
import reportStore from '../../store/reportStore';
import Report from './Report';

type Props = {
  userId: string,
};

@observer
export default class ReportUser extends Component {
  static onRight = async ({userId}: Props) => {
    if (!reportStore.text) return;
    const submitted = await reportStore.reportUser(userId);
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
