import {types, getSnapshot, Instance, onSnapshot, applySnapshot} from 'mobx-state-tree'
import {Base} from './Base'

const ClientData = types
  .compose(
    Base,
    types
      .model({
        sharePresencePrimed: false,
        guestOnce: false,
        onboarded: false,
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
    clear: () => {
      applySnapshot(self, {})
    },
    flip: (property: 'sharePresencePrimed' | 'guestOnce' | 'onboarded') => {
      self[property] = true
    },
  }))

export default ClientData

export interface IClientData extends Instance<typeof ClientData> {}
export function createClientData(data: string, existingData?: object) {
  let result: any = {}
  if (data) {
    try {
      result = JSON.parse(data)
      // ignore onboarded flag...only cache locally
      delete result.onboarded
    } catch (e) {
      // ignore error
    }
  }
  return ClientData.create({...existingData, ...result})
}
