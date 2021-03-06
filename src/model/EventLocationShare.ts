import {types, Instance} from 'mobx-state-tree'
import {Event, IEventData} from './Event'
import {IProfilePartial, Profile, FriendShareType, FriendShareTypeEnum} from './Profile'
import {Base} from './Base'
import {EventRequestTypes} from './EventList'

export const EventLocationShareType = 'LOCATION_SHARE_NOTIFICATION'
export const EventLocationShare = types
  .compose(
    Base,
    Event,
    types.model({
      sharedWith: types.reference(Profile),
      shareType: types.maybe(FriendShareType),
      ownShareType: types.maybe(FriendShareType),
    })
  )
  .views(() => ({
    get isRequest() {
      return EventRequestTypes.includes(EventLocationShareType)
    },
  }))
  .actions(self => ({
    process: () => {
      self.sharedWith.shareType = self.shareType
      self.sharedWith.ownShareType = self.ownShareType
      self.sharedWith.setSharesLocation(self.ownShareType === FriendShareTypeEnum.ALWAYS)
    },
  }))
  .named('EventLocationShare')

export interface IEventLocationShare extends Instance<typeof EventLocationShare> {}

export interface IEventLocationShareData extends IEventData {
  sharedWith: IProfilePartial
  shareType: FriendShareTypeEnum
  ownShareType: FriendShareTypeEnum
}
