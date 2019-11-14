import {types, getSnapshot, Instance, onSnapshot, applySnapshot} from 'mobx-state-tree'
import {Base} from './Base'

const Hidden = types
  .model('HiddenType', {
    enabled: false,
    expires: types.maybeNull(types.Date),
  })
  .actions(self => ({
    setEnabled: (value: boolean) => {
      self.enabled = value
    },
  }))
  .actions(self => {
    let timerId
    return {
      afterAttach: () => {
        // change a value when it is expired!
        if (self.enabled && self.expires) {
          timerId = setTimeout(() => self.setEnabled(false), self.expires.getTime() - Date.now())
        }
      },
      beforeDestroy: () => {
        if (timerId !== undefined) {
          clearTimeout(timerId)
        }
      },
    }
  })

const ClientData = types
  .compose(
    Base,
    types
      .model({
        sharePresencePrimed: false,
        guestOnce: false,
        hidden: types.optional(Hidden, {}),
      })
      .views(self => ({
        get toJSON(): string {
          return JSON.stringify(getSnapshot(self))
        },
      }))
  )
  .named('ClientData')
  .actions(self => ({
    afterAttach() {
      onSnapshot(self, clientData => {
        self.transport.updateProfile({clientData})
      })
    },
    hide(value: boolean, expires: Date | undefined) {
      self.hidden = Hidden.create({enabled: value, expires})
    },
    load: snapshot => {
      applySnapshot(self, JSON.parse(snapshot))
    },
    clear: () => {
      applySnapshot(self, {})
    },
    flip: (property: 'sharePresencePrimed' | 'guestOnce') => {
      self[property] = true
    },
  }))

export default ClientData

export interface IClientData extends Instance<typeof ClientData> {}
