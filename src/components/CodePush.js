// @flow

import {Component, Element} from 'react';
import codePush from 'react-native-code-push';
import * as log from '../utils/log';

type Props = {
  actions: Object,
  children: Element<any>,
};

class CodePushComponent extends Component {
  props: Props;

  componentDidMount() {
    this.getCodePushStatus();
  }

  getCodePushStatus = async () => {
    const metadata = await codePush.getUpdateMetadata(codePush.UpdateState.RUNNING);
    metadata && this.props.actions.setCodePushMetadata(metadata);
  };

  codePushStatusDidChange(status) {
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        log.log('CODEPUSH: Checking for updates.', {level: log.levels.INFO});
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        log.log('CODEPUSH: Downloading package.', {level: log.levels.INFO});
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        log.log('CODEPUSH: Installing update.', {level: log.levels.INFO});
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        log.log('CODEPUSH: Up-to-date.', {level: log.levels.INFO});
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        log.log('CODEPUSH: Update installed.', {level: log.levels.INFO});
        break;
      default:
        log.log(`CODEPUSH Error: ${status}`, {level: log.levels.ERROR});
    }
  }

  render = () => this.props.children;
}

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
};

export default codePush(codePushOptions)(CodePushComponent);
