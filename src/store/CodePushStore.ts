import {types, flow} from 'mobx-state-tree'
import {settings} from '../globals'
import * as log from '../utils/log'
import codePush, {RemotePackage, LocalPackage} from 'react-native-code-push'

const deployments = require('../constants/codepush-deployments.json')

type Channel = {
  name: string
  key: string
  displayName: string
  description: string
}

const CodePushStore = types
  .model('CodePushStore', {
    metadata: types.optional(types.frozen, null),
    syncStatus: types.optional(types.array(types.string), []),
    channelUpdates: types.optional(types.array(types.frozen), []),
    pendingUpdate: false,
  })
  .volatile(() => ({
    syncing: false,
    refreshing: false,
    downloadProgress: 0,
  }))
  .views(self => ({
    get flavor(): string {
      return __DEV__ ? 'local' : settings.isStaging ? 'staging' : 'production'
    },
  }))
  .views(self => ({
    get channels(): Channel[] {
      return deployments[self.flavor]
    },
  }))
  .actions(self => ({
    allowRestart() {
      self.syncing = false
      codePush.allowRestart()
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
        const autoDeployKey = self.channels[0].key
        self.metadata = yield codePush.getUpdateMetadata(codePush.UpdateState.RUNNING)
        // check for update that exists but hasn't been downloaded yet (but will be downloaded automatically in the background)
        const metadataPending: RemotePackage = yield codePush.checkForUpdate(autoDeployKey)
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
        log.log('Codepush syncImmediate error', err)
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
            return codePush.checkForUpdate(channel.key).then(update => {
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
        deploymentKey: channel.key,
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
      self.metadata = null
      self.channelUpdates.clear()
      codePush.notifyAppReady()
      self.checkCurrentStatus()
    },
  }))

export default CodePushStore

export type ICodePushStore = typeof CodePushStore.Type
