// import {observable, when} from 'mobx'
// import * as Utils from './utils'
import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import fetch from 'node-fetch'

export class GraphQLTransport {
  resource: string
  client: any

  constructor(resource: string, host: string, userId: string, token: string /* fileService: IFileService */) {
    this.resource = resource

    // todo: implement login when it's ready
    this.client = new ApolloClient({
      link: new HttpLink({
        // use http link for now but may need websockets client later to handle subscriptions
        // https://www.apollographql.com/docs/link/links/ws.html
        uri: `https://${host}/graphql`,
        headers: {
          'x-auth-user': userId,
          'x-auth-token': token
        },
        fetch
      }),
      cache: new InMemoryCache()
    })
  }

  async loadProfile(user: string): Promise<Object> {
    const res = await this.client.query({
      query: gql`
        query LoadProfile {
          users(id: "${user}") {
            id
            handle
          }
        }
      `
    })
    return res.data.users
  }
  async updateProfile(d: any) {
    // todo
  }
  async lookup(handle: string) {
    // todo
  }
  async remove() {
    // todo
  }

  async requestRoster() {
    // todo
  }

  async generateId() {
    // todo
  }
  async loadOwnBots(userId: string, after?: string, max: number = 10) {
    // const afterClause = after ? `after: "${after}"` : ''
    const res = await this.client.query({
      query: gql`
        query LoadOwnBots {
          currentUser {
            botsConnection(relationship: OWNED) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              totalCount
              edges {
                cursor
                node {
                  id
                  title
                  address
                  addressData
                  description
                  geofence
                  image
                  public
                  radius
                  server
                  shortname
                  type
                }
              }
            }
          }
        }
      `
    })
    // console.log('res', res.data.currentUser.botsConnection)
    return res.data.currentUser.botsConnection.edges.map(e => e.node)
  }
  async loadBotSubscribers(id: string, lastId?: string, max: number = 10) {
    // todo
  }
  async loadBotGuests(id: string, lastId?: string, max: number = 10) {}
  async loadBotVisitors(id: string, lastId?: string, max: number = 10) {}
  async loadBotPosts(id: string, before?: string) {}
  async loadSubscribedBots(userId: string, lastId?: string, max: number = 10) {}
  async updateBot(bot: any) {}
  async loadBot(id: string, server: any) {}
  async removeBotPost(id: string, postId: string) {}
  shareBot(id: string, server: string, recepients: string[], message: string, action: string) {}
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
