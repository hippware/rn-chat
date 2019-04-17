import {types, getType, flow, getSnapshot, applySnapshot, getEnv, Instance} from 'mobx-state-tree'
import {reaction} from 'mobx'
import codePush from 'react-native-code-push'
import {Wocky, IWocky} from 'wocky-client'
import {settings} from '../globals'
import DeviceInfo from 'react-native-device-info'

export const cleanState = {
  firebaseStore: {},
  authStore: {},
  locationStore: {},
  searchStore: {},
  profileValidationStore: {},
  homeStore: {},
  navStore: {},
  onceStore: {},
  codePushStore: {},
}

export const STORE_NAME = 'MainStore'

const PersistableModel = types
  .model({id: 'Persistable', wocky: Wocky})
  .volatile(() => ({
    reloading: false,
    hydrated: false,
  }))
  .actions(self => {
    const {logger, storage, analytics} = getEnv(self)

    function loadFromStorage(key: string): Promise<string> {
      return new Promise((resolve, reject) => {
        storage.getItem(key, (error: any, data: string) => {
          if (error) reject(error)
          else resolve(data)
        })
      })
    }

    function loadMinimal(parsed: any) {
      logger.log('loadMinimal', parsed)
      try {
        // todo: try rehydrating onceStore to prevent going through onboarding after a cache reset?
        applySnapshot((self as any).authStore, parsed.authStore)
      } catch (err) {
        logger.warn('Minimal hydration error', err)
        analytics.track('loadMinimal_fail', parsed)
        throw err
      }
    }

    async function load() {
      const modelName = getType(self).name
      let parsed
      try {
        const data = await loadFromStorage(modelName)
        parsed = JSON.parse(data)
        // throw new Error('Hydrate minimally')
        const pendingCodepush = parsed && parsed.codePushStore && parsed.codePushStore.pendingUpdate
        const oldBinaryVersion =
          (parsed && parsed.version) || (parsed && parsed.appInfo && parsed.appInfo.nativeVersion)
        const isNewBinaryVersion = oldBinaryVersion && oldBinaryVersion !== DeviceInfo.getVersion()
        if (pendingCodepush || isNewBinaryVersion) {
          parsed.codePushStore.pendingUpdate = false
          loadMinimal(parsed)
        } else {
          applySnapshot(self, parsed)
        }
      } catch (err) {
        logger.log('hydration error', modelName, err, parsed)
        if (modelName === STORE_NAME && parsed && parsed.authStore) {
          loadMinimal(parsed)
        }
      }
    }

    let disposePersistenceReaction

    function startPersistenceReaction() {
      disposePersistenceReaction = reaction(
        () => getSnapshot(self),
        state => {
          // console.log('persist state:', JSON.stringify(json));
          if (!self.reloading) {
            storage.setItem(getType(self).name, JSON.stringify(state))
          }
        },
        {fireImmediately: false, delay: 1000}
      )
    }

    return {
      hydrate: flow(function* hydrate() {
        if (storage) {
          yield load()
          self.hydrated = true
          startPersistenceReaction()
          return true
        }
        return false
      }),
      resetCache: flow(function*() {
        if (self.reloading) return
        self.reloading = true
        // prevent state persistence while we're clearing resetting
        if (disposePersistenceReaction) {
          disposePersistenceReaction()
          disposePersistenceReaction = undefined
        }
        // calling self.wocky here causes ts problems so the following is necessary
        const wocky: IWocky = self.wocky
        // shut down wocky
        wocky.clearCache()
        wocky.disposeReactions()
        // wipe out old state and apply clean
        applySnapshot(self as any, {
          ...cleanState,
          wocky: {host: settings.host},
        })
        wocky.startReactions()
        // load minimal state to re-login
        const data = yield loadFromStorage(STORE_NAME)
        const parsed = JSON.parse(data)
        loadMinimal(parsed)

        // Persist state and restart
        storage.setItem(getType(self).name, JSON.stringify(getSnapshot(self)))
        codePush.restartApp()
      }),
    }
  })

export default PersistableModel

export interface IPersistable extends Instance<typeof PersistableModel> {}
