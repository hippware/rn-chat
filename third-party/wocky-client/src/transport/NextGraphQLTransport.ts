import {ApolloClient, MutationOptions} from 'apollo-client'
import {InMemoryCache, IntrospectionFragmentMatcher} from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import {IWockyTransport, IPagingList, LoginParams} from './IWockyTransport'
import {observable, action} from 'mobx'
import * as AbsintheSocket from '@absinthe/socket'
import {createAbsintheSocketLink} from '@absinthe/socket-apollo-link'
import {Socket as PhoenixSocket} from 'phoenix'
import {IProfilePartial} from '../model/Profile'
import {ILocationSnapshot, IBotPost, IMessage} from '..'
import {IBot} from '../model/Bot'
import {ILocation} from '../model/Location'
const introspectionQueryResultData = require('./fragmentTypes.json')
import {PROFILE_PROPS, BOT_PROPS, NOTIFICATIONS_PROPS, VOID_PROPS} from './constants'
import {
  convertProfile,
  convertBot,
  convertNotification,
  convertNotifications,
  generateWockyToken,
  processRosterItem,
  convertBotPost,
  convertLocation,
  waitFor,
} from './utils'
import _ from 'lodash'
import uuid from 'uuid/v1'
import {IBotPostData} from '../model/BotPost'
import {OperationDefinitionNode} from 'graphql'

export class NextGraphQLTransport implements IWockyTransport {
  resource: string
  clients?: [ApolloClient<any>, ApolloClient<any>]
  sockets?: [PhoenixSocket, PhoenixSocket]
  botGuestVisitorsSubscription?: ZenObservable.Subscription
  contactsSubscription?: ZenObservable.Subscription
  notificationsSubscription?: ZenObservable.Subscription
  @observable connected: boolean = false
  @observable connecting: boolean = false
  username?: string
  password?: string
  token?: string
  host?: string
  // @observable geoBot: any
  @observable message: any

  // TODO: reuse `notification` or create new property specific to GraphQL?
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
      await waitFor(() => !this.connecting)
      return this.connected
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
    this.prepConnection()

    if (!this.password) {
      throw new Error('Password is not defined')
    }

    const res = await this.authenticate(this.password)

