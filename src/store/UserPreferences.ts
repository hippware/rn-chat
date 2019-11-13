import {types, Instance, getRoot} from 'mobx-state-tree'
import {reaction, IReactionDisposer} from 'mobx'
import {IWocky} from 'wocky-client'

const UserPreferences = types
  .model('UserPreferences', {
    hidden: false,
    hiddenExpires: types.maybeNull(types.Date),
  })
  .actions(self => {
    const wocky: IWocky = (getRoot(self) as any).wocky as IWocky
    let reactions: IReactionDisposer[] = []
    return {
      afterAttach: () => {
        reactions = [
          reaction(
            () => wocky && wocky.profile && wocky.profile!.hidden,
            () => {
              console.log('SET HIDDEN', wocky!.profile!.hidden)
              self.hidden = wocky!.profile!.hidden.enabled
              self.hiddenExpires = wocky!.profile!.hidden.expires
            }
          ),
        ]
      },
      beforeDestroy: () => {
        reactions.forEach(disposer => disposer())
        reactions = []
      },
    }
  })

export default UserPreferences

export interface IUserPreferences extends Instance<typeof UserPreferences> {}
