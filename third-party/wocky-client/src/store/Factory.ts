import {types, getEnv, getParent, getType, IType} from 'mobx-state-tree'
import {Profile} from '../model/Profile'
import {File} from '../model/File'
import {Bot, IBot} from '../model/Bot'
import _ from 'lodash'

export type __IBot = IBot

// TODO set generics instead of any here?
export function createFactory(type: IType<any, any, any>) {
  return types
    .model({
      storage: types.optional(types.map(type), {}),
    })
    .named(`Factory${type.name}`)
    .views(self => ({
      get snapshot() {
        const storage: any = {}
        Array.from(self.storage.keys()).forEach((key: string) => {
          if (self.storage.get(key)!) {
            storage[key] = self.storage.get(key)!.snapshot
          }
        })
        return {storage}
      },
    }))
    .actions(self => ({
      clear: () => {
        self.storage.clear()
      },
      delete: (id: string) => {
        self.storage.delete(id)
      },
      get: (id: string, data?: {[key: string]: any}) => {
        // ensure that nothing inside data is observable (othwerise throws MST exception)
        data = _.cloneDeep(data)

        try {
          if (!self.storage.get(id)) {
            const entity = (getParent(self) as IStorages).create(type, {
              id,
              ...data,
              loaded: data && !!Object.keys(data).length,
            })
            self.storage.put(entity)
          } else {
            const entity: any = self.storage.get(id)!
            if (entity.load && data && Object.keys(data).length) {
              entity.load((getParent(self) as IStorages)._registerReferences(type, data))
            }
          }
          return self.storage.get(id)!
        } catch (e) {
          getEnv(self).logger.warn('Factory.ts get: Invalid data', e)
          return null
        }
      },
    }))
}

export const Storages = types
  .model({
    files: types.optional(createFactory(File), {}),
    bots: types.optional(createFactory(Bot), {}),
    profiles: types.optional(createFactory(Profile), {}),
  })
  .extend((self: any) => {
    const map: any = {}
    return {
      actions: {
        afterCreate: () => {
          map['File'] = 'files'
          map['Profile'] = 'profiles'
          map['Bot'] = 'bots'
        },
        _registerReferences: (type: any, data: {[key: string]: any}) => {
          let props = type['properties']
          if (!props) {
            // union type doesn't have properties so let's determine concrete type
            props = (getType(type.create(data)) as any)['properties']
          }
          const res: any = {}
          if (!props) {
            throw new Error('No properties for type:' + type.name)
          }
          if (!data) {
            return
          }
          Object.keys(props).forEach((key: string) => {
            if (data[key] !== undefined) {
              const targetType =
                props[key].targetType ||
                (props[key].types && props[key].types.length && props[key].types[0].targetType)
              if (targetType) {
                const field = map[targetType.name]
                // found reference storage
                if (field && self[field] && data[key]) {
                  let value = data[key]
                  if (typeof value === 'object') {
                    // we have object instead of reference, let's create it!
                    try {
                      self[field].get(value.id, value)
                      value = value.id
                    } catch (e) {
                      getEnv(self).logger.warn('Factory.ts _registerReferences1: Invalid data', e)
                    }
                  }
                  res[key] = self[field].get(value)
                } else if (data[key] && typeof data[key] === 'object') {
                  try {
                    res[key] = self.create(targetType, data[key])
                  } catch (e) {
                    getEnv(self).logger.warn('Factory.ts _registerReferences2: Invalid data', e)
                  }
                }
              } else {
                res[key] = data[key]
              }
            }
          })
          return res
        },
      },
      views: {
        get map() {
          return map
        },
      },
    }
  })
  .actions(self => ({
    create: <T>(type: IType<any, any, T>, param: {[key: string]: any}) => {
      const data = {...param}
      // some workaround to create references on the fly (maybe recent MST can do it automatically?)
      if (param.user && typeof param.user === 'object') {
        // create reference to profile!
        self.profiles.get(param.user.id, param.user)
        data.user = param.user.id
      }
      if (param.profile && typeof param.profile === 'object') {
        // create reference to profile!
        self.profiles.get(param.profile.id, param.profile)
        data.profile = param.profile.id
      }
      if (param.bot && typeof param.bot === 'object') {
        // create reference to bot!
        self.bots.get(param.bot.id, param.bot)
        data.bot = param.bot.id
      }

      // TODO: add processing for `sender` and `owner` (for notifications) or figure out a better way of doing this
      return type.create(self._registerReferences(type, data), getEnv(self))
    },
    load: (instance: any, data: {[key: string]: any}) => {
      instance.load(self._registerReferences(getType(instance), data))
    },
  }))

export type IStorages = typeof Storages.Type
