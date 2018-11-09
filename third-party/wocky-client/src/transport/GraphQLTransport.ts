import {ApolloClient} from 'apollo-client'
import {InMemoryCache, IntrospectionFragmentMatcher} from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import {IWockyTransport, IPagingList, LoginParams} from './IWockyTransport'
import {observable, action, when} from 'mobx'
import * as AbsintheSocket from '@absinthe/socket'
import {createAbsintheSocketLink} from '@absinthe/socket-apollo-link'
import {Socket as PhoenixSocket} from 'phoenix'
import {IProfilePartial} from '../model/Profile'
import {ILocationSnapshot} from '..'
import {IBot} from '../model/Bot'
import {ILocation} from '../model/Location'
const introspectionQueryResultData = require('./fragmentTypes.json')
import {PROFILE_PROPS, BOT_PROPS, NOTIFICATIONS_PROPS} from './constants'
import {
  convertProfile,
  convertBot,
  convertNotification,
  convertNotifications,
  generateWockyToken,
  waitFor,
} from './utils'
import uuid from 'uuid/v1'

export class GraphQLTransport implements IWockyTransport {
  userId?: string
  token?: string
  resource: string
  client?: ApolloClient<any>
  socket?: PhoenixSocket
  client2?: ApolloClient<any>
  socket2?: PhoenixSocket
  botGuestVisitorsSubscription?: ZenObservable.Subscription
  notificationsSubscription?: ZenObservable.Subscription
  @observable connected: boolean = false
  @observable connecting: boolean = false
  // @observable geoBot: any
  @observable message: any
  @observable notification: any
  @observable presence: any
  @observable rosterItem: any
  @observable botVisitor: any

  // TODO: when we finish removing XMPP we should remove these as class properties since they're only used in login
  version: string
  os: string
  deviceName: string

