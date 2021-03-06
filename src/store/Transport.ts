import {ApolloClient, MutationOptions, QueryOptions, ApolloQueryResult} from 'apollo-client'
import {InMemoryCache, IntrospectionFragmentMatcher} from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import {IPagingList, MediaUploadParams} from './types'
import {observable, action, runInAction} from 'mobx'
import {create as createAbsintheSocket} from '@absinthe/socket'
import {createAbsintheSocketLink} from '@absinthe/socket-apollo-link'
import {Socket as PhoenixSocket} from 'phoenix'
import {IProfilePartial, FriendShareTypeEnum, IFriendShareConfig} from '../model/Profile'
import {ILocationSnapshot, IBotPost} from '../wocky'
import {IBot, IBotIn} from '../model/Bot'
import {ILocation} from '../model/Location'

const introspectionQueryResultData = require('./fragmentTypes.json')
const TIMEOUT = 10000
import {
  PROFILE_PROPS,
  BOT_PROPS,
  NOTIFICATIONS_PROPS,
  VOID_PROPS,
  BOT_POST_LIST_PROPS,
  MESSAGE_PROPS,
  AREA_TOO_LARGE,
  USER_LOCATION_PROPS,
  MEDIA_PROPS,
} from './constants'
import {
  convertProfile,
  convertBot,
  convertNotification,
  convertNotifications,
  convertBotPost,
  convertLocation,
  waitFor,
  convertMessage,
  iso8601toDate,
} from '../utils/utils'
import _ from 'lodash'
import {IBotPostIn} from '../model/BotPost'
import {OperationDefinitionNode} from 'graphql'
import {IMessageIn} from '../model/Message'
import {IEventData} from '../model/Event'
import {FetchResult} from 'apollo-link'
import {log} from '../utils/logger'

export type PaginableLoadType<T> = {list: T[]; count: number; cursor?: string}
export type PaginableLoadPromise<T> = Promise<PaginableLoadType<T>>

export class Transport {
  static instances = 0

  instance: number
  resource: string
  client?: ApolloClient<any>
  socket?: PhoenixSocket
  subscriptions: ZenObservable.Subscription[] = []
  username?: string
  token?: string
  host?: string

  @observable connected: boolean = false
  @observable connecting: boolean = false
  @observable message?: IMessageIn
  @observable notification: any
  @observable presence: any
  @observable sharedLocation: any
  @observable rosterItem: any
  @observable botVisitor: any

  constructor(resource: string) {
    this.resource = resource
    this.instance = Transport.instances++
  }

