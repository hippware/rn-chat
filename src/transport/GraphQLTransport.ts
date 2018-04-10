// import {observable, when} from 'mobx'
// import * as Utils from './utils'
import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import {IWockyTransport, SetLocationParams, IPagingList} from './IWockyTransport'
import {observable} from 'mobx'
import * as AbsintheSocket from '@absinthe/socket'
import {createAbsintheSocketLink} from '@absinthe/socket-apollo-link'
import {Socket as PhoenixSocket} from 'phoenix'

// TODO use GraphQL fragment for this?
const BOT_PROPS = 'id title address addressData description geofence image public radius server shortname type lat lon'

export class GraphQLTransport implements IWockyTransport {
  resource: string
  client: ApolloClient<any>
  socket: PhoenixSocket
  subscriptions: {[key: string]: any} = {}
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
  async login(user?: string, password?: string, host?: string): Promise<boolean> {
    if (user) {
      this.username = user
    }
    if (password) {
      this.password = password
    }
    if (host) {
      this.host = host
    }
    this.socket = new PhoenixSocket(`wss://${this.host}/graphql`)
    // todo: implement login when it's ready
    this.client = new ApolloClient({
      link: createAbsintheSocketLink(AbsintheSocket.create(this.socket)),
      cache: new InMemoryCache()
    })
    try {
      const res = await this.client.mutate({
        mutation: gql`
          mutation authenticate($user: String!, $token: String!) {
            authenticate(user: $user, token: $token) {
              id
            }
          }
        `,
        variables: {user, token: password}
      })
      return !!res.data && res.data!.authenticate !== null
    } catch (err) {
      return false
    }
  }

  async loadProfile(user: string): Promise<any> {
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
        {
          bot(id: "${id}") {
            ${BOT_PROPS}
          }
        }
      `
    })
    return res.data.bot
  }

  async _loadBots(relationship: string, userId: string, after?: string, max: number = 10) {
    const res = await this.client.query<any>({
      query: gql`
        {
          user(id: "${userId}") {
            id
            bots(first: ${max} after: ${after ? `"${after}"` : null} relationship: ${relationship}) {
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
      `
    })
    const {bots} = res.data.user
    const list = bots.edges.map((e: any) => e.node)
    return {list, cursor: bots.edges.length ? bots.edges[bots.edges.length - 1].cursor : null, count: bots.totalCount}
  }
  async setLocation(params: SetLocationParams): Promise<void> {
    const res = await this.client.mutate({
      mutation: gql`
        mutation setLocation($latitude: Float!, $longitude: Float!, $accuracy: Float!, $resource: String!) {
          setLocation(location: {accuracy: $accuracy, lat: $latitude, lon: $longitude, resource: $resource}) {
            result
            successful
          }
        }
      `,
      variables: params
    })
    return res.data!.setLocation.successful
  }
  async subscribeBotVisitors(botId: string) {
    if (this.subscriptions[botId]) {
      this.subscriptions[botId]()
    }
    console.log('SUBSCRIBE BOT VISITORS', botId)
    this.subscriptions[botId] = await this.client
      .subscribe({
        query: gql`
          subscription botVisitors($id: String!) {
            botVisitors(id: $id) {
              subscribers(first: 100, type: VISITOR) {
                edges {
                  node {
                    avatar
                    firstName
                    lastName
                    handle
                    id
                  }
                }
              }
            }
          }
        `,
        variables: {id: botId}
      })
      .subscribe({
        next: (result: any) => {
          console.log('SUBSCRIPTION RESULT:', JSON.stringify(result))
          this.botVisitor = {...result.data.botVisitors.subscribers.edges[0].node, botId}
        }
      })
  }

  async loadOwnBots(id: string, lastId?: string, max: number = 10) {
    return await this._loadBots('OWNED', id, lastId, max)
  }
  async loadSubscribedBots(userId: string, lastId?: string, max: number = 10): Promise<IPagingList> {
    return await this._loadBots('SUBSCRIBED', userId, lastId, max)
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
    if (this.socket) {
      this.socket.disconnect()
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
