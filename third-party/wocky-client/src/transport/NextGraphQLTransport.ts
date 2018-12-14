import {ApolloClient, MutationOptions} from 'apollo-client'
import {InMemoryCache, IntrospectionFragmentMatcher} from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import {IWockyTransport, IPagingList} from './IWockyTransport'
import {observable, action, runInAction} from 'mobx'
import * as AbsintheSocket from '@absinthe/socket'
import {createAbsintheSocketLink} from '@absinthe/socket-apollo-link'
import {Socket as PhoenixSocket} from 'phoenix'
import {IProfilePartial} from '../model/Profile'
import {ILocationSnapshot, IBotPost, IMessage} from '..'
import {IBot} from '../model/Bot'
import {ILocation} from '../model/Location'
const introspectionQueryResultData = require('./fragmentTypes.json')
import {
  PROFILE_PROPS,
  BOT_PROPS,
  NOTIFICATIONS_PROPS,
  VOID_PROPS,
  BOT_POST_LIST_PROPS,
  MESSAGE_PROPS,
  AREA_TOO_LARGE,
} from './constants'
import {
  convertProfile,
  convertBot,
  convertNotification,
  convertNotifications,
  processRosterItem,
  convertBotPost,
  convertLocation,
  waitFor,
  convertMessage,
} from './utils'
import _ from 'lodash'
import {IBotPostIn} from '../model/BotPost'
import {OperationDefinitionNode} from 'graphql'
import {IMessageIn} from '../model/Message'

export class NextGraphQLTransport implements IWockyTransport {
  resource: string
  client?: ApolloClient<any>
  socket?: PhoenixSocket
  subscriptions: ZenObservable.Subscription[] = []
  username?: string
  password?: string
  token?: string
  host?: string

  @observable connected: boolean = false
  @observable connecting: boolean = false
  @observable message?: IMessageIn
  @observable notification: any
  @observable presence: any
  @observable rosterItem: any
  @observable botVisitor: any

  constructor(resource: string) {
    this.resource = resource
  }

  @action
  async login(token: string, host: string): Promise<boolean> {
    this.host = host
    if (this.connecting) {
      // prevent duplicate login
      await waitFor(() => !this.connecting)
      return this.connected
    }
    this.connecting = true
    this.prepConnection()
    const res = await this.authenticate(token)

    if (res) {
      this.subscribeBotVisitors()
      this.subscribeNotifications()
      this.subscribeMessages()
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
      const res = await this.client!.mutate(mutation)
      // set the username based on what's returned in the mutation
      this.connected = res.data!.authenticate !== null
      if (this.connected) {
        this.username = res.data!.authenticate.user.id
      }
      return this.connected
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
    const res = await this.client!.query<any>({
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
                  media {
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

  async getLocationUploadToken(): Promise<string> {
    const res = await this.client!.mutate({
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
    return res.data!.userLocationGetToken!.result
  }

  async setLocation(params: ILocationSnapshot): Promise<void> {
    return this.voidMutation({
      mutation: gql`
        mutation userLocationUpdate(
          $latitude: Float!
          $longitude: Float!
          $accuracy: Float!
          $device: String!
        ) {
          userLocationUpdate(
            input: {accuracy: $accuracy, lat: $latitude, lon: $longitude, device: $device}
          ) {
            ${VOID_PROPS}
          }
        }
      `,
      variables: {...params, device: this.resource},
    })
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
  ): Promise<IPagingList<IBotPostIn>> {
    const res = await this.client!.query<any>({
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
    await this.client!.mutate({
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
          userLocation: {accuracy, lat: latitude, lon: longitude, device: this.resource},
        },
      },
    })
    // TODO: handle error?
  }

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
    const fields = ['handle', 'email', 'firstName', 'tagline', 'lastName']
    const values: any = {}
    fields.forEach(field => {
      if (d[field]) {
        values[field] = d[field]
      }
    })
    if (d.avatar) {
      values.imageUrl = d.avatar
    }

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

  async requestUpload({file, size, access}: any): Promise<any> {
    const res = await this.client!.mutate({
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
        input: {access, size, mimeType: file!.type, filename: file!.name},
      },
    })
    const {headers, method, referenceUrl, uploadUrl} = res.data!.mediaUpload.result
    return {method, headers: {header: headers}, url: uploadUrl, reference_url: referenceUrl, file}
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
        // TODO: add imageURL
        input: {content: body, recipientId: to!.id},
      },
    })
  }

  async loadChat(userId, lastId, max): Promise<void> {
    const res = await this.client!.query<any>({
      query: gql`
          query loadChat($otherUser: UUID, $after: String, $first: Int) {
            currentUser {
              id
              messages(otherUser: $otherUser, after: $after, first: $first) {
                totalCount
                edges {
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
    res.data.currentUser.messages.edges.forEach(e => {
      runInAction(() => (this.message = convertMessage(e.node, this.username!)))
    })
  }

  async loadChats(max: number = 50): Promise<Array<{chatId: string; message: IMessageIn}>> {
    const res = await this.client!.query<any>({
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
    }>(e => ({chatId: e.node.otherUser.id, message: convertMessage(e.node, this.username!)}))
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
          imageUrl: image,
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
    const res = await this.client!.query<any>({
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
                  media {
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
          imageUrl: post.image && post.image.url,
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
    const res = await this.client!.query<any>({
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

  /******************************** SUBSCRIPTIONS ********************************/

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
      }),
    })
    this.subscriptions.push(subscription)
  }

  private subscribeContacts() {
    const subscription = this.client!.subscribe({
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
              media {
                thumbnailUrl
                trosUrl
              }
            }
          }
        }
      `,
    }).subscribe({
      next: action((result: any) => {
        // console.log('& contact', result)
        const {user, relationship, createdAt} = result.data.contacts
        this.rosterItem = processRosterItem(user, relationship, createdAt)
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
      next: action((result: any) => {
        this.message = convertMessage(result.data.messages, this.username!)
      }),
    })
    this.subscriptions.push(subscription)
  }

  /******************************** END SUBSCRIPTIONS ********************************/

  private async loadBots(relationship: string, userId: string, after?: string, max: number = 10) {
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
    // todo: use the name as defined by the Wocky mutation (not the name given to the wrapper)
    const name = (mutation.definitions[0] as OperationDefinitionNode).name!.value
    const res = await this.client!.mutate({mutation, variables})
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

  private prepConnection() {
    if (this.client) {
      return
    }
    this.socket = this.makeSocket()
    this.client = this.makeClient(this.socket)
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
