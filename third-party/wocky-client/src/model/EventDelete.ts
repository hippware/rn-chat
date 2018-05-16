import {types} from 'mobx-state-tree'
import {Event} from './Event'
import {IProfile} from './Profile'

// known typescript issue: https://github.com/mobxjs/mobx-state-tree#known-typescript-issue-5938
export type __IProfile = IProfile

export const EventDelete = types
  .compose(
    Event,
    types.model('EventDelete', {
      delete: types.boolean
    })
  )
  .named('EventDelete')
