import {action, observable, when} from 'mobx'
import deployments from '../constants/codepush-deployments'
import {settings} from '../globals'
import * as log from '../utils/log'
import codePush from 'react-native-code-push'

class CodePushStore {
  @observable metadata?: object
  @observable syncing: boolean = false
  // @observable syncStatus: IObservableArray<string> = []
  readonly syncStatus = observable.array<string>([])
  _channel?: object
  // @observable channelUpdates: ObservableArray<object> = [];
  readonly channelUpdates = observable.array<object>([])
  @observable flavor: 'production' | 'staging' | 'local'
  // @observable channels: IObservableArray<Object> = [];
  readonly channels = observable.array<any>([])
  @observable refreshing: boolean = false

  constructor() {
    if (__DEV__) {
      this.flavor = 'local'
    } else if (settings.isStaging) {
      this.flavor = 'staging'
    } else {
      this.flavor = 'production'
    }
    this.channels = deployments[this.flavor]
    codePush.notifyAppReady()
    this.syncImmediate()
  }

  syncImmediate = async (): Promise<void> => {
    try {
      const deployKey = this.channels[0].key
      const update = await codePush.checkForUpdate(deployKey)
      if (update) {
        const {isMandatory} = update
        const syncOptions = {
          installMode: isMandatory
            ? codePush.InstallMode.IMMEDIATE
            : codePush.InstallMode.ON_NEXT_RESTART,
          deploymentKey: deployKey,
        }
        codePush.sync(syncOptions, this.syncStatusChanged)
      }
    } catch (err) {
      log.log('Codepush syncImmediate error', err)
      // mixpanel call?
    }
  }

  @action
  getFreshData = async () => {
    this.channelUpdates.clear()
    this.refreshing = true
    this.metadata = await codePush.getUpdateMetadata(codePush.UpdateState.RUNNING)

    await Promise.all(
      this.channels
        .map(channel => {
          return codePush.checkForUpdate(channel.key).then(update => {
            if (update) {
              this.channelUpdates.push({
                ...channel,
                updateDescription: update.description,
              })
            }
          })
        })
        .entries()
    )
    this.refreshing = false
  }

  syncStatusChanged = (status: codePush.SyncStatus): void => {
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
    } = codePush.SyncStatus
    switch (status) {
      case AWAITING_USER_ACTION:
        this.addStatus('Awaiting user action')
        break
      case SYNC_IN_PROGRESS:
        this.addStatus('Sync in progress.')
        break
      case CHECKING_FOR_UPDATE:
        this.addStatus('Checking for updates.')
        break
      case DOWNLOADING_PACKAGE:
        this.addStatus('Downloading package.')
        break
      case INSTALLING_UPDATE:
        this.addStatus('Installing update.')
        break
      case UP_TO_DATE:
        this.addStatus('Up-to-date.')
        this.syncing = false
        break
      case UPDATE_INSTALLED:
        codePush.disallowRestart()
        this.addStatus('Update installed.')
        // TODO model.codePushChannel = this._channel.displayName;
        // leave time for LocalStorage serialization
        setTimeout(() => {
          this.syncing = false
          codePush.allowRestart()
        }, 500)
        break
      case UPDATE_IGNORED:
        this.addStatus('Update ignored.')
        this.syncing = false
        break
      case UNKNOWN_ERROR:
        this.syncing = false
        this.addStatus('unknown sync error')
        break
      default:
        this.addStatus(`unhandled status: ${status}`)
    }
  }

  codePushDownloadDidProgress(/*progress*/) {
    // console.log(
    //   'CODEPUSH progress:',
    //   `${progress.receivedBytes} of ${progress.totalBytes} received.`
    // )
  }

  @action
  sync = (channel: any) => {
    const syncOptions = {
      updateDialog: {
        appendReleaseDescription: true,
      },
      installMode: codePush.InstallMode.IMMEDIATE,
      deploymentKey: channel.key,
    }
    this.syncing = true
    this.syncStatus.clear()
    this._channel = channel
    codePush.sync(syncOptions, this.syncStatusChanged)
  }

  @action
  addStatus = (status: any) => {
    this.syncStatus.push(status!)
  }
}

export default new CodePushStore()
