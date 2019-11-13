import {types, Instance, getRoot} from 'mobx-state-tree'
import {reaction, IReactionDisposer} from 'mobx'
import {IWocky} from 'wocky-client'

const UserPreferences = types
  .model('UserPreferences', {
    hidden: false,
    hiddenExpires: types.maybeNull(types.Date),
  })
  .actions(self => ({
    setHidden(value: boolean) {
      self.hidden = value
    },
    setHiddenExpires(date: Date | null) {
      self.hiddenExpires = date
    },
  }))
  .actions(self => {
    let reactions: IReactionDisposer[] = []
    return {
      afterAttach: () => {
        const wocky: IWocky = (getRoot(self) as any).wocky as IWocky
        reactions = [
          reaction(
            () => wocky && wocky.profile && wocky.profile!.hidden,
            () => {
              self.setHidden(wocky!.profile!.hidden.enabled)
              self.setHiddenExpires(wocky!.profile!.hidden.expires)
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
