// import {observable, when} from 'mobx'
// import * as Utils from './utils'
import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import {IWockyTransport, IPagingList} from './IWockyTransport'
import {observable, action, when} from 'mobx'
import * as AbsintheSocket from '@absinthe/socket'
import {createAbsintheSocketLink} from '@absinthe/socket-apollo-link'
import {Socket as PhoenixSocket} from 'phoenix'
import {VISIBILITY_PUBLIC, VISIBILITY_OWNER} from '../model/Bot'
import {IProfilePartial} from '../model/Profile'
import {ILocationSnapshot} from '..'

const PROFILE_PROPS = `id firstName lastName handle
  avatar { thumbnailUrl fullUrl trosUrl }
  bots(first:0, relationship: OWNED) { totalCount }
  followers: contacts(first: 0 relationship: FOLLOWER) { totalCount }
  followed: contacts(first: 0 relationship: FOLLOWING) { totalCount }
`
const BOT_PROPS = `id title address isPublic: public addressData description geofence public radius server shortname 
  image { thumbnailUrl fullUrl trosUrl }
  type lat lon owner { ${PROFILE_PROPS} } 
  items(first:0) { totalCount }
  guestCount: subscribers(first:0 type:GUEST){ totalCount }
  visitorCount: subscribers(first:0 type:VISITOR){ totalCount }
  subscriberCount: subscribers(first:0 type:SUBSCRIBER){ totalCount }
  subscribers(first:1 id: $ownUsername) { edges { relationships } }
`

export class GraphQLTransport implements IWockyTransport {
  resource: string
  client: ApolloClient<any>
  socket: PhoenixSocket
  botGuestVisitorsSubscription?: ZenObservable.Subscription
  @observable connected: boolean = false
  @observable connecting: boolean = false
  username: string
  password: string
  host: string
  @observable geoBot: any
  @observable message: any
  @observable notification: any
  @observable presence: any
  @observable rosterItem: any
  @observable botVisitor: any

