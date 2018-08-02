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
        () => ['createBot', 'botCompose', 'botEdit'].includes(self.scene),
        getParent(self).homeStore.setCreationMode
      )
    },
    postProcessSnapshot(snapshot: any) {
      // No need to persist this store
      return {}
    },
  }))

export default NavStore
type NavStoreType = typeof NavStore.Type
export interface INavStore extends NavStoreType {}
