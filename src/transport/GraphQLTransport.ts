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
import {ILocationSnapshot} from '..'

// TODO use GraphQL fragment for this?
const PROFILE_PROPS = 'id firstName lastName handle avatar { thumbnailUrl fullUrl trosUrl }'
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
      return new Promise<boolean>((resolve, reject) => {
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
      // reconnectAfterMs: tries => 100000000, // disable auto-reconnect
      logger: (kind, msg, data) => {
        // uncomment to see all graphql messages!
        if (msg !== 'close') {
          console.log('& socket:' + `${kind}: ${msg}`, JSON.stringify(data))
        }
      }
    })
    this.client = new ApolloClient({
      link: createAbsintheSocketLink(AbsintheSocket.create(this.socket)),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'network-only',
          errorPolicy: 'ignore'
        },
        query: {
          fetchPolicy: 'network-only',
          errorPolicy: 'all'
        }
      }
    })
    return new Promise<boolean>((resolve, reject) => {
      this.socket.onError(err => {
        console.log('& graphql Phoenix socket error')
      })
      this.socket.onClose(err => {
        console.log('& graphql Phoenix socket closed')
        this.unsubscribeBotVisitors()
      })
      this.socket.onOpen(() => {
        console.log('& graphql open')
        this.authenticate(this.username, this.password).then(res => {
          if (res) {
            this.subscribeBotVisitors()
          }
          resolve(res)
        })
      })
      // send first dump query to start websockets
      this.client.query({
        query: gql`
          query {
            currentUser {
              id
            }
          }
        `
      })
    })
  }

  @action
  async authenticate(user: string, token: string): Promise<boolean> {
    try {
      console.log('& graphql proceeding with login')
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
        variables: {user, token}
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

  async loadProfile(user: string): Promise<any> {
    // console.log('& graphql load profile proceeding')
    const res = await this.client.query<any>({
      query: gql`
        query LoadProfile {
          user(id: "${user}") {
            id
            handle
            phoneNumber
            email
          }
        }
      `
    })
    return res.data.user
  }
  async requestRoster(): Promise<[any]> {
    throw 'Not supported'
  }

  async generateId(): Promise<string> {
    throw 'Not supported'
  }
  async loadBot(id: string, server: any): Promise<any> {
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
        ownUsername: this.username
      }
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
      variables: {userId, after, max, ownUsername: this.username, relationship}
    })
    const {bots} = res.data.user
    const list = bots.edges.filter((e: any) => e.node).map((e: any) => convertBot(e.node))
    return {list, cursor: bots.edges.length ? bots.edges[bots.edges.length - 1].cursor : null, count: bots.totalCount}
  }
  async setLocation(params: ILocationSnapshot): Promise<void> {
    const res = await this.client!.mutate({
      mutation: gql`
        mutation setLocation($latitude: Float!, $longitude: Float!, $accuracy: Float!, $resource: String!) {
          userLocationUpdate(input: {accuracy: $accuracy, lat: $latitude, lon: $longitude, resource: $resource}) {
            result
            successful
          }
        }
      `,
      variables: {...params, resource: this.resource}
    })
    return res.data!.userLocationUpdate && res.data!.userLocationUpdate.successful
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
              }
              visitor {
                ${PROFILE_PROPS}
              }
            }
          }
        `,
        variables: {
          ownUsername: this.username
        }
      })
      .subscribe({
        next: action((result: any) => {
          const update = result.data.botGuestVisitors
          this.botVisitor = {visitor: convertProfile(update.visitor), bot: convertBot(update.bot), action: update.action}
        })
      })
  }

  async loadOwnBots(id: string, lastId?: string, max: number = 10) {
    return await this._loadBots('OWNED', id, lastId, max)
  }
  async loadSubscribedBots(userId: string, lastId?: string, max: number = 10): Promise<IPagingList> {
    return await this._loadBots('SUBSCRIBED', userId, lastId, max)
  }
  async loadGeofenceBots(userId: string, lastId?: string, max?: number): Promise<IPagingList> {
    // load all guest bots
    const res = await this._loadBots('GUEST', userId, lastId, 100)
    return res
  }
  async loadBotSubscribers(id: string, lastId?: string, max: number = 10): Promise<IPagingList> {
    throw 'Not supported'
  }
  async loadBotGuests(id: string, lastId?: string, max: number = 10): Promise<IPagingList> {
    throw 'Not supported'
  }
  async loadBotVisitors(id: string, lastId?: string, max: number = 10): Promise<IPagingList> {
    throw 'Not supported'
  }
  async loadBotPosts(id: string, before?: string): Promise<IPagingList> {
    throw 'Not supported'
  }
  shareBot(id: string, server: string, recepients: string[], message: string, action: string) {}
  async register(data: any, host?: string, providerName?: string): Promise<{username: string; password: string; host: string}> {
    throw 'Not supported'
  }

  async testRegister({phoneNumber}: {phoneNumber: string}, host: string): Promise<{username: string; password: string; host: string}> {
    throw 'Not supported'
  }

  async disconnect(): Promise<void> {
    console.log('& graphql disconnect')
    if (this.socket && this.socket.isConnected()) {
      this.unsubscribeBotVisitors()
      return new Promise<void>((resolve, reject) => {
        try {
          this.socket.disconnect(something => {
            // console.log('& graphql onDisconnect', something)
            resolve()
          })
        } catch (err) {
          console.log('& graphql disconnect err', err)
          reject(err)
        }
      })
    }
  }

  async requestProfiles(users: string[]): Promise<any> {
    throw 'Not supported'
  }

  async updateProfile(d: any): Promise<void> {
    throw 'Not supported'
  }

  async lookup(handle: string): Promise<any> {
    throw 'Not supported'
  }

  async remove(): Promise<void> {
    // TODO: remove user
    return this.disconnect()
  }

  async downloadURL(tros: string): Promise<any> {
    throw 'Not supported'
  }

  async downloadFile(tros: string, name: string, sourceUrl: string): Promise<any> {
    throw 'Not supported'
  }

  async downloadThumbnail(url: string, tros: string): Promise<any> {
    throw 'Not supported'
  }

  async downloadTROS(tros: string): Promise<any> {
    throw 'Not supported'
  }

  async requestUpload(params: {file: any; size: number; width: number; height: number; access: string}): Promise<string> {
    throw 'Not supported'
  }

  async follow(username: string): Promise<void> {
    throw 'Not supported'
  }

  async unfollow(username: string): Promise<void> {
    throw 'Not supported'
  }

  async block(username: string): Promise<void> {
    throw 'Not supported'
  }

  async unblock(username: string): Promise<void> {
    throw 'Not supported'
  }

  async subscribeBot(id: string, geofence?: boolean): Promise<number> {
    throw 'Not supported'
  }

  async unsubscribeBot(id: string, geofence?: boolean): Promise<number> {
    throw 'Not supported'
  }

  async loadChats(max?: number): Promise<Array<{id: string; message: any}>> {
    throw 'Not supported'
  }

  async removeBot(id: string): Promise<void> {
    throw 'Not supported'
  }

  async removeBotPost(id: string, postId: string): Promise<void> {
    throw 'Not supported'
  }

  async updateBot(bot: any): Promise<void> {
    throw 'Not supported'
  }

  async loadRelations(userId: string, relation: string, lastId?: string, max?: number): Promise<IPagingList> {
    throw 'Not supported'
  }

  async publishBotPost(botId: string, post: any): Promise<void> {
    throw 'Not supported'
  }

  async geosearch(props: {latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number}): Promise<void> {
    throw 'Not supported'
  }

  sendMessage(msg: any): void {}

  async loadChat(userId: string, lastId?: string, max?: number): Promise<void> {
    throw 'Not supported'
  }

  subscribeToHomestream(version: string): void {}

  async enablePush(token: string): Promise<void> {
    throw 'Not supported'
  }

  async disablePush(): Promise<void> {
    throw 'Not supported'
  }

  async loadUpdates(ver: string): Promise<{list: [any]; version: string; bots: [any]}> {
    throw 'Not supported'
  }

  async loadHomestream(lastId: any, max?: number): Promise<IPagingList> {
    throw 'Not supported'
  }
}

function convertImage(image) {
  return image ? {id: image.trosUrl, source: {uri: image.fullUrl}, thumbnail: {uri: image.thumbnailUrl}} : null
}
function convertProfile({avatar, ...data}) {
  return {avatar: convertImage(avatar), ...data}
}
function convertBot({lat, lon, image, addressData, isPublic, owner, items, subscriberCount, visitorCount, guestCount, subscribers, ...data}: any) {
  try {
    const relationships = subscribers.edges.length ? subscribers.edges[0].relationships : []
    const contains = (relationship: string): boolean => relationships.indexOf(relationship) !== -1
    return {
      ...data,
      owner: convertProfile(owner),
      image: convertImage(image),
      addressData: addressData || {},
      totalItems: items ? items.totalCount : 0,
      followersSize: subscriberCount.totalCount - 1,
      visitorsSize: visitorCount.totalCount,
      guestsSize: guestCount.totalCount,
      location: {latitude: lat, longitude: lon},
      visibility: isPublic ? VISIBILITY_PUBLIC : VISIBILITY_OWNER,
      guest: contains('GUEST'),
      visitor: contains('VISITOR'),
      isSubscribed: contains('SUBSCRIBED')
    }
  } catch (e) {
    console.error('ERROR CONVERTING:', arguments[0], e)
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