    if (res) {
      this.subscribeBotVisitors()
    }
    return res
  }

  @action
  async authenticate(token: string): Promise<boolean> {
    try {
      const mutation = {
        mutation: gql`
          mutation authenticate($token: String!) {
            authenticate(input: {token: $token}) {
              user {
                id
              }
            }
          }
        `,
        variables: {token},
      }
      const res = await Promise.all([
        this.clients![0].mutate(mutation),
        this.clients![1].mutate(mutation),
      ])
      // set the username based on what's returned in the mutation
      this.username = (res[0] as any).data.authenticate.user.id
      this.connected = res.reduce<boolean>(
        (accumulated: boolean, current) => accumulated && current.data!.authenticate !== null,
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
    const res = await this.clients![0].query<any>({
      query: gql`
          query LoadProfile {
            user(id: "${user}") {
              ${PROFILE_PROPS}
              ${
                user === this.username
                  ? `... on CurrentUser { email phoneNumber hasUsedGeofence hidden {enabled expires} }`
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
  async requestRoster(): Promise<any[]> {
    const res = await this.clients![0].query<any>({
      query: gql`
        query requestRoster {
          currentUser {
            id
            contacts(first: 100) {
              edges {
                relationship
                createdAt
                node {
                  id
                  roles
                  firstName
                  lastName
                  handle
                  avatar {
                    thumbnailUrl
                    trosUrl
                  }
                }
              }
            }
          }
        }
      `,
    })
    this.subscribeContacts() // subscribe to contacts changes
    return res.data.currentUser.contacts.edges.map(({relationship, createdAt, node}) =>
      processRosterItem(node, relationship, createdAt)
    )
  }

  async generateId(): Promise<string> {
    const res = await this.clients![0].mutate({
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
    const res = await this.clients![0].query<any>({
      query: gql`
        query loadBot($id: String!, $ownUsername: String!){
          bot(id: $id) {
            ${BOT_PROPS}
            guests: subscribers(first: 10, type: SUBSCRIBER) {
              totalCount
              edges {
                cursor
                node {
                  ${PROFILE_PROPS}
                }
              }
            }
            visitors: subscribers(first: 10, type: VISITOR) {
              totalCount
              edges {
                cursor
                node {
                  ${PROFILE_PROPS}
                }
              }
            }
            posts: items(first: 10) {
              totalCount
              edges {
                cursor
                node {
                  id
                  stanza
                  media {
                    fullUrl
                    thumbnailUrl
                    trosUrl
                  }
                  owner {
                    ${PROFILE_PROPS}
                  }
                }
              }
            }

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

  async setLocation(params: ILocationSnapshot): Promise<void> {
    return this.voidMutation({
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
            ${VOID_PROPS}
          }
        }
      `,
      variables: {...params, resource: this.resource},
    })
  }
  async getLocationsVisited(limit: number = 50): Promise<object[]> {
    const res = await this.clients![0].query<any>({
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
    this.botGuestVisitorsSubscription = this.clients![0].subscribe({
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

  unsubscribeContacts() {
    if (this.contactsSubscription) this.contactsSubscription.unsubscribe()
    this.contactsSubscription = undefined
  }
  subscribeContacts() {
    if (this.contactsSubscription) {
      return
    }
    this.contactsSubscription = this.clients![0].subscribe({
      query: gql`
        subscription subscribeContacts {
          contacts {
            createdAt
            relationship
            user {
              id
              roles
              firstName
              lastName
              handle
              avatar {
                thumbnailUrl
                trosUrl
              }
            }
          }
        }
      `,
    }).subscribe({
      next: action((result: any) => {
        const {user, relationship, createdAt} = result.data.contacts
        this.rosterItem = processRosterItem(user, relationship, createdAt)
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
    const res = await this.clients![0].query<any>({
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
      variables: {beforeId, afterId, first: limit || 20, ownUsername: this.username},
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
    this.notificationsSubscription = this.clients![0].subscribe({
      query: gql`
          subscription notifications($ownUsername: String!) {
            notifications {
              ${NOTIFICATIONS_PROPS}
            }
          }
        `,
      variables: {
        ownUsername: this.username,
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
    return await this.loadBots('OWNED', id, lastId, max)
  }
  async loadSubscribedBots(
    userId: string,
    lastId?: string,
    max: number = 10
  ): Promise<IPagingList<any>> {
    return await this.loadBots('SUBSCRIBED_NOT_OWNED', userId, lastId, max)
  }
  async loadGeofenceBots(): Promise<IPagingList<any>> {
    // load all guest bots
    const res = await this.clients![0].query<any>({
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

  async loadBotSubscribers(
    id: string,
    lastId?: string,
    max: number = 10
  ): Promise<IPagingList<any>> {
    return this.getBotProfiles('SUBSCRIBER', false, id, lastId, max)
  }
  async loadBotGuests(id: string, lastId?: string, max: number = 10): Promise<IPagingList<any>> {
    return this.getBotProfiles('GUEST', true, id, lastId, max)
  }
  async loadBotVisitors(id: string, lastId?: string, max: number = 10): Promise<IPagingList<any>> {
    return this.getBotProfiles('VISITOR', true, id, lastId, max)
  }
  async loadBotPosts(
    id: string,
    lastId?: string,
    max: number = 10
  ): Promise<IPagingList<IBotPostData>> {
    const res = await this.clients![0].query<any>({
      query: gql`
        query loadBot($id: UUID!, $limit: Int, $cursor: String) {
          bot(id: $id) {
            items(after: $cursor, first: $limit) {
              totalCount
              edges {
                cursor
                node {
                  id
                  stanza
                  media {
                    fullUrl
                    thumbnailUrl
                    trosUrl
                  }
                  owner {
                    ${PROFILE_PROPS}
                  }
                }
              }
            }
          }
        }
      `,
      variables: {id, limit: max, cursor: lastId},
    })
    const {totalCount, edges} = res.data.bot.items
    return {
      count: totalCount,
      cursor: edges.length ? edges[edges.length - 1].cursor : null,
      list: edges.map(convertBotPost),
    }
  }
  async inviteBot(botId: string, userIds: string[]): Promise<void> {
    await this.clients![0].mutate({
      mutation: gql`
        mutation botInvite($input: BotInviteInput!) {
          botInvite(input: $input) {
            ${VOID_PROPS}
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
    await this.clients![0].mutate({
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
          userLocation: {accuracy, lat: latitude, lon: longitude, device: this.resource},
        },
      },
    })
    // TODO: handle error?
  }

  @action
  async register(
    data: LoginParams,
    host?: string
  ): Promise<{username?: string; password: string; host?: string}> {
    const {token, accessToken, version, os, deviceName, phoneNumber} = data
    if (host) {
      this.host = host
    }
    this.prepConnection()
    const password =
      token ||
      generateWockyToken({
        phoneNumber,
        accessToken,
        // NOTE: the uuid generated below may be different from what's returned in the `authenticate` mutation
        userId: this.username || uuid(),
        version: version!,
        os: os!,
        deviceName: deviceName!,
        deviceId: this.resource,
      })
    return {password}
  }

  async testRegister(): Promise<{username: string; password: string; host: string}> {
    throw new Error('Not supported')
  }

  async disconnect(): Promise<void> {
    this.connected = false
    this.connecting = false
    if (this.sockets) {
      await Promise.all(
        this.sockets.map(socket => {
          if (socket.isConnected()) {
            this.unsubscribeContacts()
            this.unsubscribeBotVisitors()
            this.unsubscribeNotifications()
            return this.socketDisconnect(socket)
          }
        })
      )
    }
    this.sockets = undefined
    this.clients = undefined
  }

  async updateProfile(d: any): Promise<void> {
    const fields = ['avatar', 'handle', 'email', 'firstName', 'tagline', 'lastName']
    const values = {}
    fields.forEach(field => {
      if (d[field]) {
        values[field] = d[field]
      }
    })
    return this.voidMutation({
      mutation: gql`
        mutation userUpdate($values: UserParams!) {
          userUpdate(input: {values: $values}) {
            ${VOID_PROPS}            
          }
        }
      `,
      variables: {values},
    })
  }

  async remove(): Promise<void> {
    await this.voidMutation({
      mutation: gql`
        mutation userDelete {
          userDelete {
            ${VOID_PROPS}            
          }
        }
      `,
    })
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

  async follow(userId: string): Promise<void> {
    return this.voidMutation({
      mutation: gql`
        mutation follow($input: FollowInput!) {
          follow(input: $input) {
            ${VOID_PROPS}            
          }
        }
      `,
      variables: {input: {userId}},
    })
  }

  async unfollow(userId: string): Promise<void> {
    return this.voidMutation({
      mutation: gql`
        mutation unfollow($input: UnfollowInput!) {
          unfollow(input: $input) {
            ${VOID_PROPS}            
          }
        }
      `,
      variables: {input: {userId}},
    })
  }

  async block(userId: string): Promise<void> {
    return this.voidMutation({
      mutation: gql`
        mutation userBlock($input: UserBlockInput!) {
          userBlock(input: $input) {
            ${VOID_PROPS}
          }
        }
      `,
      variables: {input: {userId}},
    })
  }

  async unblock(userId: string): Promise<void> {
    return this.voidMutation({
      mutation: gql`
        mutation userUnblock($input: UserUnblockInput!) {
          userUnblock(input: $input) {
            ${VOID_PROPS}
          }
        }
      `,
      variables: {input: {userId}},
    })
  }

  async unsubscribeBot(id: string): Promise<void> {
    return this.voidMutation({
      mutation: gql`
        mutation botUnsubscribe($input: BotUnsubscribeInput!) {
          botUnsubscribe(input: $input) {
            ${VOID_PROPS}
          }
        }
      `,
      variables: {
        input: {id},
      },
    })
  }

  async sendMessage({to, body}: IMessage): Promise<void> {
    return this.voidMutation({
      mutation: gql`
        mutation sendMessage($input: SendMessageInput!) {
          sendMessage(input: $input) {
            ${VOID_PROPS}
          }
        }
      `,
      variables: {
        input: {message: body, recipientId: to},
      },
    })
  }

  async loadChat(): Promise<void> {
    throw new Error('Not supported')
  }

  async loadChats(max: number = 50): Promise<Array<{id: string; message: any}>> {
    return [{id: '1', message: 'hello'}]
  }

  async removeBot(botId: string): Promise<void> {
    return this.voidMutation({
      mutation: gql`
        mutation botDelete($input: BotDeleteInput!) {
          botDelete(input: $input) {
            ${VOID_PROPS}
          }
        }
      `,
      variables: {input: {id: botId}},
    })
  }

  async removeBotPost(botId: string, postId: string): Promise<void> {
    return this.voidMutation({
      mutation: gql`
        mutation botItemDelete($input: BotItemDeleteInput!) {
          botItemDelete(input: $input) {
            ${VOID_PROPS}
          }
        }
      `,
      variables: {input: {botId, id: postId}},
    })
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
    return this.voidMutation({
      mutation: gql`
        mutation botUpdate(
          $id: String!
          $userLocation: UserLocationUpdateInput
          $values: BotParams
        ) {
          botUpdate(input: {id: $id, userLocation: $userLocation, values: $values}) {
            ${VOID_PROPS}
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
        userLocation: userLocation ? convertLocation(userLocation, this.resource) : {},
      },
    })
  }

  async loadRelations(
    userId: string,
    // TODO: use more specific typing when we can change IWockyTransport
    // relation: 'FOLLOWER' | 'FOLLOWING' | 'FRIEND' | 'NONE' = 'FOLLOWING',
    relation: string = 'FOLLOWING',
    lastId?: string,
    max: number = 10
  ): Promise<IPagingList<any>> {
    // TODO: remove this after IWockyTransport change
    relation = relation.toUpperCase()
    const res = await this.clients![0].query<any>({
      query: gql`
        query user($userId: UUID!, $relation: UserContactRelationship, $lastId: String, $max: Int) {
          user(id: $userId) {
            id
            contacts(first: $max, relationship: $relation, after: $lastId) {
              totalCount
              edges {
                relationship
                createdAt
                node {
                  id
                  roles
                  firstName
                  lastName
                  handle
                  avatar {
                    thumbnailUrl
                    trosUrl
                  }
                }
              }
            }
          }
        }
      `,
      variables: {userId, relation, lastId, max},
    })
    const {totalCount, edges} = res.data.user!.contacts
    const list = edges.map(e => convertProfile(e.node))
    return {list, count: totalCount}
  }

  async publishBotPost(botId: string, post: IBotPost): Promise<void> {
    // TODO add post.image support?
    return this.voidMutation({
      mutation: gql`
        mutation botItemPublish($botId: UUID!, $values: BotItemParams!) {
          botItemPublish(input: {botId: $botId, values: $values}) {
            ${VOID_PROPS}
          }
        }
      `,
      variables: {
        botId,
        values: {
          id: post.id,
          stanza: post.content,
        },
      },
    })
  }

  async enablePush(token: string): Promise<void> {
    return this.voidMutation({
      mutation: gql`
        mutation pushNotificationsEnable($input: PushNotificationsEnableInput!) {
          pushNotificationsEnable(input: $input) {
            ${VOID_PROPS}
          }
        }
      `,
      variables: {input: {device: this.resource, token}},
    })
  }

  async disablePush(): Promise<void> {
    return this.voidMutation({
      mutation: gql`
        mutation pushNotificationsDisable($input: PushNotificationsDisableInput!) {
          pushNotificationsDisable(input: $input) {
            ${VOID_PROPS}
          }
        }
      `,
      variables: {input: {device: this.resource}},
    })
  }

  async removeUpload(tros: string): Promise<void> {
    return this.voidMutation({
      mutation: gql`
        mutation mediaDelete($tros: String!) {
          mediaDelete(input: {url: $tros}) {
            ${VOID_PROPS}
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
    const res = await this.clients![1].query<any>({
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
        ownUsername: this.username,
      },
    })
    return res.data.localBots.map(convertBot)
  }

  async hideUser(enable: boolean, expire?: Date): Promise<void> {
    return this.voidMutation({
      mutation: gql`
        mutation userHide($enable: Boolean!, $expire: DateTime) {
          userHide(input: {enable: $enable, expire: $expire}) {
            ${VOID_PROPS}
          }
        }
      `,
      variables: {enable, expire},
    })
  }

  async searchUsers(text: string): Promise<IProfilePartial[]> {
    const res = await this.clients![0].query<any>({
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
    const res = await this.clients![0].mutate({
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
    await waitFor(() => this.connected)
    return this.voidMutation({
      mutation: gql`
        mutation userInviteRedeemCode($code: UserInviteRedeemCodeInput!) {
          userInviteRedeemCode(input: $code) {
            ${VOID_PROPS}
          }
        }
      `,
      variables: {code: {code}},
    })
  }

  private async loadBots(relationship: string, userId: string, after?: string, max: number = 10) {
    const res = await this.clients![0].query<any>({
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

  /**
   * Reduce boilerplate for pass/fail gql mutations.
   */
  private async voidMutation({mutation, variables}: MutationOptions): Promise<void> {
    const name = (mutation.definitions[0] as OperationDefinitionNode).name!.value
    const res = await this.clients![0].mutate({mutation, variables})
    if (res.data && !res.data![name].successful) {
      // console.error('voidMutation error with ', name, JSON.stringify(res.data[name]))
      throw new Error(`GraphQL ${name} error: ${JSON.stringify(res.data![name])}`)
    }
  }

  private async getBotProfiles(
    relationship: 'SUBSCRIBER' | 'GUEST' | 'VISITOR',
    includeCurrentUser: boolean,
    id: string,
    lastId?: string,
    max: number = 10
  ): Promise<IPagingList<any>> {
    const res = await this.clients![0].query<any>({
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

  private prepConnection() {
    if (this.clients) {
      return
    }
    this.sockets = [this.makeSocket(), this.makeSocket()]
    this.clients = [this.makeClient(this.sockets[0]), this.makeClient(this.sockets[1])]
  }

  private makeSocket() {
    const socketEndpoint = process.env.WOCKY_LOCAL
      ? 'ws://localhost:8080/graphql'
      : `wss://${this.host}/graphql`
    const socket = new PhoenixSocket(socketEndpoint, {
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
    socket.onError(() => {
      // console.log('& graphql Phoenix socket error', err)
      this.connected = false
    })
    socket.onClose(() => {
      // console.log('& graphql Phoenix socket closed')
      this.connected = false
    })
    socket.onOpen(() => {
      // console.log('& graphql open')
    })
    return socket
  }

  private makeClient(socket) {
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
    return new ApolloClient({
      link: createAbsintheSocketLink(AbsintheSocket.create(socket)),
      cache: new InMemoryCache({fragmentMatcher}),
      defaultOptions,
    })
  }

  private async socketDisconnect(socket) {
    return new Promise<void>((resolve, reject) => {
      try {
        socket.disconnect(() => {
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
