// tslint:disable-next-line:no_unused-variable
import {types, flow, onSnapshot, getEnv, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
const moment = require('moment')

export const Timeable = types
  .model('Timeable', {
    time: types.optional(types.number, () => Date.now())
  })
  .views(self => ({
    get date(): Date {
      return new Date(self.time)
    },
    get dateAsString(): string {
      return moment(self.time).calendar()
    },
    get relativeDateAsString(): string {
      return moment(self.time).fromNow(true)
    }
  }))
