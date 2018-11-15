import {IWockyTransport, IPagingList, XmppTransport, GraphQLTransport, ILocationSnapshot} from '../'
import {IProfilePartial} from '../model/Profile'
import {IBot} from '../model/Bot'
import {computed} from 'mobx'
import {ILocation} from '../model/Location'
import {LoginParams} from './IWockyTransport'

export class HybridTransport implements IWockyTransport {
  @computed
  get connected() {
    return this._xmpp.connected && this._gql.connected
  }
  @computed
  get connecting() {
    return this._xmpp.connecting || this._gql.connecting
  }
  @computed
  get username() {
    return this._xmpp.username
  }
  @computed
  get password() {
    return this._xmpp.password
  }
  @computed
  get resource() {
    return this._xmpp.resource
  }
  @computed
  get host() {
    return this._xmpp.host
  }
  // @computed
  // get geoBot() {
  //   return this._xmpp.geoBot
  // }
  @computed
  get message() {
    return this._xmpp.message
  }
  @computed
  get botVisitor() {
    return this._gql.botVisitor
  }
  @computed
  get presence() {
    return this._xmpp.presence
  }
  @computed
  get rosterItem() {
    return this._xmpp.rosterItem
  }
  @computed
  get notification() {
    return this._gql.notification
  }

  // TODO: add new computed value for passing through GraphQL notifications

  _xmpp: XmppTransport
  _gql: GraphQLTransport
  constructor(xmpp: XmppTransport, gql: GraphQLTransport) {
    this._xmpp = xmpp
    this._gql = gql
  }

  async login(params: LoginParams): Promise<boolean> {
    // parallel login
    const logins = await Promise.all([
      this._gql.loginGQL(params),
      this._xmpp.login({user: params.userId, password: params.token, host: params.host}),
    ])
    return logins === [true, true]
  }

  register(
    data: any,
    host?: string,
    providerName?: string
  ): Promise<{username: string; password: string; host: string}> {
    return this._xmpp.register(data, host, providerName)
  }

  testRegister(
    {phoneNumber}: {phoneNumber: string},
    host: string
  ): Promise<{username: string; password: string; host: string}> {
    return this._xmpp.testRegister({phoneNumber}, host)
  }

  async setLocation(params: ILocationSnapshot): Promise<void> {
    return this._gql.setLocation(params)
  }

  async getLocationsVisited(limit?: number): Promise<object[]> {
    return this._gql.getLocationsVisited(limit)
  }

  async disconnect(): Promise<void> {
    await this._gql.disconnect()
    await this._xmpp.disconnect()
  }

  loadProfile(user: string): Promise<IProfilePartial | null> {
    return this._gql.loadProfile(user)
    // return this._xmpp.loadProfile(user)
  }

  requestProfiles(users: string[]): Promise<any> {
    return this._xmpp.requestProfiles(users)
  }

  updateProfile(d: any): Promise<void> {
    return this._gql.updateProfile(d)
  }

  lookup(handle: string): Promise<any> {
    return this._xmpp.lookup(handle)
  }

  async remove(): Promise<void> {
    await this._gql.remove()
    await this._xmpp.remove()
  }

  downloadURL(tros: string): Promise<any> {
    return this._xmpp.downloadURL(tros)
  }

  requestUpload(params: {
    file: any
    size: number
    width: number
    height: number
    access: string
  }): Promise<string> {
    return this._xmpp.requestUpload(params)
  }

  follow(username: string): Promise<void> {
    return this._xmpp.follow(username)
  }

  unfollow(username: string): Promise<void> {
    return this._xmpp.unfollow(username)
  }

  block(username: string): Promise<void> {
    return this._xmpp.block(username)
  }

  unblock(username: string): Promise<void> {
    return this._xmpp.unblock(username)
  }

  subscribeBot(id: string): Promise<number> {
    return this._xmpp.subscribeBot(id)
  }

  unsubscribeBot(id: string): Promise<number> {
    return this._xmpp.unsubscribeBot(id)
  }

  requestRoster(): Promise<any[]> {
    return this._gql.requestRoster()
  }

  loadChats(max?: number): Promise<Array<{id: string; message: any}>> {
    return this._xmpp.loadChats(max)
  }

