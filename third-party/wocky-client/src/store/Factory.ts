import {types, IType, getEnv} from 'mobx-state-tree'
import {Profile} from '../model/Profile'
import {FileEntity} from '../model/FileEntity'
import {Bot} from '../model/Bot'
import _ from 'lodash'

export function createFactory<T>(type: IType<any, any, T>, name: string = '') {
  return types
    .model({
      storage: types.optional(types.map(type), {}),
    })
    .named(`Factory${name || type.name}`)
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

        if (!self.storage.get(id)) {
          self.storage.put(type.create({id}, getEnv(self)))
        }
        const entity: any = self.storage.get(id)!
        if (entity.load && data && Object.keys(data).length) {
          entity.load(data)
        }

        return self.storage.get(id)!
      },
    }))
}

export const Storages = types.model({
  files: types.optional(createFactory(FileEntity, 'FileEntity'), {}),
  bots: types.optional(createFactory(Bot), {}),
  profiles: types.optional(createFactory(Profile), {}),
})
export type IStorages = typeof Storages.Type
