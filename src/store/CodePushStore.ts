import {types, flow} from 'mobx-state-tree'
import {settings} from '../globals'
import {log} from '../utils/logger'
import codePush, {RemotePackage, LocalPackage} from 'react-native-code-push'
import {Platform} from 'react-native'

const deployments = require('../constants/codepush-deployments.json')

type Channel = {
  name: string
  keyIOS: string
  keyAndroid: string
}

const keyProp = Platform.select({android: 'keyAndroid', ios: 'keyIOS'})

const CodePushStore = types
  .model('CodePushStore', {
    metadata: types.optional(types.frozen(), null),
    syncStatus: types.optional(types.array(types.string), []),
    channelUpdates: types.optional(types.array(types.frozen()), []),
    pendingUpdate: false,
  })
  .volatile(() => ({
    syncing: false,
    refreshing: false,
    downloadProgress: 0,
  }))
  .views(self => ({
    get channels(): Channel[] {
      return deployments[settings.codePushFlavor]
    },
  }))
  .views(self => ({
    get updateInfo(): string {
      if (self.metadata) {
        const {deploymentKey, label} = self.metadata

        if (settings.codePushFlavor !== 'production') {
          const deploymentInfo = self.channels.filter(
            deployment => deployment[keyProp] === deploymentKey
          )
          const deploymentName = deploymentInfo.length > 0 ? deploymentInfo[0].name : deploymentKey

          return `${deploymentName}-${label}`
        } else {
          return label
        }
      } else {
        return ''
      }
    },
  }))
  .actions(self => ({
    allowRestart() {
      self.syncing = false
      codePush.allowRestart()
    },

    clearUpdates() {
      codePush.clearUpdates()
      codePush.restartApp()
    },
  }))
  .actions(self => ({
    onSyncStatusChanged(status: codePush.SyncStatus): void {
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
          self.syncStatus.push('Awaiting user action')
          break
        case SYNC_IN_PROGRESS:
          self.syncStatus.push('Sync in progress.')
          break
        case CHECKING_FOR_UPDATE:
          self.syncStatus.push('Checking for updates.')
          break
        case DOWNLOADING_PACKAGE:
          self.syncStatus.push('Downloading package.')
          break
        case INSTALLING_UPDATE:
          self.syncStatus.push('Installing update.')
          break
        case UP_TO_DATE:
          self.syncStatus.push('Up-to-date.')
          self.syncing = false
          break
        case UPDATE_INSTALLED:
          codePush.disallowRestart()
          self.syncStatus.push('Update installed.')
          // leave time for LocalStorage serialization
          setTimeout(self.allowRestart, 500)
          break
        case UPDATE_IGNORED:
          self.syncStatus.push('Update ignored.')
          self.syncing = false
          break
        case UNKNOWN_ERROR:
          self.syncing = false
          self.syncStatus.push('unknown sync error')
          break
        default:
          self.syncStatus.push(`unhandled status: ${status}`)
      }
    },

    onDownloadDidProgress(progress) {
      const {receivedBytes, totalBytes} = progress
      self.downloadProgress = receivedBytes / totalBytes
    },

    addChannelUpdate(channel, update) {
      self.channelUpdates.push({
        ...channel,
        updateDescription: update.description,
      })
    },
  }))
  .actions(self => ({
    checkCurrentStatus: flow(function*() {
      try {
        const autoDeployKey = self.channels[0][keyProp]
        const isLocal = self.channels[0].name === 'Local'
        self.metadata = yield codePush.getUpdateMetadata(codePush.UpdateState.RUNNING)
        // check for update that exists but hasn't been downloaded yet (but will be downloaded automatically in the background)
        let metadataPending: RemotePackage | null = null
        if (!isLocal) {
          metadataPending = yield codePush.checkForUpdate(autoDeployKey)
        }
        // check for update that has been downloaded but not installed yet (will be installed on next app start)
        const metadataDownloaded: LocalPackage = yield codePush.getUpdateMetadata(
          codePush.UpdateState.PENDING
        )

        if (metadataPending || metadataDownloaded) {
          // signal that we need to start with a clean cache on next app load
          self.pendingUpdate = true
        }

        // If there are any new Codepush bundles on this deployment then download the update (i.e. without user interaction).
        // If `isMandatory` apply the update as soon as it is ready (hard reload the app)
        if (metadataPending) {
          const {isMandatory} = metadataPending
          const syncOptions = {
            installMode: isMandatory
              ? codePush.InstallMode.IMMEDIATE
              : codePush.InstallMode.ON_NEXT_RESTART,
            deploymentKey: autoDeployKey,
          }
          codePush.sync(syncOptions, self.onSyncStatusChanged, self.onDownloadDidProgress)
        }
      } catch (err) {
        log('Codepush syncImmediate error', err)
        // mixpanel call?
      }
    }),

    getFreshData: flow(function*() {
      self.channelUpdates.clear()
      self.refreshing = true
      self.metadata = yield codePush.getUpdateMetadata(codePush.UpdateState.RUNNING)

      yield Promise.all(
        self.channels
          .map(channel => {
            return codePush.checkForUpdate(channel[keyProp]).then(update => {
              if (update) {
                self.addChannelUpdate(channel, update)
              }
            })
          })
          .entries()
      )
      self.refreshing = false
    }),

    sync(channel: any) {
      const syncOptions = {
        updateDialog: {
          appendReleaseDescription: true,
        },
        installMode: codePush.InstallMode.IMMEDIATE,
        deploymentKey: channel[keyProp],
      }
      self.syncing = true
      self.syncStatus.clear()
      self.pendingUpdate = true
      codePush.sync(syncOptions, self.onSyncStatusChanged, self.onDownloadDidProgress)
    },
  }))
  .actions(self => ({
    afterAttach() {
      self.syncStatus.clear()
      self.channelUpdates.clear()
      codePush.notifyAppReady()
      self.checkCurrentStatus()
    },
  }))

export default CodePushStore

export type ICodePushStore = typeof CodePushStore.Type