  @action
  async login(token: string, host: string): Promise<boolean> {
    this.host = host
    this.token = token
    if (this.connected) {
      // Already connected
      return this.connected
    }
    if (this.connecting) {
      // prevent duplicate login
      // console.log('WAITING FOR CONNECTING COMPLETE')
      await waitFor(() => !this.connecting)
      return this.connected
    }
    this.connecting = true
    // console.log('PREP CONNECTION')
    this.prepConnection()
    try {
      // console.log('START LOGIN')
      const res = await timeout(this.authenticate(token), TIMEOUT)
      if (res && this.client) {
        this.subscribeBotVisitors()
        this.subscribeNotifications()
        this.subscribeMessages()
        this.subscribeContacts()
        this.subscribePresence()
        this.subscribeSharedLocations()
      }
      return !!res
    } catch (e) {
      this.disconnect()
      e.token = token
      e.host = host
      throw e
    }
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
      // console.log('START AUTHENTICATE', new Date())
      const res = await this.client!.mutate(mutation)
      // console.log('COMPLETE AUTHENTICATE', new Date())
      // set the username based on what's returned in the mutation
      runInAction(() => (this.connected = (res.data as any).authenticate !== null))
      if (this.connected) {
        this.username = (res.data as any).authenticate.user.id
      }
      return this.connected
    } finally {
      this.connecting = false
    }
  }

  async loadProfile(id: string): Promise<IProfilePartial | null> {
    const res = await this.query({
      query: gql`
          query LoadProfile {
            user(id: "${id}") {
              ${PROFILE_PROPS}
              ${
                id === this.username
                  ? `... on CurrentUser { email phoneNumber fullAudit clientData
                  sentInvitations(first:100) {
                    edges {
                      node {
                        createdAt
                        recipient {
                          ${PROFILE_PROPS}
                        }
                      }
                    }
                  }
                  blocks(first:100) {
                    edges {
                      node {
                        createdAt
                        user {
                          firstName handle id lastName ${MEDIA_PROPS}
                        }
                      }
                    }
                  }
                  friends(first:100) {
                    edges {
                      shareTypes {
                        from
                        to
                      }
                      node {
                        shareConfig {
                          nearbyDistance
                          nearbyCooldown
                        }
                        shareType
                        createdAt
                        user {
                          ${PROFILE_PROPS}
                        }
                      }
                    }
                  }
                  receivedInvitations(first:100) {
                    edges {
                      node {
                        createdAt
                        sender {
                          ${PROFILE_PROPS}
                        }
                      }
                    }
                  }
                }`
                  : ''
              }
            }
          }
        `,
    })
    if (!res.data.user) {
      return null
    }
    const result: any = convertProfile(res.data.user)
    if (id === this.username) {
      result.receivedInvitations = res.data.user.receivedInvitations.edges.map(
        ({node: {createdAt, sender}}) => ({
          createdAt: iso8601toDate(createdAt).getTime(),
          user: convertProfile(sender),
        })
      )
      result.sentInvitations = res.data.user.sentInvitations.edges.map(
        ({node: {createdAt, recipient}}) => ({
          createdAt: iso8601toDate(createdAt).getTime(),
          user: convertProfile(recipient),
        })
      )
      result.friends = res.data.user.friends.edges.map(
        ({shareTypes: {from, to}, node: {user, shareConfig}}) =>
          convertProfile({
            ...user,
            ownShareType: from,
            shareType: to,
            shareConfig,
          })
      )

      result.blocked = res.data.user.blocks.edges.map(({node: {createdAt, user}}) => ({
        createdAt: iso8601toDate(createdAt).getTime(),
        user: convertProfile(user),
      }))
    }
    return result
  }

  async generateId(): Promise<string> {
    const res = await this.mutate({
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
    return (res.data as any).botCreate!.result.id
  }
  async loadBot(id: string): Promise<any> {
    const res = await this.query({
      query: gql`
        query loadBot($id: String!, $ownUsername: String!){
          bot(id: $id) {
            ${BOT_PROPS}
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
              ${BOT_POST_LIST_PROPS}
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

  async getLocationUploadToken(): Promise<string | null> {
    const res = await this.mutate({
      mutation: gql`
        mutation userLocationGetToken {
          userLocationGetToken {
            successful
            messages {
              message
            }
            result
          }
        }
      `,
    })
    return (res.data as any).userLocationGetToken!.result
  }

  async setLocation(params: ILocationSnapshot): Promise<void> {
    const input = convertLocation(params, this.resource)
    return this.voidMutation({
      mutation: gql`
        mutation userLocationUpdate(
          $input: UserLocationUpdateInput!
        ) {
          userLocationUpdate(
            input: $input
          ) {
            ${VOID_PROPS}
          }
        }
      `,
      variables: {input},
    })
  }

  async notificationDelete(id: string): Promise<void> {
    return this.voidMutation({
      mutation: gql`
        mutation notificationDelete($input: NotificationDeleteInput!) {
          notificationDelete(input: $input) {
            ${VOID_PROPS}            
          }
        }
      `,
      variables: {input: {id}},
    })
  }

  async loadNotifications(params: {
    limit?: number
    beforeId?: string
    afterId?: string
    types: string[] | undefined
  }): PaginableLoadPromise<IEventData> {
    const {limit, beforeId, afterId, types} = params
    // console.log('& gql load', beforeId, afterId, limit)
    const res = await this.query({
      query: gql`
        query notifications($first: Int, $last: Int, $beforeId: AInt, $afterId: AInt, $ownUsername: String!, $types: [NotificationType]) {
          notifications(first: $first, last: $last, beforeId: $beforeId, afterId: $afterId, types: $types) {
            totalCount
            edges {
              node {
                ${NOTIFICATIONS_PROPS}
              }
            }
          }
        }
      `,
      variables: {beforeId, afterId, first: limit || 20, ownUsername: this.username, types},
    })
    // console.log('& gql res', JSON.stringify(res.data.notifications))
    if (res.data && res.data.notifications) {
      const {totalCount, edges} = res.data.notifications

      const list = convertNotifications(edges)!
      return {
        count: totalCount,
        list,
      }
    } else {
      return {list: [], count: 0}
    }
  }
  async loadSubscribedBots(
    userId: string,
    lastId?: string,
    max: number = 10
  ): Promise<IPagingList<any>> {
    return await this.loadBots('SUBSCRIBED_NOT_OWNED', userId, lastId, max)
  }
  async query(options: QueryOptions<any>): Promise<ApolloQueryResult<any>> {
    if (!this.client) {
      if (!this.token) throw new Error('Token is not defined!')
      if (!this.host) throw new Error('Host is not defined!')
      await this.login(this.token!, this.host!)
    }
    await waitFor(() => this.connected)
    return this.client!.query(options)
  }
  async mutate(options: MutationOptions<any>): Promise<FetchResult> {
    if (!this.client) {
      if (!this.token) throw new Error('Token is not defined!')
      if (!this.host) throw new Error('Host is not defined!')
      await this.login(this.token!, this.host!)
    }
    await waitFor(() => this.connected)
    return this.client!.mutate(options)
  }
  async loadGeofenceBots(): PaginableLoadPromise<IBotIn> {
    // load all guest bots
    const res = await this.query({
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
  async loadBotVisitors(id: string, lastId?: string, max: number = 10): Promise<IPagingList<any>> {
    return this.getBotProfiles('VISITOR', true, id, lastId, max)
  }
  async loadBotPosts(
    id: string,
    lastId?: string,
    max: number = 10
  ): Promise<IPagingList<IBotPostIn> | null> {
    if (!this.client) {
      return null
    }
    const res = await this.query({
      query: gql`
        query loadBot($id: UUID!, $limit: Int, $cursor: String) {
          bot(id: $id) {
            items(after: $cursor, first: $limit) {
              ${BOT_POST_LIST_PROPS}
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
    await this.mutate({
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
  async inviteBotReply(invitationId: string, userLocation?: ILocation, accept: boolean = true) {
    await this.mutate({
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
          userLocation: userLocation ? convertLocation(userLocation, this.resource) : undefined,
        },
      },
    })
    // TODO: handle error?
  }

  @action
  async disconnect(): Promise<void> {
    this.connected = false
    this.connecting = false
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
    this.subscriptions = []
    if (this.socket && this.socket.isConnected()) {
      await this.socketDisconnect(this.socket)
    }
    this.socket = undefined
    this.client = undefined
  }

  async updateProfile(d: any): Promise<void> {
    const fields = ['handle', 'email', 'firstName', 'tagline', 'lastName', 'clientData']
    const values: any = {}
    fields.forEach(field => {
      if (d[field]) {
        values[field] = d[field]
      }
    })
    if (d.avatar) {
      values.imageUrl = d.avatar
    }
    if (d.clientData) {
      values.clientData = JSON.stringify(values.clientData)
    }

    const res = await this.mutate({
      mutation: gql`
        mutation userUpdate($values: UserParams!) {
          userUpdate(input: {values: $values}) {
            ${VOID_PROPS}            
          }
        }
      `,
      variables: {values},
    })
    if (!res.data!.userUpdate.successful) {
      throw {messages: res.data!.userUpdate.messages}
    }
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

  async downloadTROS(trosUrl: string): Promise<any> {
    await waitFor(() => this.connected)
    const res = await this.query({
      query: gql`
        query mediaUrls($trosUrl: String!) {
          mediaUrls(timeout: 10000, trosUrl: $trosUrl) {
            urls {
              type
              url
            }
          }
        }
      `,
      variables: {trosUrl},
    })
    const urls = res.data.mediaUrls.urls
    return {
      square: (urls.find(({type}) => type === 'THUMBNAIL') || {}).url,
      aspect: (urls.find(({type}) => type === 'ASPECT_THUMBNAIL') || {}).url,
    }
  }

  // This can throw errors (due to connectionCheck())
  async requestUpload({file, size, access}: MediaUploadParams): Promise<any> {
    this.connectionCheck()
    const res = await this.mutate({
      mutation: gql`
        mutation mediaUpload($input: MediaUploadParams!) {
          mediaUpload(input: $input) {
            messages {
              field
              message
            }
            successful
            result {
              id
              headers {
                name
                value
              }
              method
              referenceUrl
              uploadUrl
            }
          }
        }
      `,
      variables: {
        input: {access, size, mimeType: file.type, filename: file.name},
      },
    })
    const {headers, method, referenceUrl, uploadUrl} = (res.data as any).mediaUpload.result
    return {method, headers: {header: headers}, url: uploadUrl, reference_url: referenceUrl, file}
  }

  async friendInvite(
    userId: string,
    shareType: FriendShareTypeEnum = FriendShareTypeEnum.DISABLED
  ): Promise<void> {
    return this.voidMutation({
      mutation: gql`
        mutation friendInvite($input: FriendInviteInput!) {
          friendInvite(input: $input) {
            ${VOID_PROPS}            
          }
        }
      `,
      variables: {input: {userId, shareType}},
    })
  }

  async friendShareUpdate(
    userId: string,
    location?: ILocationSnapshot,
    shareType: FriendShareTypeEnum = FriendShareTypeEnum.DISABLED,
    shareConfig?: IFriendShareConfig
  ): Promise<void> {
    return this.voidMutation({
      mutation: gql`
        mutation friendShareUpdate($input: FriendShareUpdateInput!) {
          friendShareUpdate(input: $input) {
            messages {
              code
              field
              message
            }
            successful
            result {
              user {
                id
                handle
              }
              createdAt
              shareConfig {
                nearbyDistance
                nearbyCooldown
              }
              shareType
            }
          }
        }
      `,
      variables: {
        input: {
          userId,
          location: location ? convertLocation(location, this.resource) : undefined,
          shareType,
          shareConfig,
        },
      },
    })
  }

  async friendDelete(userId: string): Promise<void> {
    return this.voidMutation({
      mutation: gql`
        mutation friendDelete($input: FriendDeleteInput!) {
          friendDelete(input: $input) {
            ${VOID_PROPS}            
          }
        }
      `,
      variables: {input: {userId}},
    })
  }

  async block(userId: string): Promise<void> {
    await waitFor(() => this.connected)
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
    await waitFor(() => this.connected)
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

  async sendMessage(
    otherUserId: string,
    content?: string,
    imageUrl?: string,
    clientData?: any
  ): Promise<void> {
    return this.voidMutation({
      mutation: gql`
        mutation messageSend($input: MessageSendInput!) {
          messageSend(input: $input) {
            ${VOID_PROPS}
          }
        }
      `,
      variables: {
        input: {
          content,
          recipientId: otherUserId,
          imageUrl,
          clientData: JSON.stringify(clientData),
        },
      },
    })
  }

  async messageMarkRead(messageIds: number[]) {
    const messages = messageIds.map(id => ({id, read: true}))
    return this.voidMutation({
      mutation: gql`
        mutation messageMarkRead($input: MessageMarkReadInput!) {
          messageMarkRead(input: $input) {
            ${VOID_PROPS}
          }
        }
      `,
      variables: {
        input: {
          messages,
        },
      },
    })
  }

  async loadChatMessages(userId, lastId, max): PaginableLoadPromise<IMessageIn> {
    await waitFor(() => this.connected)
    const res = await this.query({
      query: gql`
          query loadChat($otherUser: UUID, $after: String, $first: Int) {
            currentUser {
              id
              messages(otherUser: $otherUser, after: $after, first: $first) {
                totalCount
                edges {
                  cursor
                  node {
                    ${MESSAGE_PROPS}
                  }
                }
              }
            }
          }
        `,
      variables: {otherUser: userId, first: max, after: lastId},
    })
    if (!res.data.currentUser.messages) {
      return {list: [], count: 0}
    }
    const {edges, totalCount} = res.data.currentUser.messages
    const messages = edges.map(e => convertMessage(e.node))
    return {
      list: messages,
      count: totalCount,
      cursor: edges.length ? edges[edges.length - 1].cursor : null,
    }
  }

  async loadChats(max: number = 50): Promise<Array<{chatId: string; message: IMessageIn}>> {
    await waitFor(() => this.connected)
    const res = await this.query({
      query: gql`
          query loadChats($max: Int) {
            currentUser {
              id
              conversations(first: $max) {
                totalCount
                edges {
                  cursor
                  node {
                    ${MESSAGE_PROPS}
                  }
                }
              }
            }
          }
        `,
      variables: {max},
    })

    return (res.data.currentUser.conversations.edges as any[]).map<{
      chatId: string
      message: IMessageIn
    }>(e => ({chatId: e.node.otherUser.id, message: convertMessage(e.node)}))
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
      shortname,
      title,
      type,
      visibility,
      ...bot
    }: any,
    userLocation?: ILocation
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
          imageUrl: image,
          lat: bot.location.latitude,
          lon: bot.location.longitude,
          radius: Math.round(radius),
          shortname,
          title,
          type,
        },
        userLocation: userLocation ? convertLocation(userLocation, this.resource) : undefined,
      },
    })
  }

  async publishBotPost(botId: string, post: IBotPost): Promise<void> {
    return this.voidMutation({
      mutation: gql`
        mutation botItemPublish($input: BotItemPublishInput!) {
          botItemPublish(input: $input) {
            ${VOID_PROPS}
          }
        }
      `,
      variables: {
        input: {
          botId,
          content: post.content,
          id: post.id,
          imageUrl: post.image && post.image.id,
        },
      },
    })
  }

  async enablePush(token: string, platform: 'FCM' | 'APNS'): Promise<void> {
    return this.voidMutation({
      mutation: gql`
        mutation pushNotificationsEnable($input: PushNotificationsEnableInput!) {
          pushNotificationsEnable(input: $input) {
            ${VOID_PROPS}
          }
        }
      `,
      variables: {input: {device: this.resource, token, platform}},
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
    const res = await this.query({
      query: gql`
        query loadLocalBots($pointA: Point!, $pointB: Point!, $ownUsername: String!){
          localBots(pointA: $pointA, pointB: $pointB) {
            areaTooLarge
            bots {
              ${BOT_PROPS}
            }
          }
        }
      `,
      variables: {
        pointA: {lat: latitude - latitudeDelta / 2, lon: longitude - longitudeDelta / 2},
        pointB: {lat: latitude + latitudeDelta / 2, lon: longitude + longitudeDelta / 2},
        ownUsername: this.username,
      },
    })
    if (res.data.localBots.areaTooLarge) {
      throw new Error(AREA_TOO_LARGE)
    }
    return res.data.localBots.bots.map(convertBot)
  }

  async searchUsers(text: string): Promise<IProfilePartial[]> {
    const res = await this.query({
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

  async userInviteRedeemCode(code: string, shareType?: FriendShareTypeEnum): Promise<void> {
    await waitFor(() => this.connected)
    return this.voidMutation({
      mutation: gql`
        mutation userInviteRedeemCode($input: UserInviteRedeemCodeInput!) {
          userInviteRedeemCode(input: $input) {
            ${VOID_PROPS}
          }
        }
      `,
      variables: {input: {code, shareType}},
    })
  }

  async userBulkLookup(phoneNumbers: string[]): Promise<any[]> {
    const res = await this.query({
      query: gql`
          query userBulkLookup($phoneNumbers: [String]!) {
            userBulkLookup(phoneNumbers: $phoneNumbers) {
              e164PhoneNumber
              phoneNumber
              user {
                ${PROFILE_PROPS}
              }
              relationship
            }
          }
        `,
      variables: {phoneNumbers},
    })
    if (res.errors) {
      throw new Error(typeof res.errors !== 'string' ? JSON.stringify(res.errors) : res.errors)
    }
    const results = res.data.userBulkLookup
    return results ? results.map(r => ({...r, user: r.user ? convertProfile(r.user) : null})) : []
  }

  async userInviteSend(phoneNumber: string, shareType: FriendShareTypeEnum): Promise<void> {
    return this.voidMutation({
      mutation: gql`
        mutation userInviteSend($input: UserInviteSendInput!) {
          userInviteSend(input: $input) {
            ${VOID_PROPS}
          }
        }
      `,
      variables: {input: {phoneNumber, shareType}},
    })
  }

  async setPresenceStatusOnline(online: boolean): Promise<void> {
    return this.voidMutation({
      mutation: gql`
        mutation presenceStatus(
          $status: PresenceStatus!
        ) {
          presenceStatus(
            input: {status: $status}
          ) {
            ${VOID_PROPS}
          }
        }
      `,
      variables: {status: online ? 'ONLINE' : 'OFFLINE'},
    })
  }

  async triggerSilentPush(userId: string) {
    return this.voidMutation({
      mutation: gql`
        mutation userLocationRequestTrigger(
          $userId: String!
        ) {
          userLocationRequestTrigger(
            input: {userId: $userId}
          ) {
            ${VOID_PROPS}
          }
        }
      `,
      variables: {userId},
    })
  }

  async userFullAudit(enable: boolean): Promise<boolean> {
    const res = await this.mutate({
      mutation: gql`
        mutation userFullAudit(
          $enable: Boolean!
        ) {
          userFullAudit(
            input: {enable: $enable}
          ) {
            ${VOID_PROPS}
          }
        }
      `,
      variables: {enable},
    })

    return (res.data as any).userFullAudit!.successful
  }

  async userInviteGetSender(code: string): Promise<IProfilePartial | null> {
    const res = await this.query({
      query: gql`
        query userInviteGetSender($code: String!) {
          userInviteGetSender(inviteCode: $code) {
            user {
              ${PROFILE_PROPS}
            }
            shareType
          }
        }
      `,
      variables: {code},
    })
    const potentialProfile = _.get(res, 'data.userInviteGetSender.user', null)
    if (potentialProfile) {
      const shareType = _.get(res, 'data.userInviteGetSender.shareType', null)
      return {...potentialProfile, ownShareType: shareType}
    }
    return null
  }

  async userInviteMakeUrl(_shareType: FriendShareTypeEnum): Promise<string> {
    // todo: add the shareType param to the mutation when it's ready on wocky
    const res = await this.client!.mutate({
      mutation: gql`
        mutation userInviteMakeUrl {
          userInviteMakeUrl {
            result
            successful
          }
        }
      `,
    })
    return res.data.userInviteMakeUrl.result
  }

  /******************************** SUBSCRIPTIONS ********************************/

  subscribeSharedLocations() {
    const subscription = this.client!.subscribe({
      query: gql`
        subscription sharedLocations {
          sharedLocations {
            user {
              id
            }
            location {
              ${USER_LOCATION_PROPS}
            }
          }
        }
      `,
    }).subscribe({
      next: action((result: any) => {
        const {
          user: {id},
          location,
        } = result.data.sharedLocations
        this.sharedLocation = {id, location}
      }),
    })
    this.subscriptions.push(subscription)
  }

  subscribePresence() {
    const subscription = this.client!.subscribe({
      query: gql`
        subscription presence {
          presence {
            id
            presence {
              status
              updatedAt
            }
          }
        }
      `,
    }).subscribe({
      next: action((result: any) => {
        this.presence = {
          id: result.data.presence.id,
          status: result.data.presence.presence.status,
          statusUpdatedAt: new Date(result.data.presence.presence.updatedAt),
        }
      }),
    })
    this.subscriptions.push(subscription)
  }

  private subscribeNotifications() {
    const subscription = this.client!.subscribe({
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
        // console.log(
        //   'NOTIFICATION: ',
        //   JSON.stringify(result.data.notifications),
        //   JSON.stringify(this.notification)
        // )
      }),
    })
    this.subscriptions.push(subscription)
  }

  private subscribeContacts() {
    const subscription = this.client!.subscribe({
      query: gql`
        subscription subscribeContacts {
          contacts {
            relationship
            shareType
            user {
              id
              roles
              firstName
              lastName
              handle
              presence {
                status
                updatedAt
              }
              ${MEDIA_PROPS}
            }
          }
        }
      `,
    }).subscribe({
      next: action((result: any) => {
        const {user, relationship, shareType} = result.data.contacts
        // console.log('ROSTER ITEM: ', JSON.stringify(result.data.contacts))
        this.rosterItem = {
          user: convertProfile({...user, ownShareType: shareType}),
          relationship,
        }
      }),
    })
    this.subscriptions.push(subscription)
  }

  private subscribeBotVisitors() {
    const subscription = this.client!.subscribe({
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
              updatedAt
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
          bot: convertBot({...update.bot, _accessedAt: new Date(update.updatedAt).getTime()}),
          action: update.action,
        }
      }),
    })
    this.subscriptions.push(subscription)
  }

  private subscribeMessages() {
    const subscription = this.client!.subscribe({
      query: gql`
        subscription messages {
          messages {
            ${MESSAGE_PROPS}
          }
        }
      `,
    }).subscribe({
      next: action((result: any) => (this.message = convertMessage(result.data.messages))),
    })
    this.subscriptions.push(subscription)
  }

  /******************************** END SUBSCRIPTIONS ********************************/

  private async loadBots(relationship: string, userId: string, after?: string, max: number = 10) {
    const res = await this.query({
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
    let name: string = '',
      res: any
    // todo: use the name as defined by the Wocky mutation (not the name given to the wrapper)
    name = (mutation.definitions[0] as OperationDefinitionNode).name!.value
    res = await this.mutate({mutation, variables})
    if (res.data && !res.data![name].successful) {
      // console.error('voidMutation error with ', name, JSON.stringify(res.data[name]))
      throw new Error(`GraphQL ${name} error: ${JSON.stringify(res.data![name])}`)
    }
  }

  private async getBotProfiles(
    relationship: 'SUBSCRIBER' | 'VISITOR',
    includeCurrentUser: boolean,
    id: string,
    lastId?: string,
    max: number = 10
  ): Promise<IPagingList<any>> {
    const res = await this.query({
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
    if (this.client) {
      return
    }
    this.socket = this.makeSocket()
    this.client = this.makeClient(this.socket)
  }

  private connectionCheck() {
    if (!this.client || !this.connected) {
      throw new Error('Client is not connected')
    }
  }

  private makeSocket() {
    const socketEndpoint = process.env.WOCKY_LOCAL
      ? 'ws://localhost:8080/graphql'
      : `wss://${this.host}/graphql`

    // uncomment to see all graphql messages!
    // process.env.WOCKY_VERBOSE = '1'

    const socket = new PhoenixSocket(socketEndpoint, {
      reconnectAfterMs: () => 100000000, // disable auto-reconnect
      logger: process.env.WOCKY_VERBOSE
        ? (kind, msg, data) => {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value#Examples
            // const getCircularReplacer = () => {
            //   const seen = new WeakSet()
            //   return (key, value) => {
            //     // if (typeof value === 'object' && value !== null) {
            //     //   if (seen.has(value)) {
            //     //     return
            //     //   }
            //     //   seen.add(value)
            //     // }
            //     return value
            //   }
            // }

            log(
              `${new Date().toISOString()} | socket(${
                this.instance
              }):${kind} | ${msg} | ${JSON.stringify(data)}`
            )
          }
        : undefined,
    })
    socket.onError(err => {
      // console.warn('& graphql Phoenix socket error', err)
      this.disconnect()
    })
    socket.onClose(() => {
      // console.log('& graphql Phoenix socket closed')
      this.disconnect()
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
        // errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'network-only',
        // errorPolicy: 'ignore',
      },
    }
    return new ApolloClient({
      link: createAbsintheSocketLink(createAbsintheSocket(socket)),
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

// let i = 0
function timeout(promise: Promise<any>, timeoutMillis: number) {
  let _timeout: any
  // i++
  // console.log('START: ', i, new Date())
  return Promise.race([
    promise,
    new Promise((_0, reject) => {
      _timeout = setTimeout(() => {
        // console.log('TIMEOUT: ', i, new Date())
        reject('Operation timed out!')
      }, timeoutMillis)
    }),
  ]).then(
    v => {
      clearTimeout(_timeout)
      return v
    },
    err => {
      clearTimeout(_timeout)
      throw err
    }
  )
}
