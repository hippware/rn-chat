import {types, getEnv, getType, getParent, hasParent} from 'mobx-state-tree'
import {Transport} from '../transport/Transport'

export const SERVICE_NAME = 'WockyClient'

// Base class for entities that want access to parent wocky service and transport layer
export const Base = types
  .model({})
  .named('Base')
  .views(self => {
    const transport: Transport = getEnv(self).transport
    return {
      get transport(): Transport {
        return getEnv(self).transport
      },
      get connected() {
        return transport.connected
      },
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
    }
  })

export type IBaseType = typeof Base.Type
export interface IBase extends IBaseType {}
export interface IBaseData {
  id: string
}
