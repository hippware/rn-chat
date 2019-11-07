import {types, getParent} from 'mobx-state-tree'
import {reaction} from 'mobx'
import {IStore} from './store'

// navigation store for the app, all navigation-conditional logic should be placed here
const NavStore = types
  .model('NavStore', {
    scene: '',
    isPreviewScene: false,
  })
  .actions(self => ({
    setScene(value: string) {
      self.scene = value
    },
    setIsPreviewScene(value: boolean) {
      self.isPreviewScene = value
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
