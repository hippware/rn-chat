// @flow

import {Wocky} from 'wocky-client';
import {simpleActionLogger} from 'mst-middlewares';
import {addMiddleware} from 'mobx-state-tree';
import {observable} from 'mobx';

class XmppTransport {
  provider: any;
  fileService: any;
  resource: string;
  @observable connected: boolean = false;
  @observable connecting: boolean = false;
  @observable iq: any = {};
  @observable rosterItem: any = {};
  @observable message: {id: string, message: any};
  @observable presence: {status: string, id: string};
  @observable username: string;
  @observable password: string;
  @observable host: string;
  @observable geoBot: any;
  @observable notification: any;
  isGeoSearching: boolean = false;

  async login(user?: string, password?: string, host?: string) {
    console.log('WOCKY LOGIN');
  }

  async disconnect() {
    // this.provider.disconnectAfterSending()
    // await new Promise(resolve => when(() => !this.connected, resolve))
  }

  async sendIQ(data: any, withoutTo: boolean = false): Promise<any> {}

  async loadProfile(user: string) {
    // return {id, ...processMap(stanza)}
  }

  async requestProfiles(users: string[]): Promise<any> {
    // return arr.map((user: any) => ({id: user.user, ...processMap(user)}))
  }
  async updateProfile(d: any) {}

  async lookup(handle: string) {
    // return {id: user, ...processMap(stanza.results.item)}
  }
  async remove() {}

  async loadRelations(userId: string, relation: string = 'following', lastId?: string, max: number = 10) {
    // return {list, count: parseInt(stanza.contacts.set.count)}
  }

  async downloadURL(tros: string) {
    // return {url: data.url, headers}
  }
  async downloadFile(tros: string, name: string, sourceUrl: string) {}
  async downloadThumbnail(url: string, tros: string) {
    return this.downloadFile(tros, 'thumbnail', url);
  }
  async downloadTROS(tros: string) {
    return this.downloadFile(tros, 'main', '');
  }
  async requestUpload({file, size, width, height, access}: any) {
    // return data.reference_url
  }
  sendStanza(stanza: any) {}
  sendPresence(stanza: any) {}
  async addToRoster(username: string, group: string) {}
  async removeFromRoster(username: string) {}
  async follow(username: string) {}
  async unfollow(username: string) {}
  async block(username: string) {}
  async unblock(username: string) {}
  async requestRoster() {
    // return children.map((rec: any) => processRosterItem(rec, this.host))
  }
  async enablePush(token: string): Promise<void> {}
  async disablePush(): Promise<void> {}
  sendMessage(msg: any) {}
  async loadChat(userId: string, lastId?: string, max: number = 20) {}
  async loadChats(max: number = 50): Promise<Array<{id: string, message: any}>> {
    // return items.map((item: any) => {
    //   const {other_jid, message, outgoing, timestamp} = item
    //   const sender: string = Utils.getNodeJid(other_jid)!
    //   const from = outgoing === 'true' ? this.username : sender
    //   const to = outgoing === 'true' ? sender : this.username
    //   return {id: sender, message: processMessage({...message, to, from, time: Utils.iso8601toDate(timestamp).getTime()}, this.username!)}
    // })
  }

  async generateId() {
    // const iq = $iq({type: 'set'}).c('new-id', {xmlns: BOT_NS})
    // const data = await this.sendIQ(iq)
    // if (data['new-id']) {
    //   if (data['new-id']['#text']) {
    //     return data['new-id']['#text']
    //   } else {
    //     return data['new-id']
    //   }
    // } else {
    //   throw 'Cannot generate ID'
    // }
  }
  async removeBot(id: string) {}
  async loadOwnBots(userId: string, lastId?: string, max: number = 10) {
    // return {list: bots.map((item: any) => ({id: item.id, ...processMap(item)})), count: parseInt(data.bots.set.count)}
  }
  async loadBotSubscribers(id: string, lastId?: string, max: number = 10) {
    // return {list, count: parseInt(data.subscribers.set.count)}
  }
  async loadBotPosts(id: string, before?: string) {
    // return {
    //   count: parseInt(data.query.set.count),
    //   list: res.map((x: any) => {
    //     const post = {...x, ...x.entry}
    //     const profile = {
    //       id: Utils.getNodeJid(x.author)!,
    //       handle: post.author_handle,
    //       firstName: post.author_first_name,
    //       lastName: post.author_last_name,
    //       avatar: post.author_avatar
    //     }
    //     return {
    //       id: post.id,
    //       content: post.content,
    //       image: post.image,
    //       time: Utils.iso8601toDate(post.updated).getTime(),
    //       profile
    //     }
    //   })
    // }
  }
  async loadSubscribedBots(userId: string, lastId?: string, max: number = 10) {
    // return {list: bots.map((item: any) => ({id: item.id, ...processMap(item)})), count: parseInt(data.bots.set.count)}
  }
  async updateBot(bot: any) {}
  async loadBot(id: string, server: any) {
    // return {id: data.bot.id, ...processMap(data.bot)}
  }
  async removeBotPost(id: string, postId: string) {}
  shareBot(id: string, server: string, recepients: string[], message: string, type: string) {}

  async publishBotPost(botId: string, post: any) {}
  async subscribeBot(id: string) {
    // return parseInt(data['subscriber_count'])
  }
  async unsubscribeBot(id: string) {
    // return parseInt(data['subscriber_count'])
  }
  async loadUpdates(ver: string) {
    // return {list, version, bots: bots.map((bot: any) => ({id: bot.id, ...processMap(bot)}))}
  }
  async loadHomestream(lastId: any, max: number = 3) {
    // return {list, count, version, bots: bots.map((bot: any) => ({id: bot.id, ...processMap(bot)}))}
  }
  subscribeToHomestream(version: string) {}
  async geosearch({latitude, longitude, latitudeDelta, longitudeDelta}: any) {
    //   if (!this.isGeoSearching) {
    //     try {
    //       this.isGeoSearching = true
    //       const iq = $iq({type: 'get', to: this.host})
    //         .c('bots', {
    //           xmlns: BOT_NS
    //         })
    //         .c('explore-nearby', {limit: 100, lat_delta: latitudeDelta, lon_delta: longitudeDelta, lat: latitude, lon: longitude})
    //       await this.sendIQ(iq)
    //     } catch (e) {
    //       // TODO: how do we handle errors here?
    //       console.error(e)
    //     } finally {
    //       this.isGeoSearching = false
    //     }
    //   }
  }
}

class FakeFileService {
  get tempDir() {
    return null;
  }
  fileExists(filePath: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
  mkdir(folder: string) {
    // return mkdir(folder);
  }
  getImageSize(filename: string): Promise<{width: number, height: number}> {
    return new Promise((resolve, reject) => resolve({width: 0, height: 0}));
  }
  downloadHttpFile(urlString: string, fileName: string, headers: any): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
  removeFile() {}
}

const transport = new XmppTransport();
const fileService = new FakeFileService();
const logger = console;
export function createWocky(env = {}) {
  const wocky = Wocky.create({host: 'testing.dev.tinyrobot.com'}, {analytics: {track: () => {}}, transport, fileService, logger, ...env});
  addMiddleware(wocky, simpleActionLogger);
  return wocky
}

export default createWocky();
