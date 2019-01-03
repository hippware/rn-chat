import {types} from 'mobx-state-tree'
import {Event} from './Event'

export const EventDelete = types
  .compose(
    Event,
    types.model({
      delete: types.boolean,
    })
  )
  .named('EventDelete')
