// import {observable, when} from 'mobx'
// import * as Utils from './utils'
import {ApolloClient} from 'apollo-client'
import {InMemoryCache, IntrospectionFragmentMatcher} from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import {IWockyTransport, IPagingList} from './IWockyTransport'
import {observable, action, when} from 'mobx'
import * as AbsintheSocket from '@absinthe/socket'
import {createAbsintheSocketLink} from '@absinthe/socket-apollo-link'
import {Socket as PhoenixSocket} from 'phoenix'
import {IProfilePartial} from '../model/Profile'
import {ILocationSnapshot} from '..'
import {IBot, IBotData} from '../model/Bot'
import {ILocation} from '../model/Location'
import {IEventUserFollowData} from '../model/EventUserFollow'
import {IEventData} from '../model/Event'
import {IEventBotPostData} from '../model/EventBotPost'
import {IEventBotInviteData} from '../model/EventBotInvite'
import {IEventBotGeofenceData} from '../model/EventBotGeofence'
const introspectionQueryResultData = require('./fragmentTypes.json')

const PROFILE_PROPS = `id firstName lastName handle
  avatar { thumbnailUrl fullUrl trosUrl }
  bots(first:0, relationship: OWNED) { totalCount }
  followers: contacts(first: 0 relationship: FOLLOWER) { totalCount }
  followed: contacts(first: 0 relationship: FOLLOWING) { totalCount }
`
const BOT_PROPS = `id icon title address isPublic: public addressData description geofence public radius server shortname 
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
  notificationsSubscription?: ZenObservable.Subscription
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

    const socketEndpoint = process.env.WOCKY_LOCAL
      ? 'ws://localhost:8080/graphql'
      : `wss://${this.host}/graphql`

    this.socket = new PhoenixSocket(socketEndpoint, {
      reconnectAfterMs: () => 100000000, // disable auto-reconnect
      // uncomment to see all graphql messages!
      // logger: (kind, msg, data) => {
      //   if (msg !== 'close') {
      //     console.log('& socket:' + `${kind}: ${msg}`, JSON.stringify(data))
      //   }
      // },
    })
    const fragmentMatcher = new IntrospectionFragmentMatcher({
      introspectionQueryResultData,
    })
    this.client = new ApolloClient({
      link: createAbsintheSocketLink(AbsintheSocket.create(this.socket)),
      cache: new InMemoryCache({fragmentMatcher}),
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
              ${
                user === this.username
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
    const res = await this.client.mutate({
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
            locations(last: $limit, device: $ownResource) {
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

  async loadNotifications(
    lastId?: string,
    max: number = 10
  ): Promise<{list: any[]; count: number; version: string | null; bots: IBotData[]}> {
    const res = await this.client.query<any>({
      // NOTE: id is required in this query to prevent apollo-client error: https://github.com/apollographql/apollo-client/issues/2510
      query: gql`
        query getNotifications($limit: Int!, $ownUsername: String!) {
          notifications(first: $limit) {
            totalCount
            edges {
              cursor
              node {
                createdAt
                id
                data {
                  __typename
                  ... on UserFollowNotification {
                    user {
                      ${PROFILE_PROPS}
                    }
                  }
                  ... on InvitationNotification {
                    bot {${BOT_PROPS}}
                    invitation {
                      accepted
                      id
                      user {${PROFILE_PROPS}}
                    }
                  }
                  ... on InvitationResponseNotification {
                    accepted
                    invitation {
                      id
                    }
                    bot {
                      ${BOT_PROPS}
                    }
                    user {${PROFILE_PROPS}}
                  }
                  ... on BotItemNotification {
                    bot {${BOT_PROPS}}
                    botItem {
                      id
                      image
                      media {
                        fullUrl
                        thumbnailUrl
                        trosUrl
                      }
                      owner {${PROFILE_PROPS}}
                      stanza
                    }
                  }
                  ... on GeofenceEventNotification {
                    bot {${BOT_PROPS}}
                    user {${PROFILE_PROPS}}
                    event
                  }
                }
              }
            }
          }
        }
      `,
      variables: {limit: max, ownUsername: this.username},
    })
    const {totalCount, edges} = res.data.notifications
    const {list, bots} = convertNotifications(edges)!
    return {
      count: totalCount,
      list,
      version: edges.length ? edges[edges.length - 1].cursor : null,
      bots,
    }
  }
  subscribeNotifications() {
    if (this.notificationsSubscription) {
      return
    }
    this.notificationsSubscription = this.client
      .subscribe({
        query: gql`
          subscription notifications {
            notifications {
              createdAt
              id
              data {
                __typename
                ... on UserFollowNotification {
                  user {
                    id
                  }
                }
              }
            }
          }
        `,
        // variables: {
        //   ownUsername: this.username,
        // },
      })
      .subscribe({
        next: action((result: any) => {
          console.log('& sub hit!', result)
          const update = result.data.notifications
          console.log('& SUB UPDATE:', update)
          this.notification = {
            data: result.data,
          }
        }),
      })
  }
  @action
  unsubscribeNotifications() {
    throw new Error('TODO')
    // if (this.botGuestVisitorsSubscription) this.botGuestVisitorsSubscription.unsubscribe()
    // this.botGuestVisitorsSubscription = undefined
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
    // This is supported via the Bot.Items connection
    throw new Error('Not supported')
  }
  shareBot() {
    throw new Error('Not supported')
  }
  async inviteBot(botId: string, userId: string): Promise<string> {
    const data: any = await this.client.mutate({
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
      variables: {input: {botId, userId}},
    })
    console.log('& invite res', data)
    return data.data.botInvite.result.id
    // const bots = res.data.currentUser.activeBots
    // const list = bots.edges.filter((e: any) => e.node).map((e: any) => convertBot(e.node))
    // return {
    //   list,
    //   cursor: bots.edges.length ? bots.edges[bots.edges.length - 1].cursor : null,
    //   count: bots.totalCount,
    // }
  }
  async inviteBotReply(invitationId: string, accept: boolean) {
    const data: any = await this.client.mutate({
      mutation: gql`
        mutation botInvitationRespond($input: BotInvitationRespondInput!) {
          botInvitationRespond(input: $input) {
            successful
            result
            messages {
              message
            }
          }
        }
      `,
      variables: {input: {invitationId, accept}},
    })
    console.log('& invitation reply res', data)
    // const bots = res.data.currentUser.activeBots
    // const list = bots.edges.filter((e: any) => e.node).map((e: any) => convertBot(e.node))
    // return {
    //   list,
    //   cursor: bots.edges.length ? bots.edges[bots.edges.length - 1].cursor : null,
    //   count: bots.totalCount,
    // }
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
      geofence,
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
    userLocation?: ILocation
  ): Promise<void> {
    const res = await this.client.mutate({
      mutation: gql`
        mutation botUpdate(
          $id: String!
          $userLocation: UserLocationUpdateInput
          $values: BotParams
        ) {
          botUpdate(input: {id: $id, userLocation: $userLocation, values: $values}) {
            successful
          }
        }
      `,
      variables: {
        id,
        values: {
          address,
          addressData: JSON.stringify(addressData),
          description,
          geofence,
          icon,
          image,
          lat: bot.location.latitude,
          lon: bot.location.longitude,
          public: bot.public,
          radius: Math.round(radius),
          server,
          shortname,
          title,
          type,
        },
        ...(userLocation
          ? {
              lon: userLocation.longitude,
              lat: userLocation.latitude,
              accuracy: userLocation.accuracy,
            }
          : {}),
      },
    })
    if (!res.data!.botUpdate.successful) {
      throw new Error('Error during bot save!')
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
    await this.client.mutate({
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
    const res = await this.client.query<any>({
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
    await this.client.mutate({
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

function convertProfile({avatar, bots, followers, followed, hidden, ...data}): IProfilePartial {
  // console.log('convertProfile', bots, followers, followed, data)
  return {
    hidden: hidden
      ? {enabled: hidden.enabled, expires: hidden.expires ? new Date(hidden.expires) : null}
      : null,
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
      public: isPublic,
      guest: contains('GUEST'),
      visitor: contains('VISITOR'),
      isSubscribed: contains('SUBSCRIBED'),
    }
  } catch (e) {
    // console.error('ERROR CONVERTING:', arguments[0], e)
  }
}

function convertNotifications(notifications: any[]): {list: IEventData[]; bots: IBotData[]} | null {
  const list: IEventData[] = []
  const bots: IBotData[] = []
  notifications.forEach(notification => {
    let bot: IBotData
    // console.log('& convert notification', notification)
    const {data: {__typename, ...data}, id} = notification.node
    switch (__typename) {
      case 'UserFollowNotification':
        const followNotification: IEventUserFollowData = {
          id,
          user: convertProfile(data.user),
        }
        // console.log('& user follow:', followNotification)
        // return followNotification
        list.push(followNotification)
        break
      case 'BotItemNotification':
        // console.log('& bot item', data.botItem)
        bot = convertBot(data.bot)
        const botItemNotification: IEventBotPostData = {
          id,
          post: {
            id: data.id,
            image: convertImage(data.botItem.image),
            // profile: convertProfile(data.botItem.owner),
            profile: data.botItem.owner.id,
          },
          bot: bot.id,
        }
        // console.log('& bot item:', botItemNotification)
        // return botItemNotification
        list.push(botItemNotification)
        bots.push(bot)
        break
      case 'InvitationNotification':
      case 'InvitationResponseNotification':
        // console.log('& invite response notification', data.invitation)
        bot = convertBot(data.bot)
        const inviteNotification: IEventBotInviteData = {
          id,
          bot: bot.id,
          sender: __typename === 'InvitationNotification' ? data.invitation.user.id : data.user.id,
          isAccepted: data.accepted,
        }
        // return inviteNotification
        list.push(inviteNotification)
        bots.push(bot)
        break
      case 'GeofenceEventNotification':
        // console.log('& invite response notification', data.invitation)
        bot = convertBot(data.bot)
        const geofenceNotification: IEventBotGeofenceData = {
          id,
          bot: bot.id,
          // profile: convertProfile(data.user),
          profile: data.user.id,
          isEnter: data.event === 'ENTER',
        }
        // console.log('& after:', botItemNotification)
        // return geofenceNotification
        list.push(geofenceNotification)
        bots.push(bot)
        break
      default:
        throw new Error(`failed to process notification ${notification}`)
    }
  })

  return {list, bots}
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
