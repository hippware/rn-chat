import {types, getEnv, getParent, getType, IType} from 'mobx-state-tree'
import {Profile} from '../model/Profile'
import {File} from '../model/File'
import {Bot, IBot} from '../model/Bot'

export type __IBot = IBot

export function createFactory(type: IType<any, any>) {
  return types
    .model({
      storage: types.optional(types.map(type), {}),
    })
    .named(`Factory${type.name}`)
    .views(self => ({
      get snapshot() {
        const storage: any = {}
        self.storage.keys().forEach((key: string) => {
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
        if (!self.storage.get(id)) {
          const entity = getParent(self).create(type, {
            id,
            ...data,
            loaded: data && !!Object.keys(data).length,
          })
          self.storage.put(entity)
        } else {
          const entity: any = self.storage.get(id)!
          if (entity.load && data && Object.keys(data).length) {
            entity.load(getParent(self)._registerReferences(type, data))
          }
        }
        return self.storage.get(id)!
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
                    self[field].get(value.id, value)
                    value = value.id
                  }
                  res[key] = self[field].get(value)
                } else if (data[key] && typeof data[key] === 'object') {
                  res[key] = self.create(targetType, data[key])
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
    create: <T>(type: IType<any, T>, data: {[key: string]: any}) => {
      return type.create(self._registerReferences(type, data), getEnv(self))
    },
    load: (instance: any, data: {[key: string]: any}) => {
      instance.load(self._registerReferences(getType(instance), data))
    },
  }))
