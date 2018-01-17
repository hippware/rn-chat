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
    user: types.identifier(types.string),
    // avatar: types.maybe(Image),
    avatar: '',
    handle: '',
    firstName: '',
    lastName: '',
    status: types.optional(Status, 'unavailable'),
    followersSize: 0,
    botsSize: 0,
    roles: types.optional(types.array(types.string), [])
  })
  .views(self => {
    // lazy instantiation because we need to inject root service into ProfileList and root instance is attached later
    let followers: IPaginableList, following: IPaginableList
    return {
      get followers() {
        return followers || (followers = create(self, 'loadRelations', self.user, 'follower'))
      },
      get following() {
        return following || (following = create(self, 'loadRelations', self.user, 'following'))
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
