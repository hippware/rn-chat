import {types, getParent} from 'mobx-state-tree'
import {reaction} from 'mobx'

// navigation store for the app, all navigation-conditional logic should be placed here
const NavStore = types
  .model('NavStore', {
    scene: '',
  })
  .actions(self => ({
    setScene(value: string) {
      self.scene = value
    },
    afterAttach() {
      // put all navigational logic here
      // set creation mode depending from current screen(s)
      // TODO add editBot here ?
      reaction(
        () => ['createBot', 'botCompose', 'botEdit', 'editNote'].includes(self.scene),
        (getParent(self) as any).homeStore.setCreationMode
      )
      reaction(() => self.scene === 'home', (getParent(self) as any).homeStore.disableFullScreen)
      reaction(() => self.scene === 'botDetails', (getParent(self) as any).homeStore.setDetailsMode)
    },
  }))
  .postProcessSnapshot((snapshot: any) => {
    // No need to persist this store
    return {}
  })

export default NavStore
type NavStoreType = typeof NavStore.Type
export interface INavStore extends NavStoreType {}
