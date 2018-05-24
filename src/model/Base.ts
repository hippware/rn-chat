// tslint:disable-next-line:no_unused-variable
import {types, getEnv, getType, getParent, IModelType, hasParent} from 'mobx-state-tree'

export const SERVICE_NAME = 'WockyClient'
export type __IModelType = IModelType<any, any>

// Base class for entities that want access to parent wocky service
export const Base = types
  .model('Base', {id: types.identifier(types.string)})
  .named('Base')
  .views(self => ({
    get service() {
      let target = self
      const {wocky} = getEnv(self)
      if (wocky) {
        return wocky
      }
      while (getParent(target) && getType(getParent(target)).name !== SERVICE_NAME) {
        target = getParent(target)
        if (!hasParent(target)) {
          return null
        }
      }
      return getType(getParent(target)).name === SERVICE_NAME ? getParent(target) : null
    },
  }))

export type IBaseType = typeof Base.Type
export interface IBase extends IBaseType {}
