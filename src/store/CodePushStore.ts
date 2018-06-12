import {types, flow, getParent} from 'mobx-state-tree'
import {settings} from '../globals'
import * as log from '../utils/log'
import codePush, {RemotePackage} from 'react-native-code-push'
import {IWocky} from 'wocky-client'

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
  })
  .volatile(() => ({
    syncing: false,
    refreshing: false,
    isFirstRun: types.maybe(types.boolean),
  }))
  .views(self => ({
    get flavor(): string {
      return __DEV__ ? 'local' : settings.isStaging ? 'staging' : 'production'
      // return 'staging'
    },
  }))
  .views(self => ({
    get channels(): Channel[] {
      return deployments[self.flavor]
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
          setTimeout(() => {
            self.syncing = false
            codePush.allowRestart()
          }, 500)
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
      // console.log(
      //   'CODEPUSH progress:',
      //   `${progress.receivedBytes} of ${progress.totalBytes} received.`
      // )
      self.syncStatus.push(`${progress.receivedBytes} of ${progress.totalBytes} received.`)
    },

    addChannelUpdate(channel, update) {
      self.channelUpdates.push({
        ...channel,
        updateDescription: update.description,
      })
    },
  }))
  .actions(self => ({
    checkLoadedBundle: flow(function*() {
      self.metadata = yield codePush.getUpdateMetadata(codePush.UpdateState.RUNNING)
      if (self.metadata && self.metadata.isFirstRun) {
        const {wocky} = getParent(self)
        // TODO: prevent initial hydration instead of clearing the cache after this check?
        ;(wocky as IWocky).clearCache()
      }
    }),

    // If there are any new Codepush bundles on "Staging" (or "Production" in the case of the prod app) then apply the update immediately (i.e. without user selection)
    syncImmediate: flow(function*() {
      try {
        const deployKey = self.channels[0].key
        const update: RemotePackage = yield codePush.checkForUpdate(deployKey)
        if (update) {
          const {isMandatory} = update
          const syncOptions = {
            installMode: isMandatory
              ? codePush.InstallMode.IMMEDIATE
              : codePush.InstallMode.ON_NEXT_RESTART,
            deploymentKey: deployKey,
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
      // self._channel = channel
      codePush.sync(syncOptions, self.onSyncStatusChanged)
    },
  }))
  .actions(self => ({
    afterAttach() {
      self.syncStatus.clear()
      self.metadata = null
      codePush.notifyAppReady()
      self.syncImmediate()
      self.checkLoadedBundle()
    },
  }))

export default CodePushStore

export type ICodePushStore = typeof CodePushStore.Type
