// tslint:disable-next-line:no_unused-variable
import {types, IModelType, ISimpleType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {File} from './File'
import {Base} from './Base'
import {IWocky} from '../index'
import {IPaginableList, PaginableList} from './PaginableList'

export const Status = types.enumeration('status', ['available', 'unavailable'])
export const Profile = types
  .compose(
    Base,
    types.model('Profile', {
      id: types.identifier(types.string),
      avatar: types.maybe(types.reference(File)),
      handle: '',
      firstName: '',
      lastName: '',
      isBlocked: false,
      isFollowed: false,
      isFollower: false,
      isNew: false,
      status: types.optional(Status, 'unavailable'),
      followersSize: 0,
      followedSize: 0,
      botsSize: 0,
      roles: types.optional(types.array(types.string), [])
    })
  )
  .views(self => {
    // lazy instantiation because we need to inject root service into ProfileList and root instance is attached later
    let followers: IPaginableList, followed: IPaginableList
    return {
      get isOwn(): boolean {
        const ownProfile = self.service.profile
        return ownProfile && self.id === ownProfile.id
      },
      get isVerified(): boolean {
        return self.roles.length ? self.roles.indexOf('verified') !== -1 : false
      },
      get isMutual(): boolean {
        return self.isFollowed && self.isFollower
      },
      get followers(): IPaginableList {
        return (
          followers ||
          (followers = PaginableList.create({}, {request: (self.service as IWocky).loadRelations.bind(self.service, self.id, 'follower')}))
        )
      },
      get followed(): IPaginableList {
        return (
          followed ||
          (followed = PaginableList.create({}, {request: (self.service as IWocky).loadRelations.bind(self.service, self.id, 'following')}))
        )
      },
      get displayName(): string {
        if (self.firstName && self.lastName) {
          return `${self.firstName} ${self.lastName}`
        }
        if (self.firstName) {
          return self.firstName
        } else if (self.lastName) {
          return self.lastName
        } else if (self.handle) {
          return self.handle
        } else {
          return '(Not completed)'
        }
      }
    }
  })

export const OwnProfile = types.compose(
  Profile,
  types
    .model('OwnProfile', {
      email: '',
      phoneNumber: ''
    })
    .named('OwnProfile')
)

export type IProfile = typeof Profile.Type
