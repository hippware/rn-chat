// tslint:disable-next-line:no_unused-variable
import {types, flow, onSnapshot, getEnv, IModelType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
const moment = require('moment')

// http://momentjs.com/docs/#/customization/relative-time/
moment.updateLocale('en', {
  relativeTime: {
    s: '%ds',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    y: '1y',
    yy: '%dy',
  },
})

// http://momentjs.com/docs/#/customization/relative-time-threshold/
moment.relativeTimeThreshold('d', 365)
moment.relativeTimeThreshold('M', 0)

export const Timeable = types
  .model('Timeable', {
    time: types.optional(types.number, () => Date.now()),
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
    },
  }))
