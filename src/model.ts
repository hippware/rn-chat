import { types, IModelType, ISimpleType, ISnapshottable } from 'mobx-state-tree'
import { IObservableArray } from 'mobx'

export const FileSource = types.model('FileSource', {
  uri: types.string,
  contentType: types.string,
  cached: false
})

export const File = types.model('File', {
  id: types.identifier(types.string),
  item: types.string,
  source: FileSource,
  width: types.number,
  height: types.number,
  error: types.string,
  loaded: false,
  loading: false,
  isNew: false
})

export const Status = types.enumeration('status', ['available', 'unavailable'])

export const Profile = types.model('Profile', {
  user: types.identifier(types.string),
  avatar: types.maybe(File),
  email: '',
  handle: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  loaded: false,
  isFollower: false,
  isFollowed: false,
  isNew: false,
  isBlocked: false,
  hidePosts: false,
  status: types.optional(Status, 'unavailable'),
  followersSize: 0,
  botsSize: 0,
  roles: types.optional(types.array(types.string), [])
})
export type IProfile = typeof Profile.Type

export const ProfileList = types
  .model('ProfileList', {
    list: types.optional(types.array(Profile), []),
    lastId: '',
    finished: false,
    loading: false
  })
  .views(self => {
    return {
      get length() {
        return self.list.length
      }
    }
  })
  .actions(self => {
    return {
      startLoading: () => (self.loading = true),
      stopLoading: () => (self.loading = false),
      complete: () => (self.finished = true),
      add: (profile: IProfile) => self.list.push(profile),
      setLastId: (id: string) => (self.lastId = id)
    }
  })
