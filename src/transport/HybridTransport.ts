import {IWockyTransport, IPagingList, XmppTransport, GraphQLTransport, ILocationSnapshot} from '../'
import {computed} from 'mobx'

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
  @computed
  get geoBot() {
    return this._xmpp.geoBot
  }
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
    return this._xmpp.notification
  }

  _xmpp: XmppTransport
  _gql: GraphQLTransport
  constructor(xmpp: XmppTransport, gql: GraphQLTransport) {
    this._xmpp = xmpp
    this._gql = gql
  }

  async login(user?: string, password?: string, host?: string): Promise<boolean> {
    // return (await this._gql.login(user, password, host)) && (await this._xmpp.login(user, password, host))
    // parallel login
    const logins = await Promise.all([this._gql.login(user, password, host), this._xmpp.login(user, password, host)])
    return logins === [true, true]
  }

  register(data: any, host?: string, providerName?: string): Promise<{username: string; password: string; host: string}> {
    return this._xmpp.register(data, host, providerName)
  }

  testRegister({phoneNumber}: {phoneNumber: string}, host: string): Promise<{username: string; password: string; host: string}> {
    return this._xmpp.testRegister({phoneNumber}, host)
  }

  async setLocation(params: ILocationSnapshot): Promise<void> {
    return this._gql.setLocation(params)
  }

  async getLocationsVisited(limit?: number): Promise<object[]> {
    return this._gql.getLocationsVisited(limit)
  }

  async disconnect(): Promise<void> {
    console.log('& hybridtransport disconnect')
    await this._gql.disconnect()
    await this._xmpp.disconnect()
    console.log('& hybridtransport disconnected')
  }

  loadProfile(user: string): Promise<any> {
    return this._xmpp.loadProfile(user)
  }

  requestProfiles(users: string[]): Promise<any> {
    return this._xmpp.requestProfiles(users)
  }

  updateProfile(d: any): Promise<void> {
    return this._xmpp.updateProfile(d)
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

  downloadFile(tros: string, name: string, sourceUrl: string): Promise<any> {
    return this._xmpp.downloadFile(tros, name, sourceUrl)
  }

  downloadThumbnail(url: string, tros: string): Promise<any> {
    return this._xmpp.downloadThumbnail(url, tros)
  }

  downloadTROS(tros: string): Promise<any> {
    return this._xmpp.downloadTROS(tros)
  }

  requestUpload(params: {file: any; size: number; width: number; height: number; access: string}): Promise<string> {
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

  subscribeBot(id: string, geofence?: boolean): Promise<number> {
    return this._xmpp.subscribeBot(id, geofence)
  }

  unsubscribeBot(id: string, geofence?: boolean): Promise<number> {
    return this._xmpp.unsubscribeBot(id, geofence)
  }

  requestRoster(): Promise<[any]> {
    return this._xmpp.requestRoster()
  }

  loadChats(max?: number): Promise<Array<{id: string; message: any}>> {
    return this._xmpp.loadChats(max)
  }

  loadBot(id: string, server: any): Promise<any> {
    return this._gql.loadBot(id, server)
  }

  removeBot(id: string): Promise<void> {
    return this._xmpp.removeBot(id)
  }

  removeBotPost(id: string, postId: string): Promise<void> {
    return this._xmpp.removeBotPost(id, postId)
  }

  generateId(): Promise<string> {
    return this._xmpp.generateId()
  }

  updateBot(bot: any): Promise<void> {
    return this._xmpp.updateBot(bot)
  }

  shareBot(id: string, server: string, recepients: string[], message: string, action: string): void {
    this._xmpp.shareBot(id, server, recepients, message, action)
  }

  loadRelations(userId: string, relation: string, lastId?: string, max?: number): Promise<IPagingList> {
    return this._xmpp.loadRelations(userId, relation, lastId, max)
  }

  publishBotPost(botId: string, post: any): Promise<void> {
    return this._xmpp.publishBotPost(botId, post)
  }

  geosearch(props: {latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number}): Promise<void> {
    return this._xmpp.geosearch(props)
  }

  sendMessage(msg: any): void {
    this._xmpp.sendMessage(msg)
  }

  loadChat(userId: string, lastId?: string, max?: number): Promise<void> {
    return this._xmpp.loadChat(userId, lastId, max)
  }

  subscribeToHomestream(version: string): void {
    this._xmpp.subscribeToHomestream(version)
  }

  enablePush(token: string): Promise<void> {
    return this._xmpp.enablePush(token)
  }

  disablePush(): Promise<void> {
    return this._xmpp.disablePush()
  }

  loadUpdates(ver: string): Promise<{list: [any]; version: string; bots: [any]}> {
    return this._xmpp.loadUpdates(ver)
  }

  loadHomestream(lastId: any, max?: number): Promise<IPagingList> {
    return this._xmpp.loadHomestream(lastId, max)
  }

  loadOwnBots(userId: string, lastId?: string, max?: number): Promise<IPagingList> {
    return this._gql.loadOwnBots(userId, lastId, max)
  }

  loadGeofenceBots(lastId?: string, max?: number): Promise<IPagingList> {
    return this._gql.loadGeofenceBots(lastId, max)
  }
  loadBotSubscribers(id: string, lastId?: string, max?: number): Promise<IPagingList> {
    return this._xmpp.loadBotSubscribers(id, lastId, max)
  }

  loadBotGuests(id: string, lastId?: string, max?: number): Promise<IPagingList> {
    return this._xmpp.loadBotGuests(id, lastId, max)
  }

  loadBotVisitors(id: string, lastId?: string, max?: number): Promise<IPagingList> {
    return this._xmpp.loadBotVisitors(id, lastId, max)
  }

  loadBotPosts(id: string, lastId?: string): Promise<IPagingList> {
    return this._xmpp.loadBotPosts(id, lastId)
  }

  async loadSubscribedBots(userId: string, lastId?: string, max?: number): Promise<IPagingList> {
    return await this._gql.loadSubscribedBots(userId, lastId, max)
  }
}
