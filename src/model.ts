// tslint:disable-next-line:no_unused-variable
import {types, getEnv, getType, getParent, getRoot, flow, IModelType, ISimpleType, ISnapshottable} from 'mobx-state-tree'
// tslint:disable-next-line:no_unused-variable
import {IObservableArray} from 'mobx'
import {PaginableList, IPaginableList} from './paging'
import {IWocky} from './index'
import {waitFor} from './utils'

export const SERVICE_NAME = 'WockyClient'

// Base class for entities that want access to parent wocky service
export const Base = types.model('Base', {}).views(self => ({
  get service() {
    let target = self
    while (getParent(target) && getType(getParent(target)).name !== SERVICE_NAME) {
      target = getParent(target)
    }
    return getType(getParent(target)).name === SERVICE_NAME ? getParent(target) : null
  }
}))
export const Status = types.enumeration('status', ['available', 'unavailable'])

export const FileSource = types
  .model('FileSource', {
    uri: types.string,
    contentType: types.maybe(types.string),
    width: types.maybe(types.number),
    height: types.maybe(types.number),
    cached: false
  })
  .named('FileSource')
export type IFileSource = typeof FileSource.Type
export const File = types
  .compose(
    Base,
    types.model('File', {
      id: types.identifier(types.string),
      item: types.maybe(types.string),
      source: types.maybe(FileSource),
      thumbnail: types.maybe(FileSource),
      url: '',
      isNew: false
    })
  )
  .named('File')
  .volatile(self => ({
    loading: false
  }))
  .views(self => ({
    get loaded() {
      return self.source !== null
    }
  }))
  .actions(self => {
    return {
      downloadThumbnail: flow(function*() {
        const service = self.service
        if (!self.loading && !self.thumbnail && self.url) {
          try {
            self.loading = true
            self.thumbnail = yield self.service.downloadThumbnail(self.url, self.id)
            self.url = ''
          } catch (e) {
            console.warn(e)
          } finally {
            self.loading = false
          }
        }
      }),
      download: flow(function*() {
        if (!self.source && !self.loading) {
          try {
            self.loading = true
            self.source = yield self.service.downloadTROS(self.id)
            self.thumbnail = self.source
          } catch (e) {
            console.warn(e)
          } finally {
            self.loading = false
          }
        }
      })
    }
  })
  .actions(self => ({
    afterAttach: flow(function*() {
      yield waitFor(() => self.service.connected)
      if (!self.thumbnail) {
        if (self.url) {
          yield self.downloadThumbnail()
        } else {
          yield self.download()
        }
      }
    })
  }))
export type IFile = typeof File.Type

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
