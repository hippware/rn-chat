// tslint:disable-next-line:no_unused-variable
import {types, ISnapshottable, IExtendedObservableMap, flow, getEnv, getParent, getType, isAlive, IModelType, getSnapshot} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {Profile} from '../model/Profile'
import {File} from '../model/File'
import {Bot} from '../model/Bot'

export function createFactory<T>(type: IModelType<any, T>) {
  return types
    .model({
      storage: types.optional(types.map(type), {})
    })
    .named('Factory' + type.name)
    .actions(self => ({
      clear: () => {
        self.storage.clear()
      },
      delete: (id: string) => {
        self.storage.delete(id)
      },
      get: (id: string, data?: {[key: string]: any}): T => {
        if (!self.storage.get(id)) {
          const entity = getParent(self).create(type, {id, ...data})
          self.storage.put(entity)
        } else {
          const entity: any = self.storage.get(id)!
          if (entity.load && data && Object.keys(data).length) {
            getParent(self)._registerReferences(type, data)
            entity.load(data)
          }
        }
        return new Proxy(self.storage.get(id), {
          get: (target: any, name: string) => {
            if (isAlive(target)) {
              return target[name]
            } else {
              return getSnapshot(target)[name]
            }
          }
        })
      }
    }))
}

export const Storages = types
  .model({
    files: types.optional(createFactory(File), {}),
    bots: types.optional(createFactory(Bot), {}),
    profiles: types.optional(createFactory(Profile), {})
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
          const props = type['properties']
          Object.keys(props).forEach((key: string) => {
            if (data[key] !== undefined) {
              if (props[key].types && props[key].types[0].targetType) {
                const field = map[props[key].types[0].targetType.name]
                if (field && self[field] && data[key]) {
                  let value = data[key]
                  if (typeof value === 'object') {
                    value = value.id
                  }
                  self[field].get(value)
                }
              }
            }
          })
        }
      },
      views: {
        get map() {
          return map
        }
      }
    }
  })
  .actions(self => ({
    create: <T>(type: IModelType<any, T>, data: {[key: string]: any}) => {
      self._registerReferences(type, data)
      return type.create(data, getEnv(self))
    }
  }))
