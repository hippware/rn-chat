import {types, getParent} from 'mobx-state-tree'
import {reaction} from 'mobx'
import {IStore} from './store'

// navigation store for the app, all navigation-conditional logic should be placed here
const NavStore = types
  .model('NavStore', {})
  .volatile(() => ({
    _props: types.frozen({}),
    scene: '',
  }))
  .views(self => ({
    // to solve typescript typing errors
    get params(): {[id: string]: any} {
      return self._props
    },
  }))
  .actions(self => ({
    setScene(value: string, props: any) {
      self.scene = value
      self._props = props
    },
    afterAttach() {
      reaction(
        () => self.scene === 'home',
        () => getParent<IStore>(self).homeStore.disableFullScreen()
      )
    },
  }))
  .postProcessSnapshot((snapshot: any) => {
    // No need to persist this store
    return {}
  })

export default NavStore
type NavStoreType = typeof NavStore.Type
export interface INavStore extends NavStoreType {}