  loadBot(id: string): Promise<any> {
    return this._gql.loadBot(id)
  }

  removeBot(id: string): Promise<void> {
    return this._xmpp.removeBot(id)
  }

  removeBotPost(id: string, postId: string): Promise<void> {
    return this._xmpp.removeBotPost(id, postId)
  }

  generateId(): Promise<string> {
    return this._gql.generateId()
  }

  updateBot(bot: any, userLocation?: ILocation): Promise<void> {
    return this._gql.updateBot(bot, userLocation)
  }

  shareBot(
    id: string,
    server: string,
    recepients: string[],
    message: string,
    action: string
  ): void {
    this._xmpp.shareBot(id, server, recepients, message, action)
  }

  async inviteBot(id: string, recipients: string[]): Promise<void> {
    return this._gql.inviteBot(id, recipients)
  }

  async inviteBotReply(invitationId: string, userLocation: ILocation, accept: boolean = true) {
    return this._gql.inviteBotReply(invitationId, userLocation, accept)
  }

  loadRelations(
    userId: string,
    relation: string,
    lastId?: string,
    max?: number
  ): Promise<IPagingList> {
    return this._xmpp.loadRelations(userId, relation, lastId, max)
  }

  publishBotPost(botId: string, post: any): Promise<void> {
    return this._xmpp.publishBotPost(botId, post)
  }

  loadLocalBots(props: {
    latitude: number
    longitude: number
    latitudeDelta: number
    longitudeDelta: number
  }): Promise<[IBot]> {
    return this._gql.loadLocalBots(props)
  }

  sendMessage(msg: any): void {
    this._xmpp.sendMessage(msg)
  }

  loadChat(userId: string, lastId?: string, max?: number): Promise<void> {
    return this._xmpp.loadChat(userId, lastId, max)
  }

  enablePush(token: string): Promise<void> {
    return this._xmpp.enablePush(token)
  }

  disablePush(): Promise<void> {
    return this._xmpp.disablePush()
  }

  loadNotifications(params: {
    limit?: number
    beforeId?: string
    afterId?: string
  }): Promise<{list: any[]; count: number}> {
    return this._gql.loadNotifications(params)
  }

  loadOwnBots(userId: string, lastId?: string, max?: number): Promise<IPagingList> {
    return this._gql.loadOwnBots(userId, lastId, max)
  }

  loadGeofenceBots(): Promise<IPagingList> {
    return this._gql.loadGeofenceBots()
  }
  loadBotSubscribers(id: string, lastId?: string, max?: number): Promise<IPagingList> {
    // return this._xmpp.loadBotSubscribers(id, lastId, max)
    return this._gql.loadBotSubscribers(id, lastId, max)
  }

  loadBotGuests(id: string, lastId?: string, max?: number): Promise<IPagingList> {
    // return this._xmpp.loadBotGuests(id, lastId, max)
    return this._gql.loadBotGuests(id, lastId, max)
  }

  loadBotVisitors(id: string, lastId?: string, max?: number): Promise<IPagingList> {
    // return this._xmpp.loadBotVisitors(id, lastId, max)
    return this._gql.loadBotVisitors(id, lastId, max)
  }

  loadBotPosts(id: string, lastId?: string): Promise<IPagingList> {
    return this._xmpp.loadBotPosts(id, lastId)
  }

  async loadSubscribedBots(userId: string, lastId?: string, max?: number): Promise<IPagingList> {
    return await this._gql.loadSubscribedBots(userId, lastId, max)
  }

  async removeUpload(tros: string) {
    await this._gql.removeUpload(tros)
  }
  async hideUser(enable: boolean, expire?: Date): Promise<void> {
    await this._gql.hideUser(enable, expire)
  }

  subscribeNotifications() {
    this._gql.subscribeNotifications()
  }

  async searchUsers(text: string) {
    return this._gql.searchUsers(text)
  }

  async userInviteMakeCode(): Promise<string> {
    return this._gql.userInviteMakeCode()
  }

  async userInviteRedeemCode(code: string): Promise<void> {
    return this._gql.userInviteRedeemCode(code)
  }
}
