import {types, getSnapshot, Instance, applySnapshot} from 'mobx-state-tree'
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
        onboarded: false,
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
    hide(value: boolean, expires: Date | undefined) {
      self.hidden = Hidden.create({enabled: value, expires})
      self.transport.updateProfile({clientData: getSnapshot(self)})
    },
    load: snapshot => {
      applySnapshot(self, JSON.parse(snapshot))
    },
    clear: () => {
      applySnapshot(self, {})
    },
    flip: (property: 'sharePresencePrimed' | 'guestOnce' | 'onboarded') => {
      self[property] = true
      self.transport.updateProfile({clientData: getSnapshot(self)})
    },
  }))

export default ClientData

export interface IClientData extends Instance<typeof ClientData> {}
