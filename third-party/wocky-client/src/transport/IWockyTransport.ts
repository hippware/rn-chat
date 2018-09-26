import {ILocationSnapshot, ILocation} from '../model/Location'
import {IProfilePartial} from '../model/Profile'
import {IBot} from '../model/Bot'

export interface IPagingList {
  list: any[]
  cursor?: string
  count: number
}

export interface IWockyTransport {
  connected: boolean
  connecting: boolean
  username: string
  password: string
  host: string
  resource: string
  geoBot: any // TODO inteface for bot
  message: any // TODO interface for message
  presence: any // TODO interface for presence
  rosterItem: any // TODO interface for roster
  notification: any // TODO interface for notification
  botVisitor: any // TODO interface for bot visitor
  login(user?: string, password?: string, host?: string): Promise<boolean>
  register(
    data: any,
    host?: string,
    providerName?: string
  ): Promise<{username: string; password: string; host: string}>
  testRegister(
    {phoneNumber}: {phoneNumber: string},
    host: string
  ): Promise<{username: string; password: string; host: string}>
  disconnect(): Promise<void>
  setLocation(params: ILocationSnapshot): Promise<void>
  getLocationsVisited(limit?: number): Promise<object[]>
  loadProfile(user: string): Promise<IProfilePartial | null>
  requestProfiles(users: string[]): Promise<any>
  updateProfile(d: any): Promise<void>
  lookup(handle: string): Promise<any>
  remove(): Promise<void>
  downloadURL(tros: string): Promise<any>
  requestUpload(params: {
    file: any
    size: number
    width: number
    height: number
    access: string
  }): Promise<string>
  removeUpload(tros: string): Promise<void>
  follow(username: string): Promise<void>
  unfollow(username: string): Promise<void>
  block(username: string): Promise<void>
  unblock(username: string): Promise<void>
  subscribeBot(id: string, geofence?: boolean): Promise<number>
  unsubscribeBot(id: string, geofence?: boolean): Promise<number>
  requestRoster(): Promise<[any]>
  loadChats(max?: number): Promise<Array<{id: string; message: any}>>
  loadBot(id: string, server: any): Promise<any> // TODO define inteface for bot
  removeBot(id: string): Promise<void>
  removeBotPost(id: string, postId: string): Promise<void>
  generateId(): Promise<string>
  updateBot(bot: any, userLocation?: ILocation): Promise<void>
  shareBot(id: string, server: string, recepients: string[], message: string, action: string): void
  inviteBot(id: string, recepients: string[]): Promise<void>
  inviteBotReply(invitationId: string, accept?: boolean): Promise<void>
  loadRelations(
    userId: string,
    relation: string,
    lastId?: string,
    max?: number
  ): Promise<IPagingList>
  publishBotPost(botId: string, post: any): Promise<void>
  sendMessage(msg: any): void
  loadChat(userId: string, lastId?: string, max?: number): Promise<void>
  enablePush(token: string): Promise<void>
  disablePush(): Promise<void>
  loadNotifications(params: {
    limit?: number
    before?: string
    after?: string
  }): Promise<{list: any[]; count: number; cursor: string | undefined}>
  loadOwnBots(userId: string, lastId?: string, max?: number): Promise<IPagingList>
  loadGeofenceBots(lastId?: string, max?: number): Promise<IPagingList>
  loadBotSubscribers(id: string, lastId?: string, max?: number): Promise<IPagingList>
  loadBotGuests(id: string, lastId?: string, max?: number): Promise<IPagingList>
  loadBotVisitors(id: string, lastId?: string, max?: number): Promise<IPagingList>
  loadBotPosts(id: string, lastId?: string): Promise<IPagingList>
  loadSubscribedBots(userId: string, lastId?: string, max?: number): Promise<IPagingList>
  loadLocalBots(props: {
    latitude: number
    longitude: number
    latitudeDelta: number
    longitudeDelta: number
  }): Promise<IBot[]>
  hideUser(enable: boolean, expire?: Date): Promise<void>
  subscribeNotifications()
  searchUsers(text: string): Promise<IProfilePartial[]>
}
