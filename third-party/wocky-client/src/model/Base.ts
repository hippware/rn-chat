import {types, getEnv, getType, getParent, hasParent} from 'mobx-state-tree'

export const SERVICE_NAME = 'WockyClient'

// Base class for entities that want access to parent wocky service
export const Base = types
  .model({})
  .named('Base')
  .views(self => ({
    get service() {
      let target: any = self
      const {wocky} = getEnv(self)
      if (wocky) {
        return wocky
      }
      if (!hasParent(target)) {
        return null
      }
      // can we use `getRoot` here instead? https://github.com/mobxjs/mobx-state-tree/blob/master/API.md#getroot
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
export interface IBaseData {
  id: string
}
