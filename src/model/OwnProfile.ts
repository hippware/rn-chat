// tslint:disable-next-line:no_unused-variable
import {types, flow, onSnapshot, IModelType, ISimpleType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {Profile} from './Profile'
export const OwnProfile = types.compose(
  Profile,
  types
    .model('OwnProfile', {
      email: '',
      phoneNumber: ''
    })
    .volatile(self => ({
      updated: false,
      updating: false,
      updateError: ''
    }))
    .named('OwnProfile')
    .actions((self: any) => ({
      update: (data: any) => {
        self.updated = false
        self.updatedError = ''
        Object.assign(self, data)
      },
      _onChanged: flow(function*(snapshot: any) {
        if (!self.updating) {
          try {
            self.updating = true
            self.updated = false
            yield self.service._updateProfile(snapshot)
            self.updated = true
          } catch (e) {
            self.updateError = e
          } finally {
            self.updating = false
          }
        }
      }),
      afterCreate: () => {
        // listen to new snapshots
        onSnapshot(self, async snapshot => {
          await self._onChanged(snapshot)
        })
      }
    }))
)
