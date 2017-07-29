import autobind from 'autobind-decorator';
import {action, observable, when} from 'mobx';
import model from '../model/model';
import storage from './storage';

const codePush = process.env.NODE_ENV === 'test' ? null : require('react-native-code-push');

@autobind
class CodePushStore {
  @observable metadata = null;
  @observable syncing = false;
  @observable syncStatus = [];
  channel = null;

  @action
  async start() {
    if (codePush) {
      codePush.notifyAppReady();
      this.metadata = await codePush.getUpdateMetadata(codePush.UpdateState.RUNNING);
    }
  }

  syncStatusChanged = (status) => {
    const {
      AWAITING_USER_ACTION,
      CHECKING_FOR_UPDATE,
      DOWNLOADING_PACKAGE,
      INSTALLING_UPDATE,
      SYNC_IN_PROGRESS,
      UP_TO_DATE,
      UPDATE_INSTALLED,
      UPDATE_IGNORED,
      UNKNOWN_ERROR,
    } = codePush.SyncStatus;
    switch (status) {
      case AWAITING_USER_ACTION:
        this.addStatus('Awaiting user action');
        break;
      case SYNC_IN_PROGRESS:
        this.addStatus('Sync in progress.');
        break;
      case CHECKING_FOR_UPDATE:
        this.addStatus('Checking for updates.');
        break;
      case DOWNLOADING_PACKAGE:
        this.addStatus('Downloading package.');
        break;
      case INSTALLING_UPDATE:
        this.addStatus('Installing update.');
        break;
      case UP_TO_DATE:
        this.addStatus('Up-to-date.');
        this.syncing = false;
        break;
      case UPDATE_INSTALLED:
        codePush.disallowRestart();
        this.addStatus('Update installed.');
        storage.awaiting = true;
        model.codePushChannel = this.channel.displayName;
        when(
          () => !storage.awaiting,
          () => {
            this.syncing = false;
            codePush.allowRestart();
          },
        );
        break;
      case UPDATE_IGNORED:
        this.addStatus('Update ignored.');
        this.syncing = false;
        break;
      case UNKNOWN_ERROR:
        this.syncing = false;
        this.addStatus('unknown sync error');
        break;
      default:
        this.addStatus(`unhandled status: ${status}`);
    }
  };

  @action
  sync(channel: Object) {
    const syncOptions = {
      updateDialog: {
        appendReleaseDescription: true,
      },
      installMode: codePush.InstallMode.IMMEDIATE,
      deploymentKey: channel.key,
    };
    this.syncing = true;
    this.syncStatus = [];
    this.channel = channel;
    codePush.sync(syncOptions, this.syncStatusChanged);
  }

  @action
  addStatus(status: string) {
    this.syncStatus.push(status);
  }
}

export default new CodePushStore();
