import {types, getType, flow, getSnapshot, applySnapshot, getEnv, Instance} from 'mobx-state-tree'
import {reaction} from 'mobx'
import {Wocky, IWocky} from 'wocky-client'
import {settings} from '../globals'

export const cleanState = {
  firebaseStore: {},
  authStore: {},
  locationStore: {},
  searchStore: {},
  profileValidationStore: {},
  homeStore: {},
  navStore: {},
  onceStore: {},
}

export const STORE_NAME = 'MainStore'

const PersistableModel = types
  .model({id: 'Persistable', wocky: Wocky})
  .volatile(() => ({
    reloading: false,
  }))
  .actions(self => {
    const {logger, storage, analytics, appInfo} = getEnv(self)

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

    // try to migrate cached data from 1.x.x to 2.x.x
    async function tryMigrate() {
      let data
      try {
        analytics.track('migration_try')
        const key = 'rnchat:model'
        data = await loadFromStorage(key)
        const {user, password, server} = JSON.parse(data)
        applySnapshot(self.wocky, {...self.wocky, username: user, password, host: server} as any)
        storage.removeItem(key)
        analytics.track('migration_success', getSnapshot(self.wocky))
      } catch (err) {
        // logger.warn('Data migration error:', err)
        if (data) {
          // !data == fresh install
          analytics.track('migration_fail', data)
        }
      }
    }

    async function load() {
      // Nice way to impersonate QA (it is Miranda's account)
      // return loadMinimal({
      //   wocky: {
      //     id: 'wocky',
      //     username: '1a175ee4-55d5-11e6-8fee-0eea5386eb69',
      //     password: '$T$kpVJzlwJgNw3dX85f6+CVU2/gLeaigUGpjLwFvZBDDo=',
      //     resource: 'cli-resource-ac35c6fb',
      //   },
      // });
      const modelName = getType(self).name
      let parsed
      try {
        const data = await loadFromStorage(modelName)
        parsed = JSON.parse(data)
        // throw new Error('Hydrate minimally')
        const pendingCodepush = parsed && parsed.codePushStore && parsed.codePushStore.pendingUpdate
        const newBinaryVersion =
          parsed && parsed.version && parsed.version !== appInfo.nativeVersion
        if (pendingCodepush || newBinaryVersion) {
          parsed.codePushStore.pendingUpdate = false
          loadMinimal(parsed)
        } else {
          applySnapshot(self, parsed)
        }
      } catch (err) {
        logger.log('hydration error', modelName, err, parsed)
        if (modelName === STORE_NAME && parsed && parsed.authStore) {
          loadMinimal(parsed)
        } else {
          await tryMigrate()
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
          wocky: {host: settings.getDomain()},
        })
        wocky.startReactions()
        // load minimal state to re-login
        const data = yield loadFromStorage(STORE_NAME)
        const parsed = JSON.parse(data)
        loadMinimal(parsed)
        // TODO: reload onceStore data here too?
        self.reloading = false
        startPersistenceReaction()
      }),
    }
  })

export default PersistableModel

export interface IPersistable extends Instance<typeof PersistableModel> {}
