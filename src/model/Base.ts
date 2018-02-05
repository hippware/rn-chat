// tslint:disable-next-line:no_unused-variable
import {types, getEnv, getType, getParent, IModelType} from 'mobx-state-tree'

export const SERVICE_NAME = 'WockyClient'

// Base class for entities that want access to parent wocky service
export const Base = types
  .model('Base', {id: types.identifier(types.string)})
  .named('Base')
  .views(self => ({
    get pageId() {
      return self.id
    },
    get service() {
      let target = self
      const {wocky} = getEnv(self)
      if (wocky) {
        return wocky
      }
      while (getParent(target) && getType(getParent(target)).name !== SERVICE_NAME) {
        target = getParent(target)
      }
      return getType(getParent(target)).name === SERVICE_NAME ? getParent(target) : null
    }
  }))

export type IBase = typeof Base.Type
