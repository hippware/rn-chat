// tslint:disable-next-line:no_unused-variable
import {types, getEnv, getParent, getRoot, flow, IModelType, ISimpleType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {create, IPaginableList} from './paging'

export const Status = types.enumeration('status', ['available', 'unavailable'])

export const Image = types
  .model('Image', {
    tros: types.string, // TROS URL
    url: types.string, // S3 URL that will be replaced to local path after loading
    thumbnail: types.string // S3 URL that will be replaced to local path after loading
  })
  .actions(self => {
    return {
      setURL: (url: string) => (self.url = url),
      setThumbnail: (thumbnail: string) => (self.thumbnail = thumbnail)
    }
  })

export const Profile = types
  .model('Profile', {
    id: types.identifier(types.string),
    // avatar: types.maybe(Image),
    // NOTE: causes errors after staging push
    // avatar: '',
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
  .views(self => {
    // lazy instantiation because we need to inject root service into ProfileList and root instance is attached later
    let followers: IPaginableList, followed: IPaginableList
    return {
      get isOwn() {
        const ownProfile = getParent(self).profile
        // parent is Profile map if self is not own profile
        // not the cleanest, but it works
        return ownProfile && self.id === ownProfile.id
      },
      get followers() {
        return followers || (followers = create(self, 'loadRelations', self.id, 'follower'))
      },
      get followed() {
        return followed || (followed = create(self, 'loadRelations', self.id, 'following'))
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
  types.model('OwnProfile', {
    email: '',
    phoneNumber: ''
  })
)

export type IProfile = typeof Profile.Type
