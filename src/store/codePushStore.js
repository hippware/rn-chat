// @flow

import {action, observable, when} from 'mobx';
import type {IObservableArray} from 'mobx';
import model from '../model/model';
import deployments from '../constants/codepush-deployments';
import {settings} from '../globals';
import * as log from '../utils/log';

const codePush = process.env.NODE_ENV === 'test' ? null : require('react-native-code-push');

class CodePushStore {
  @observable metadata: ?Object = null;
  @observable syncing: boolean = false;
  @observable syncStatus: IObservableArray<string> = [];
  _channel: ?Object = null;
  @observable channelUpdates: IObservableArray<Object> = [];
  @observable flavor: 'production' | 'staging' | 'local';
  @observable channels: IObservableArray<Object> = [];
  @observable refreshing: boolean = false;

  constructor() {
    if (__DEV__) {
      this.flavor = 'local';
    } else if (settings.isStaging) {
      this.flavor = 'staging';
    } else {
      this.flavor = 'production';
    }
    this.channels = deployments[this.flavor];
  }

  @action
  start = () => {
    if (!codePush) return;
    codePush.notifyAppReady();
    this.syncImmediate();
  };

  syncImmediate = async (): Promise<void> => {
    try {
      const deployKey = this.channels[0].key;
      const update = await codePush.checkForUpdate(deployKey);
      if (update) {
        const {isMandatory} = update;
        const syncOptions = {
          installMode: isMandatory ? codePush.InstallMode.IMMEDIATE : codePush.InstallMode.ON_NEXT_RESTART,
          deploymentKey: deployKey,
        };
        codePush.sync(syncOptions, this.syncStatusChanged);
      }
    } catch (err) {
      log.log('Codepush syncImmediate error', err);
      // mixpanel call?
    }
  };

  @action
  getFreshData = async () => {
    this.channelUpdates.replace([]);
    this.refreshing = true;
    this.metadata = await codePush.getUpdateMetadata(codePush.UpdateState.RUNNING);
    for (const channel of this.channels) {
      const update = await codePush.checkForUpdate(channel.key);
      if (update) {
        this.channelUpdates.push({
          ...channel,
          updateDescription: update.description,
        });
      }
    }
    this.refreshing = false;
  };

  syncStatusChanged = (status: string) => {
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
        model.codePushChannel = this._channel.displayName;
        // leave time for LocalStorage serialization
        setTimeout(() => {
          this.syncing = false;
          codePush.allowRestart();
        }, 500);
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

  codePushDownloadDidProgress(progress) {
    console.log('CODEPUSH progress:', `${progress.receivedBytes} of ${progress.totalBytes} received.`);
  }

  @action
  sync = (channel: Object) => {
    const syncOptions = {
      updateDialog: {
        appendReleaseDescription: true,
      },
      installMode: codePush.InstallMode.IMMEDIATE,
      deploymentKey: channel.key,
    };
    this.syncing = true;
    this.syncStatus = [];
    this._channel = channel;
    codePush.sync(syncOptions, this.syncStatusChanged);
  };

  @action
  addStatus = (status: string) => {
    this.syncStatus.push(status);
  };
}

export default new CodePushStore();
