import { types, getEnv, getParent, getRoot, flow, IModelType, ISimpleType, ISnapshottable } from 'mobx-state-tree'
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

export const ProfileList = types
  .model('ProfileList', {
    relation: types.string,
    user: types.string
  })
  .extend(self => {
    const { service } = getEnv(self)
    let loading = false
    let finished = false
    const result: Array<IProfile> = []

    function lastId() {
      return result.length ? result[result.length - 1].user : null
    }

    return {
      views: {
        get loading() {
          return loading
        },
        get finished() {
          return finished
        },
        get length() {
          return result.length
        },
        get list() {
          return result
        }
      },
      actions: {
        // TODO fix code duplicate here, was not able to pass optional param because of generics
        loadPage: flow<number>(function*(max: number) {
          if (loading || finished) {
            return result
          }
          loading = true
          try {
            const { list, count } = yield service.loadRelations(self.user, self.relation, lastId(), max)
            result.push.apply(result, list)
            finished = result.length === count
          } catch (e) {
            console.log('ERROR:', e)
          } finally {
            loading = false
          }
          return result
        }),
        load: flow<Array<any>>(function* load() {
          if (loading || finished) {
            return result
          }
          loading = true
          try {
            const { list, count } = yield service.loadRelations(self.user, self.relation, lastId())
            result.push.apply(result, list)
            finished = result.length === count
          } catch (e) {
            console.log('ERROR:', e)
          } finally {
            loading = false
          }
          return result
        })
      }
    }
  })

export const Profile = types
  .model('Profile', {
    user: types.identifier(types.string),
    avatar: types.maybe(File),
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
    let followers: IProfileList, following: IProfileList
    return {
      get followers() {
        if (!followers) {
          followers = ProfileList.create({ relation: 'follower', user: self.user }, { service: getRoot(self) })
        }
        return followers
      },
      get following() {
        if (!following) {
          following = ProfileList.create({ relation: 'following', user: self.user }, { service: getRoot(self) })
        }
        return following
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

export type IProfileList = typeof ProfileList.Type
