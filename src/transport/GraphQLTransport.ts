// import {observable, when} from 'mobx'
// import * as Utils from './utils'
import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import {IWockyTransport, IPagingList} from './IWockyTransport'
import {observable} from 'mobx'

// TODO use GraphQL fragment for this?
const BOT_PROPS = 'id title address addressData description geofence image public radius server shortname type'

export class GraphQLTransport implements IWockyTransport {
  resource: string
  client: any
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
    // todo: implement login when it's ready
    this.client = new ApolloClient({
      link: new HttpLink({
        // use http link for now but may need websockets client later to handle subscriptions
        // https://www.apollographql.com/docs/link/links/ws.html
        uri: `https://${this.host}/graphql`,
        headers: {
          'x-auth-user': this.username,
          'x-auth-token': this.password
        }
      }),
      cache: new InMemoryCache()
    })
    return true
  }

  async loadProfile(user: string): Promise<any> {
    const res = await this.client.query({
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
    const res = await this.client.query({
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
    const res = await this.client.query({
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
    throw 'Not supported'
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
    throw 'Not supported'
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
