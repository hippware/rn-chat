// tslint:disable-next-line:no_unused-variable
import {types, getType, getParent, IModelType} from 'mobx-state-tree'

export const SERVICE_NAME = 'WockyClient'

// Base class for entities that want access to parent wocky service
export const Base = types
  .model('Base', {})
  .named('Base')
  .views(self => ({
    get service() {
      let target = self
      while (getParent(target) && getType(getParent(target)).name !== SERVICE_NAME) {
        target = getParent(target)
      }
      return getType(getParent(target)).name === SERVICE_NAME ? getParent(target) : null
    }
  }))
