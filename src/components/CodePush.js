// @flow

import {Component, Element} from 'react';
import codePush from 'react-native-code-push';

type Props = {
  actions: Object,
  children: Element<any>
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
        console.log('CODEPUSH: Checking for updates.');
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log('CODEPUSH: Downloading package.');
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log('CODEPUSH: Installing update.');
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        console.log('CODEPUSH: Up-to-date.');
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log('CODEPUSH: Update installed.');
        break;
      default:
        console.log(`CODEPUSH Error: ${status}`);
    }
  }

  render = () => this.props.children;
}

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
};

export default codePush(codePushOptions)(CodePushComponent);
