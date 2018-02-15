// tslint:disable-next-line:no_unused-variable
import {types, getEnv, getType, getParent, IModelType, getSnapshot, isStateTreeNode, hasParent} from 'mobx-state-tree'

export const SERVICE_NAME = 'WockyClient'

// Base class for entities that want access to parent wocky service
export const Base = types
  .model('Base', {id: types.identifier(types.string)})
  .named('Base')
  .views(self => ({
    get pageId() {
      return self.id
    },
    get _snapshot(): any {
      const data: any = getSnapshot(self)
      const res: any = {}
      Object.keys(data).forEach((key: string) => {
        if (typeof data[key] !== 'object') {
          res[key] = data[key]
        } else if ((self as any)[key] && (self as any)[key].snapshot) {
          res[key] = (self as any)[key].snapshot
        } else {
          res[key] = data[key]
        }
      })
      return res
    },
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
    }
  }))
  .views(self => ({
    get snapshot() {
      return self._snapshot
    }
  }))

export type IBase = typeof Base.Type