  constructor(resource: string) {
    this.resource = resource
  }
  @action
  async login(user?: string, password?: string, host?: string): Promise<boolean> {
    if (this.connecting) {
      // prevent duplicate login
      return new Promise<boolean>(resolve => {
        when(
          () => !this.connecting,
          () => {
            resolve(this.connected)
          }
        )
      })
    }
    this.connecting = true
    if (user) {
      this.username = user
    }
    if (password) {
      this.password = password
    }
    if (host) {
      this.host = host
    }

    this.socket = new PhoenixSocket(`wss://${this.host}/graphql`, {
      reconnectAfterMs: () => 100000000, // disable auto-reconnect
      // uncomment to see all graphql messages!
      // logger: (kind, msg, data) => {
      //   if (msg !== 'close') {
      //     console.log('& socket:' + `${kind}: ${msg}`, JSON.stringify(data))
      //   }
      // },
    })
    this.client = new ApolloClient({
      link: createAbsintheSocketLink(AbsintheSocket.create(this.socket)),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'network-only',
          errorPolicy: 'ignore',
        },
        query: {
          fetchPolicy: 'network-only',
          errorPolicy: 'ignore',
        },
      },
    })
    this.socket.onError(() => {
      // console.log('& graphql Phoenix socket error')
      this.connected = false
    })
    this.socket.onClose(() => {
      // console.log('& graphql Phoenix socket closed')
      this.unsubscribeBotVisitors()
      this.connected = false
    })
    this.socket.onOpen(() => {
      // console.log('& graphql open')
    })

    const res = await this.authenticate(this.username, this.password)
    if (res) {
      this.subscribeBotVisitors()
    }
    return res
  }

  @action
  async authenticate(user: string, token: string): Promise<boolean> {
    try {
      const res = await this.client.mutate({
        mutation: gql`
          mutation authenticate($user: String!, $token: String!) {
            authenticate(input: {user: $user, token: $token}) {
              user {
                id
              }
            }
          }
        `,
        variables: {user, token},
      })
      this.connected = !!res.data && res.data!.authenticate !== null
      return this.connected
    } catch (err) {
      this.connected = false
      return false
    } finally {
      this.connecting = false
    }
  }

  async loadProfile(user: string): Promise<IProfilePartial | null> {
    const res = await this.client.query<any>({
      query: gql`
          query LoadProfile {
            user(id: "${user}") {
              ${PROFILE_PROPS}
              ${user === this.username ? '... on CurrentUser { email phoneNumber }' : ''}
            }
          }
        `,
    })
    if (!res.data.user) {
      return null
    }
    return convertProfile(res.data.user)
  }
  async requestRoster(): Promise<[any]> {
    throw new Error('Not supported')
  }

  async generateId(): Promise<string> {
    throw new Error('Not supported')
  }
  async loadBot(id: string): Promise<any> {
    const res = await this.client.query<any>({
      query: gql`
        query loadBot($id: String!, $ownUsername: String!){
          bot(id: $id) {
            ${BOT_PROPS}
          }
        }
      `,
      variables: {
        id,
        ownUsername: this.username,
      },
    })
    return convertBot(res.data.bot)
  }

  async _loadBots(relationship: string, userId: string, after?: string, max: number = 10) {
    const res = await this.client.query<any>({
      query: gql`
          query loadBots($max: Int!, $ownUsername: String!, $userId: String!, $after: String, $relationship: String!) {
            user(id: $userId) {
              id
              bots(first: $max after: $after relationship: $relationship) {
                totalCount
                edges {
                  cursor
                  node {
                    ${BOT_PROPS}
                  }
                }
              }
            }
          }
        `,
      variables: {userId, after, max, ownUsername: this.username, relationship},
    })
    // return empty list for non-existed user
    if (!res.data.user) {
      return {list: [], count: 0}
    }
    const bots = res.data.user.bots
    const list = bots.edges.filter((e: any) => e.node).map((e: any) => convertBot(e.node))
    return {
      list,
      cursor: bots.edges.length ? bots.edges[bots.edges.length - 1].cursor : null,
      count: bots.totalCount,
    }
  }
  async setLocation(params: ILocationSnapshot): Promise<void> {
    const res = await this.client!.mutate({
      mutation: gql`
        mutation setLocation(
          $latitude: Float!
          $longitude: Float!
          $accuracy: Float!
          $resource: String!
        ) {
          userLocationUpdate(
            input: {accuracy: $accuracy, lat: $latitude, lon: $longitude, resource: $resource}
          ) {
            result
            successful
          }
        }
      `,
      variables: {...params, resource: this.resource},
    })
    return res.data!.userLocationUpdate && res.data!.userLocationUpdate.successful
  }
  async getLocationsVisited(limit: number = 50): Promise<object[]> {
    const res = await this.client.query<any>({
      // NOTE: id is required in this query to prevent apollo-client error: https://github.com/apollographql/apollo-client/issues/2510
      query: gql`
        query getLocationsVisited($limit: Int!, $ownResource: String!) {
          currentUser {
            id
            locations(first: $limit, device: $ownResource) {
              totalCount
              edges {
                node {
                  lat
                  lon
                  createdAt
                }
              }
            }
          }
        }
      `,
      variables: {limit, ownResource: this.resource},
    })
    return res.data.currentUser.locations.edges.map(e => {
      const {createdAt, lat, lon, accuracy} = e.node
      return {createdAt, lat, lon, accuracy}
    })
  }
  @action
  unsubscribeBotVisitors() {
    this.connected = false
    this.connecting = false
    if (this.botGuestVisitorsSubscription) this.botGuestVisitorsSubscription.unsubscribe()
    this.botGuestVisitorsSubscription = undefined
  }
  subscribeBotVisitors() {
    if (this.botGuestVisitorsSubscription) {
      return
    }
    this.botGuestVisitorsSubscription = this.client
      .subscribe({
        query: gql`
          subscription subscribeBotVisitors($ownUsername: String!){
            botGuestVisitors {
              action
              bot {
                ${BOT_PROPS}
                visitors: subscribers(first: 1, type: VISITOR) {
                    edges {
                      cursor
                      node {
                        ${PROFILE_PROPS}
                      }
                    }
                  }
              }
              visitor {
                id
              }
            }
          }
        `,
        variables: {
          ownUsername: this.username,
        },
      })
      .subscribe({
        next: action((result: any) => {
          const update = result.data.botGuestVisitors
          this.botVisitor = {
            visitor: {id: update.visitor.id},
            bot: convertBot(update.bot),
            action: update.action,
          }
        }),
      })
  }

  async loadOwnBots(id: string, lastId?: string, max: number = 10) {
    return await this._loadBots('OWNED', id, lastId, max)
  }
  async loadSubscribedBots(
    userId: string,
    lastId?: string,
    max: number = 10
  ): Promise<IPagingList> {
    return await this._loadBots('SUBSCRIBED', userId, lastId, max)
  }
  async loadGeofenceBots(): Promise<IPagingList> {
    // load all guest bots
    const res = await this.client.query<any>({
      query: gql`
        query getActiveBots($ownUsername: String!) {
          currentUser {
            id
            activeBots(first: 20) {
              totalCount
              edges {
                cursor
                node {
                  ${BOT_PROPS}
                  visitors: subscribers(first: 1, type: VISITOR) {
                    edges {
                      cursor
                      node {
                        ${PROFILE_PROPS}
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        ownUsername: this.username,
      },
    })
    const bots = res.data.currentUser.activeBots
    const list = bots.edges.filter((e: any) => e.node).map((e: any) => convertBot(e.node))
    return {
      list,
      cursor: bots.edges.length ? bots.edges[bots.edges.length - 1].cursor : null,
      count: bots.totalCount,
    }
  }

  async loadBotSubscribers(id: string, lastId?: string, max: number = 10): Promise<IPagingList> {
    return this.getBotProfiles('SUBSCRIBER', false, id, lastId, max)
  }
  async loadBotGuests(id: string, lastId?: string, max: number = 10): Promise<IPagingList> {
    return this.getBotProfiles('GUEST', true, id, lastId, max)
  }
  async loadBotVisitors(id: string, lastId?: string, max: number = 10): Promise<IPagingList> {
    return this.getBotProfiles('VISITOR', true, id, lastId, max)
  }
  async loadBotPosts(): Promise<IPagingList> {
    throw new Error('Not supported')
  }
  shareBot() {
    throw new Error('Not supported')
  }
  async register(): Promise<{username: string; password: string; host: string}> {
    throw new Error('Not supported')
  }

  async testRegister(): Promise<{username: string; password: string; host: string}> {
    throw new Error('Not supported')
  }

  async disconnect(): Promise<void> {
    // console.log('& graphql disconnect')
    if (this.socket && this.socket.isConnected()) {
      this.unsubscribeBotVisitors()
      return new Promise<void>((resolve, reject) => {
        try {
          this.socket.disconnect(() => {
            // console.log('& graphql onDisconnect', something)
            resolve()
          })
        } catch (err) {
          // console.log('& graphql disconnect err', err)
          reject(err)
        }
      })
    }
  }

  async requestProfiles(): Promise<any> {
    throw new Error('Not supported')
  }

  async updateProfile(d: any): Promise<void> {
    const fields = ['avatar', 'handle', 'email', 'firstName', 'tagline', 'lastName']
    const values = {}
    fields.forEach(field => {
      if (d[field]) {
        values[field] = d[field]
      }
    })
    const data: any = await this.client.mutate({
      mutation: gql`
        mutation userUpdate($values: UserParams!) {
          userUpdate(input: {values: $values}) {
            successful
            messages {
              message
            }
          }
        }
      `,
      variables: {values},
    })
    if (!data.data.userUpdate.successful) {
      throw new Error(JSON.stringify(data.data.userUpdate.messages))
    }
  }

  async lookup(): Promise<any> {
    throw new Error('Not supported')
  }

  async remove(): Promise<void> {
    // TODO: remove user
    return this.disconnect()
  }

  async downloadURL(): Promise<any> {
    throw new Error('Not supported')
  }

  async downloadFile(): Promise<any> {
    throw new Error('Not supported')
  }

  async downloadThumbnail(): Promise<any> {
    throw new Error('Not supported')
  }

  async downloadTROS(): Promise<any> {
    throw new Error('Not supported')
  }

  async requestUpload(): Promise<string> {
    throw new Error('Not supported')
  }

  async follow(): Promise<void> {
    throw new Error('Not supported')
  }

  async unfollow(): Promise<void> {
    throw new Error('Not supported')
  }

  async block(): Promise<void> {
    throw new Error('Not supported')
  }

  async unblock(): Promise<void> {
    throw new Error('Not supported')
  }

  async subscribeBot(): Promise<number> {
    throw new Error('Not supported')
  }

  async unsubscribeBot(): Promise<number> {
    throw new Error('Not supported')
  }

  async loadChats(): Promise<Array<{id: string; message: any}>> {
    throw new Error('Not supported')
  }

  async removeBot(): Promise<void> {
    throw new Error('Not supported')
  }

  async removeBotPost(): Promise<void> {
    throw new Error('Not supported')
  }

  async updateBot(): Promise<void> {
    throw new Error('Not supported')
  }

  async loadRelations(): Promise<IPagingList> {
    throw new Error('Not supported')
  }

  async publishBotPost(): Promise<void> {
    throw new Error('Not supported')
  }

  async geosearch(): Promise<void> {
    throw new Error('Not supported')
  }

  sendMessage(): void {
    throw new Error('Not supported')
  }

  async loadChat(): Promise<void> {
    throw new Error('Not supported')
  }

  subscribeToHomestream(): void {
    throw new Error('Not supported')
  }

  async enablePush(): Promise<void> {
    throw new Error('Not supported')
  }

  async disablePush(): Promise<void> {
    throw new Error('Not supported')
  }

  async loadUpdates(): Promise<{list: [any]; version: string; bots: [any]}> {
    throw new Error('Not supported')
  }

  async loadHomestream(): Promise<IPagingList> {
    throw new Error('Not supported')
  }
  private async getBotProfiles(
    relationship: 'SUBSCRIBER' | 'GUEST' | 'VISITOR',
    includeCurrentUser: boolean,
    id: string,
    lastId?: string,
    max: number = 10
  ): Promise<IPagingList> {
    const res = await this.client.query<any>({
      query: gql`
        query getBotProfiles($botId: UUID!, $cursor: String, $limit: Int) {
          bot(id: $botId) {
            id
            subscribers(after: $cursor, first: $limit, type: ${relationship}) {
              totalCount
              edges {
                cursor
                node {
                  ${PROFILE_PROPS}
                }
              }
            }
          }
        }
      `,
      variables: {
        botId: id,
        cursor: lastId,
        limit: max,
      },
    })
    // return empty list for null data
    if (!res.data.bot || !res.data.bot.subscribers) {
      return {list: [], count: 0}
    }
    let list = res.data.bot.subscribers.edges
    let count = res.data.bot.subscribers.totalCount
    if (!includeCurrentUser) {
      list = list.filter(p => {
        return p.node.__typename !== 'CurrentUser'
      })
      count -= 1
    }
    return {
      list: list.map(p => convertProfile(p.node)),
      cursor: list.length ? list[list.length - 1].cursor : null,
      count,
    }
  }
}

function convertImage(image) {
  return image ? {id: image.trosUrl, url: image.thumbnailUrl} : null
}
function convertProfile({avatar, bots, followers, followed, ...data}): IProfilePartial {
  // console.log('convertProfile', bots, followers, followed, data)
  return {
    avatar: convertImage(avatar),
    botsSize: bots.totalCount,
    followersSize: followers.totalCount,
    followedSize: followed.totalCount,
    ...data,
  } as IProfilePartial
}
function convertBot({
  lat,
  lon,
  image,
  addressData,
  isPublic,
  owner,
  items,
  visitors,
  subscriberCount,
  visitorCount,
  guestCount,
  subscribers,
  ...data
}: any) {
  try {
    const relationships = subscribers.edges.length ? subscribers.edges[0].relationships : []
    const contains = (relationship: string): boolean => relationships.indexOf(relationship) !== -1
    return {
      ...data,
      owner: convertProfile(owner),
      image: convertImage(image),
      addressData: addressData ? JSON.parse(addressData) : {},
      totalItems: items ? items.totalCount : 0,
      followersSize: subscriberCount.totalCount - 1,
      visitors: visitors ? visitors.edges.map(rec => convertProfile(rec.node)) : undefined,
      visitorsSize: visitorCount.totalCount,
      guestsSize: guestCount.totalCount,
      location: {latitude: lat, longitude: lon},
      visibility: isPublic ? VISIBILITY_PUBLIC : VISIBILITY_OWNER,
      guest: contains('GUEST'),
      visitor: contains('VISITOR'),
      isSubscribed: contains('SUBSCRIBED'),
    }
  } catch (e) {
    // console.error('ERROR CONVERTING:', arguments[0], e)
  }
}

// function timeout(promise: Promise<any>, timeoutMillis: number) {
//   let timeout: any
//   return Promise.race([
//     promise,
//     new Promise(function(resolve, reject) {
//       timeout = setTimeout(function() {
//         reject('Operation timed out')
//       }, timeoutMillis)
//     })
//   ]).then(
//     function(v) {
//       clearTimeout(timeout)
//       return v
//     },
//     function(err) {
//       clearTimeout(timeout)
//       throw err
//     }
//   )
// }
