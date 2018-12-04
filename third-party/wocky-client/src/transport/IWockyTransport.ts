import {ILocationSnapshot, ILocation} from '../model/Location'
import {IProfilePartial} from '../model/Profile'
import {IBot} from '../model/Bot'

export interface IPagingList<T> {
  list: T[]
  cursor?: string
  count: number
}

export type LoginParams = {
  userId?: string
  token?: string
  password?: string
  accessToken?: string
  host?: string
  version?: string
  os?: string
  deviceName?: string
  phoneNumber?: string
}

export interface IWockyTransport {
  connected: boolean
  connecting: boolean
  username?: string
  password?: string
  host?: string
  resource?: string
  // geoBot: any // TODO inteface for bot
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
  ): Promise<{username?: string; password: string; host?: string}>
  testRegister(
    {phoneNumber}: {phoneNumber: string},
    host: string
  ): Promise<{username?: string; password: string; host?: string}>
  disconnect(): Promise<void>
  setLocation(params: ILocationSnapshot): Promise<void>
  getLocationsVisited(limit?: number): Promise<object[]>
  loadProfile(user: string): Promise<IProfilePartial | null>
  // requestProfiles(users: string[]): Promise<any>
  updateProfile(d: any): Promise<void>
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
  unsubscribeBot(id: string): Promise<void>
  requestRoster(): Promise<any[]>
  loadChats(max?: number): Promise<Array<{id: string; message: any}>>
  loadBot(id: string): Promise<any> // TODO define inteface for bot
  removeBot(id: string): Promise<void>
  removeBotPost(id: string, postId: string): Promise<void>
  generateId(): Promise<string>
  updateBot(bot: any, userLocation?: ILocation): Promise<void>
  // shareBot(id: string, server: string, recepients: string[], message: string, action: string): void
  inviteBot(id: string, recepients: string[]): Promise<void>
  inviteBotReply(invitationId: string, userLocation: ILocation, accept?: boolean): Promise<void>
  loadRelations(
    userId: string,
    relation: string,
    lastId?: string,
    max?: number
  ): Promise<IPagingList<any>>
  publishBotPost(botId: string, post: any): Promise<void>
  sendMessage(msg: any): void
  loadChat(userId: string, lastId?: string, max?: number): Promise<void>
  enablePush(token: string): Promise<void>
  disablePush(): Promise<void>
  loadNotifications(params: {
    limit?: number
    beforeId?: string
    afterId?: string
  }): Promise<{list: any[]; count: number}>
  loadOwnBots(userId: string, lastId?: string, max?: number): Promise<IPagingList<any>>
  loadGeofenceBots(lastId?: string, max?: number): Promise<IPagingList<any>>
  loadBotSubscribers(id: string, lastId?: string, max?: number): Promise<IPagingList<any>>
  loadBotGuests(id: string, lastId?: string, max?: number): Promise<IPagingList<any>>
  loadBotVisitors(id: string, lastId?: string, max?: number): Promise<IPagingList<any>>
  loadBotPosts(id: string, lastId?: string): Promise<IPagingList<any>>
  loadSubscribedBots(userId: string, lastId?: string, max?: number): Promise<IPagingList<any>>
  loadLocalBots(props: {
    latitude: number
    longitude: number
    latitudeDelta: number
    longitudeDelta: number
  }): Promise<IBot[]>
  hideUser(enable: boolean, expire?: Date): Promise<void>
  subscribeNotifications()
  searchUsers(text: string): Promise<IProfilePartial[]>
  userInviteMakeCode(): Promise<string>
  userInviteRedeemCode(code: string): Promise<void>
}
