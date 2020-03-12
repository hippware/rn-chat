import {types, getSnapshot, Instance, applySnapshot} from 'mobx-state-tree'
import {Base} from './Base'

export enum MapOptionsEnum {
  AUTO = 'auto',
  SATELLITE = 'satellite',
  STREET = 'street',
}

export const MapOptions = types.enumeration([...Object.values(MapOptionsEnum)])

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

export const ClientData = types
  .compose(
    Base,
    types
      .model({
        mapOptions: types.optional(MapOptions, MapOptionsEnum.AUTO),
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
    persist() {
      self.transport.updateProfile({clientData: getSnapshot(self)})
    },
  }))
  .actions(self => ({
    setMapOptions(value) {
      self.mapOptions = value
      self.persist()
    },
    hide(value: boolean, expires: Date | undefined) {
      self.hidden = Hidden.create({enabled: value, expires})
      self.persist()
    },
    load: snapshot => {
      applySnapshot(self, JSON.parse(snapshot))
    },
    clear: () => {
      applySnapshot(self, {})
    },
    flip: (property: 'sharePresencePrimed' | 'guestOnce') => {
      self[property] = true
      self.persist()
    },
  }))

export interface IClientData extends Instance<typeof ClientData> {}