  // TODO: add
  constructor(resource: string, host: string, version: string, os: string, deviceName: string) {
    this.resource = resource
    this.version = version
    this.os = os
    this.deviceName = deviceName
    // TODO: extract this
    // this.host = 'testing.dev.tinyrobot.com'
    const socketEndpoint = process.env.WOCKY_LOCAL
      ? 'ws://localhost:8080/graphql'
      : `wss://${host}/graphql`

    this.socket = new PhoenixSocket(socketEndpoint, {
      reconnectAfterMs: () => 100000000, // disable auto-reconnect
      // uncomment to see all graphql messages!
      // logger: (kind, msg, data) => {
      //   if (msg !== 'close') {
      //     console.log('& socket:' + `${kind}: ${msg}`, JSON.stringify(data))
      //   } else {
      //     console.log('close')
      //   }
      // },
    })
    this.socket2 = new PhoenixSocket(socketEndpoint, {
      reconnectAfterMs: () => 100000000, // disable auto-reconnect
      // uncomment to see all graphql messages!
      // logger: (kind, msg, data) => {
      //   if (msg !== 'close') {
      //     console.log('& socket2:' + `${kind}: ${msg}`, JSON.stringify(data))
      //   } else {
      //     console.log('close2')
      //   }
      // },
    })
    const fragmentMatcher = new IntrospectionFragmentMatcher({
      introspectionQueryResultData,
    })
    const defaultOptions: any = {
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'ignore',
      },
    }
    this.client = new ApolloClient({
      link: createAbsintheSocketLink(AbsintheSocket.create(this.socket)),
      cache: new InMemoryCache({fragmentMatcher}),
      defaultOptions,
    })
    this.client2 = new ApolloClient({
      link: createAbsintheSocketLink(AbsintheSocket.create(this.socket2)),
      cache: new InMemoryCache({fragmentMatcher}),
      defaultOptions,
    })
    this.socket.onError(() => {
      // console.log('& graphql Phoenix socket error', err)
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
    this.socket2.onError(() => {
      // console.log('& graphql Phoenix socket error2')
    })
    this.socket2.onClose(() => {
      // console.log('& graphql Phoenix socket closed')
    })
  }

  // NOTE: we need to use a separate login (below) for GraphQL because it requires different parameters
  async login(): Promise<any> {
    throw new Error('not implemented')
  }

  async register(): Promise<{username: string; password: string; host: string}> {
    throw new Error('not implemented')
  }

  @action
  async loginGQL(params: LoginParams): Promise<{userId: string; token: string}> {
    const {userId, token} = params
    if (this.connecting) {
      // prevent duplicate login
      await waitFor(() => !this.connecting)
    } else {
      this.connecting = true
      this.userId = userId || uuid()
      this.token =
        token ||
        generateWockyToken({
          ...(params as any),
          userId: this.userId!,
          version: this.version,
          os: this.os,
          deviceName: this.deviceName,
        })
      const res = await this.authenticate()
      if (res) {
        this.subscribeBotVisitors()
      }
    }
    return {userId: this.userId!, token: this.token!}
  }

  @action
  async authenticate(): Promise<boolean> {
    try {
      const mutation = {
        mutation: gql`
          mutation authenticate($user: String!, $token: String!) {
            authenticate(input: {user: $user, token: $token}) {
              user {
                id
              }
            }
          }
        `,
        variables: {user: this.userId, token: this.token},
      }
      // authenticate both connections
      const res = await Promise.all([this.client!.mutate(mutation), this.client2!.mutate(mutation)])
      this.connected = res.reduce<boolean>(
        (accumulated, current) =>
          !!accumulated && !!current.data && current.data!.authenticate !== null,
        true
      )
      return this.connected
    } catch (err) {
      this.connected = false
      return false
    } finally {
      this.connecting = false
    }
  }

  async loadProfile(user: string): Promise<IProfilePartial | null> {
    const res = await this.client!.query<any>({
      query: gql`
          query LoadProfile {
            user(id: "${user}") {
              ${PROFILE_PROPS}
              ${
                user === this.userId
                  ? '... on CurrentUser { email phoneNumber hasUsedGeofence hidden {enabled expires} }'
                  : ''
              }
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
    // This is supported via the User.Contacts connection
    throw new Error('Not supported')
  }

  async generateId(): Promise<string> {
    const res = await this.client!.mutate({
      mutation: gql`
        mutation botCreate {
          botCreate {
            messages {
              field
              message
            }
            successful
            result {
              id
            }
          }
        }
      `,
    })
    return res.data!.botCreate!.result.id
  }
  async loadBot(id: string): Promise<any> {
    const res = await this.client!.query<any>({
      query: gql`
        query loadBot($id: String!, $ownUsername: String!){
          bot(id: $id) {
            ${BOT_PROPS}
          }
        }
      `,
      variables: {
        id,
        ownUsername: this.userId,
      },
    })
    return convertBot(res.data.bot)
  }

  async _loadBots(relationship: string, userId: string, after?: string, max: number = 10) {
    const res = await this.client!.query<any>({
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
      variables: {userId, after, max, ownUsername: this.userId, relationship},
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
    const res = await this.client!.query<any>({
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
    if (this.botGuestVisitorsSubscription) this.botGuestVisitorsSubscription.unsubscribe()
    this.botGuestVisitorsSubscription = undefined
  }
  subscribeBotVisitors() {
    if (this.botGuestVisitorsSubscription) {
      return
    }
    this.botGuestVisitorsSubscription = this.client!.subscribe({
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
        ownUsername: this.userId,
      },
    }).subscribe({
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

  async loadNotifications(params: {
    limit?: number
    beforeId?: string
    afterId?: string
  }): Promise<{list: any[]; count: number}> {
    const {limit, beforeId, afterId} = params
    // console.log('& gql load', beforeId, afterId, limit)
    const res = await this.client!.query<any>({
      query: gql`
        query notifications($first: Int, $last: Int, $beforeId: AInt, $afterId: AInt, $ownUsername: String!) {
          notifications(first: $first, last: $last, beforeId: $beforeId, afterId: $afterId) {
            totalCount
            edges {
              node {
                ${NOTIFICATIONS_PROPS}
              }
            }
          }
        }
      `,
      variables: {beforeId, afterId, first: limit || 20, ownUsername: this.userId},
    })
    // console.log('& gql res', JSON.stringify(res.data.notifications))
    if (res.data && res.data.notifications) {
      const {totalCount, edges} = res.data.notifications

      const list = convertNotifications(edges)!
      return {
        count: totalCount,
        list,
      }
    }
    return {count: 0, list: []}
  }

  subscribeNotifications() {
    if (this.notificationsSubscription) {
      return
    }
    this.notificationsSubscription = this.client!.subscribe({
      query: gql`
          subscription notifications($ownUsername: String!) {
            notifications {
              ${NOTIFICATIONS_PROPS}
            }
          }
        `,
      variables: {
        ownUsername: this.userId,
      },
    }).subscribe({
      next: action((result: any) => {
        this.notification = convertNotification({node: result.data.notifications})
      }),
    })
  }
  @action
  unsubscribeNotifications() {
    if (this.notificationsSubscription) this.notificationsSubscription.unsubscribe()
    this.notificationsSubscription = undefined
  }
  async loadOwnBots(id: string, lastId?: string, max: number = 10) {
    return await this._loadBots('OWNED', id, lastId, max)
  }
  async loadSubscribedBots(
    userId: string,
    lastId?: string,
    max: number = 10
  ): Promise<IPagingList> {
    return await this._loadBots('SUBSCRIBED_NOT_OWNED', userId, lastId, max)
  }
  async loadGeofenceBots(): Promise<IPagingList> {
    // load all guest bots
    const res = await this.client!.query<any>({
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
                  visitors: subscribers(first: 20, type: VISITOR) {
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
        ownUsername: this.userId,
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
    // This is supported via the Bot.Items connection
    throw new Error('Not supported')
  }
  shareBot() {
    throw new Error('Not supported')
  }
  async inviteBot(botId: string, userIds: string[]): Promise<void> {
    await this.client!.mutate({
      mutation: gql`
        mutation botInvite($input: BotInviteInput!) {
          botInvite(input: $input) {
            successful
            result {
              id
            }
            messages {
              message
            }
          }
        }
      `,
      variables: {input: {botId, userIds}},
    })
    // TODO: assert all invites sent successfully?
  }
  async inviteBotReply(
    invitationId: string,
    {latitude, longitude, accuracy},
    accept: boolean = true
  ) {
    await this.client!.mutate({
      mutation: gql`
        mutation botInvitationRespond($input: BotInvitationRespondInput!) {
          botInvitationRespond(input: $input) {
            successful
            result
            messages {
              message
              field
              code
            }
          }
        }
      `,
      variables: {
        input: {
          invitationId,
          accept,
          userLocation: {accuracy, lat: latitude, lon: longitude, resource: this.resource},
        },
      },
    })
    // TODO: handle error?
  }

  async testRegister(): Promise<{username: string; password: string; host: string}> {
    throw new Error('Not supported')
  }

  async disconnect(): Promise<void> {
    const sockets = [this.socket, this.socket2]
    this.connected = false
    this.connecting = false
    await Promise.all(sockets.map(this.disconnectSocket))
  }

  async requestProfiles(): Promise<any> {
    // This is supported through the User query
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
    const data: any = await this.client!.mutate({
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
    // This is now supported through the MediaUpload mutation
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
    // Supported via the BotSubscribe mutation
    throw new Error('Not supported')
  }

  async unsubscribeBot(): Promise<number> {
    // Supported via the BotUnsubscribe mutation
    throw new Error('Not supported')
  }

  async loadChats(): Promise<Array<{id: string; message: any}>> {
    // Assuming this is what we call "conversations" on the server, this
    // is avaialble via the CurrentUser.Conversations connection
    throw new Error('Not supported')
  }

  async removeBot(): Promise<void> {
    throw new Error('Not supported')
  }

  async removeBotPost(): Promise<void> {
    throw new Error('Not supported')
  }

  async updateBot(
    {
      id,
      address,
      addressData,
      description,
      icon,
      image,
      lat,
      lon,
      radius,
      server,
      shortname,
      title,
      type,
      visibility,
      ...bot
    }: any,
    userLocation: ILocation | undefined
  ): Promise<void> {
    const res = await this.client!.mutate({
      mutation: gql`
        mutation botUpdate(
          $id: String!
          $userLocation: UserLocationUpdateInput
          $values: BotParams
        ) {
          botUpdate(input: {id: $id, userLocation: $userLocation, values: $values}) {
            successful
            messages {
              message
              field
            }
          }
        }
      `,
      variables: {
        id,
        values: {
          address,
          addressData: JSON.stringify(addressData),
          description,
          icon,
          image,
          geofence: true,
          lat: bot.location.latitude,
          lon: bot.location.longitude,
          radius: Math.round(radius),
          server,
          shortname,
          title,
          type,
        },
        ...(userLocation
          ? {
              userLocation: {
                resource: this.resource,
                lon: userLocation.longitude,
                lat: userLocation.latitude,
                accuracy: userLocation.accuracy,
              },
            }
          : {}),
      },
    })
    if (!res.data!.botUpdate.successful) {
      throw new Error('Error during bot save')
    }
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
    // Available via the HomeStream subscription
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
    // Available through the CurrentUser.HomeStream connection
    throw new Error('Not supported')
  }
  async removeUpload(tros: string) {
    await this.client!.mutate({
      mutation: gql`
        mutation mediaDelete($tros: String!) {
          mediaDelete(input: {url: $tros}) {
            successful
          }
        }
      `,
      variables: {tros},
    })
  }
  async loadLocalBots({
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  }: {
    latitude: number
    longitude: number
    latitudeDelta: number
    longitudeDelta: number
  }): Promise<[IBot]> {
    if (latitudeDelta > 100 || longitudeDelta > 100) {
      return [] as any
    }
    const res = await this.client2!.query<any>({
      query: gql`
        query loadLocalBots($pointA: Point!, $pointB: Point!, $ownUsername: String!){
          localBots(pointA: $pointA, pointB: $pointB) {
            ${BOT_PROPS}
          }
        }
      `,
      variables: {
        pointA: {lat: latitude - latitudeDelta / 2, lon: longitude - longitudeDelta / 2},
        pointB: {lat: latitude + latitudeDelta / 2, lon: longitude + longitudeDelta / 2},
        ownUsername: this.userId,
      },
    })
    return res.data.localBots.map(convertBot)
  }

  async hideUser(enable: boolean, expire?: Date): Promise<void> {
    await this.client!.mutate({
      mutation: gql`
        mutation userHide($enable: Boolean!, $expire: DateTime) {
          userHide(input: {enable: $enable, expire: $expire}) {
            successful
          }
        }
      `,
      variables: {enable, expire},
    })
  }

  async searchUsers(text: string): Promise<IProfilePartial[]> {
    const res = await this.client!.query<any>({
      query: gql`
        query searchUsers($text: String!){
          users(limit: 20, searchTerm: $text) {
            ${PROFILE_PROPS}
          }
        }
      `,
      variables: {text},
    })
    return res.data.users.map(u => convertProfile(u))
  }

  async userInviteMakeCode(): Promise<string> {
    const res = await this.client!.mutate({
      mutation: gql`
        mutation userInviteMakeCode {
          userInviteMakeCode {
            result
            successful
          }
        }
      `,
    })
    return res.data!.userInviteMakeCode.result
  }

  async userInviteRedeemCode(code: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // need `when` because if code is redeemed immediately on an app load then `this.client` might be null
      when(
        () => this.connected,
        async () => {
          const res = await this.client!.mutate({
            mutation: gql`
              mutation userInviteRedeemCode($code: UserInviteRedeemCodeInput!) {
                userInviteRedeemCode(input: $code) {
                  successful
                }
              }
            `,
            variables: {code: {code}},
          })
          if (!res.data!.userInviteRedeemCode.successful) {
            reject(new Error('error redeeming invite code'))
          }
          resolve()
        }
      )
    })
  }

  private async getBotProfiles(
    relationship: 'SUBSCRIBER' | 'GUEST' | 'VISITOR',
    includeCurrentUser: boolean,
    id: string,
    lastId?: string,
    max: number = 10
  ): Promise<IPagingList> {
    const res = await this.client!.query<any>({
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

  private async disconnectSocket(socket?: PhoenixSocket): Promise<void> {
    if (socket && socket.isConnected()) {
      this.unsubscribeBotVisitors()
      this.unsubscribeNotifications()
      return new Promise<void>((resolve, reject) => {
        try {
          this.socket!.disconnect(resolve)
        } catch (err) {
          // console.log('& graphql disconnect err', err)
          reject(err)
        }
      })
    }
  }
}
