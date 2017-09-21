// @flow

import React from 'react';
import {Alert} from 'react-native';
import {observer} from 'mobx-react/native';
import reportStore from '../../store/reportStore';
import profileStore from '../../store/profileStore';
import {observable} from 'mobx';
import {Actions} from 'react-native-router-flux';
import Profile from '../../model/Profile';
import Report, {afterReport} from './Report';

@observer
export default class ReportUser extends React.Component {
  static onRight = async ({userId}) => {
    if (reportStore.submitting) return;
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
