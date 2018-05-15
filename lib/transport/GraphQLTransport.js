"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// import {observable, when} from 'mobx'
// import * as Utils from './utils'
const apollo_client_1 = require("apollo-client");
const apollo_cache_inmemory_1 = require("apollo-cache-inmemory");
const graphql_tag_1 = require("graphql-tag");
const mobx_1 = require("mobx");
const AbsintheSocket = require("@absinthe/socket");
const socket_apollo_link_1 = require("@absinthe/socket-apollo-link");
const phoenix_1 = require("phoenix");
const Bot_1 = require("../model/Bot");
const PROFILE_PROPS = `id firstName lastName handle
  avatar { thumbnailUrl fullUrl trosUrl }
  bots(first:0, relationship: OWNED) { totalCount }
  followers: contacts(first: 0 relationship: FOLLOWER) { totalCount }
  followed: contacts(first: 0 relationship: FOLLOWING) { totalCount }
`;
const BOT_PROPS = `id title address isPublic: public addressData description geofence public radius server shortname 
  image { thumbnailUrl fullUrl trosUrl }
  type lat lon owner { ${PROFILE_PROPS} } 
  items(first:0) { totalCount }
  guestCount: subscribers(first:0 type:GUEST){ totalCount }
  visitorCount: subscribers(first:0 type:VISITOR){ totalCount }
  subscriberCount: subscribers(first:0 type:SUBSCRIBER){ totalCount }
  subscribers(first:1 id: $ownUsername) { edges { relationships } }
`;
class GraphQLTransport {
    constructor(resource) {
        this.connected = false;
        this.connecting = false;
        this.resource = resource;
    }
    login(user, password, host) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.connecting) {
                // prevent duplicate login
                return new Promise(resolve => {
                    mobx_1.when(() => !this.connecting, () => {
                        resolve(this.connected);
                    });
                });
            }
            this.connecting = true;
            if (user) {
                this.username = user;
            }
            if (password) {
                this.password = password;
            }
            if (host) {
                this.host = host;
            }
            this.socket = new phoenix_1.Socket(`wss://${this.host}/graphql`, {
                reconnectAfterMs: () => 100000000,
            });
            this.client = new apollo_client_1.ApolloClient({
                link: socket_apollo_link_1.createAbsintheSocketLink(AbsintheSocket.create(this.socket)),
                cache: new apollo_cache_inmemory_1.InMemoryCache(),
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
            });
            this.socket.onError(() => {
                // console.log('& graphql Phoenix socket error')
                this.connected = false;
            });
            this.socket.onClose(() => {
                // console.log('& graphql Phoenix socket closed')
                this.unsubscribeBotVisitors();
                this.connected = false;
            });
            this.socket.onOpen(() => {
                // console.log('& graphql open')
            });
            const res = yield this.authenticate(this.username, this.password);
            if (res) {
                this.subscribeBotVisitors();
            }
            return res;
        });
    }
    authenticate(user, token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.client.mutate({
                    mutation: graphql_tag_1.default `
          mutation authenticate($user: String!, $token: String!) {
            authenticate(input: {user: $user, token: $token}) {
              user {
                id
              }
            }
          }
        `,
                    variables: { user, token },
                });
                this.connected = !!res.data && res.data.authenticate !== null;
                return this.connected;
            }
            catch (err) {
                this.connected = false;
                return false;
            }
            finally {
                this.connecting = false;
            }
        });
    }
    loadProfile(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const res = yield this.client.query({
                query: graphql_tag_1.default `
          query LoadProfile {
            user(id: "${user}") {
              ${PROFILE_PROPS}
              ${user === this.username ? '... on CurrentUser { email phoneNumber }' : ''}
            }
          }
        `,
            });
            if (!res.data.user) {
                return null;
            }
            return convertProfile(res.data.user);
        });
    }
    requestRoster() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not supported');
        });
    }
    generateId() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not supported');
        });
    }
    loadBot(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const res = yield this.client.query({
                query: graphql_tag_1.default `
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
            });
            return convertBot(res.data.bot);
        });
    }
    _loadBots(relationship, userId, after, max = 10) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let bots;
            if (userId === this.username) {
                const res = yield this.client.query({
                    query: graphql_tag_1.default `
          query loadBots($max: Int!, $ownUsername: String!, $after: String, $relationship: String!) {
            currentUser {
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
                    variables: { after, max, ownUsername: this.username, relationship },
                });
                bots = res.data.currentUser.bots;
            }
            else {
                const res = yield this.client.query({
                    query: graphql_tag_1.default `
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
                    variables: { userId, after, max, ownUsername: this.username, relationship },
                });
                bots = res.data.user.bots;
            }
            const list = bots.edges.filter((e) => e.node).map((e) => convertBot(e.node));
            return {
                list,
                cursor: bots.edges.length ? bots.edges[bots.edges.length - 1].cursor : null,
                count: bots.totalCount,
            };
        });
    }
    setLocation(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const res = yield this.client.mutate({
                mutation: graphql_tag_1.default `
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
                variables: Object.assign({}, params, { resource: this.resource }),
            });
            return res.data.userLocationUpdate && res.data.userLocationUpdate.successful;
        });
    }
    getLocationsVisited(limit = 50) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const res = yield this.client.query({
                // NOTE: id is required in this query to prevent apollo-client error: https://github.com/apollographql/apollo-client/issues/2510
                query: graphql_tag_1.default `
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
                variables: { limit, ownResource: this.resource },
            });
            return res.data.currentUser.locations.edges.map(e => {
                const { createdAt, lat, lon, accuracy } = e.node;
                return { createdAt, lat, lon, accuracy };
            });
        });
    }
    unsubscribeBotVisitors() {
        this.connected = false;
        this.connecting = false;
        if (this.botGuestVisitorsSubscription)
            this.botGuestVisitorsSubscription.unsubscribe();
        this.botGuestVisitorsSubscription = undefined;
    }
    subscribeBotVisitors() {
        if (this.botGuestVisitorsSubscription) {
            return;
        }
        this.botGuestVisitorsSubscription = this.client
            .subscribe({
            query: graphql_tag_1.default `
          subscription subscribeBotVisitors($ownUsername: String!){
            botGuestVisitors {
              action
              bot {
                ${BOT_PROPS}
              }
              visitor {
                ${PROFILE_PROPS}
              }
            }
          }
        `,
            variables: {
                ownUsername: this.username,
            },
        })
            .subscribe({
            next: mobx_1.action((result) => {
                const update = result.data.botGuestVisitors;
                this.botVisitor = {
                    visitor: convertProfile(update.visitor),
                    bot: convertBot(update.bot),
                    action: update.action,
                };
            }),
        });
    }
    loadOwnBots(id, lastId, max = 10) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this._loadBots('OWNED', id, lastId, max);
        });
    }
    loadSubscribedBots(userId, lastId, max = 10) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this._loadBots('SUBSCRIBED', userId, lastId, max);
        });
    }
    loadGeofenceBots() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // load all guest bots
            const res = yield this.client.query({
                query: graphql_tag_1.default `
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
            });
            const bots = res.data.currentUser.activeBots;
            const list = bots.edges.filter((e) => e.node).map((e) => convertBot(e.node));
            return {
                list,
                cursor: bots.edges.length ? bots.edges[bots.edges.length - 1].cursor : null,
                count: bots.totalCount,
            };
        });
    }
    loadBotSubscribers(id, lastId, max = 10) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.getBotProfiles('SUBSCRIBER', false, id, lastId, max);
        });
    }
    loadBotGuests(id, lastId, max = 10) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.getBotProfiles('GUEST', true, id, lastId, max);
        });
    }
    loadBotVisitors(id, lastId, max = 10) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.getBotProfiles('VISITOR', true, id, lastId, max);
        });
    }
    loadBotPosts() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not supported');
        });
    }
    shareBot() {
        throw new Error('Not supported');
    }
    register() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not supported');
        });
    }
    testRegister() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not supported');
        });
    }
    disconnect() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // console.log('& graphql disconnect')
            if (this.socket && this.socket.isConnected()) {
                this.unsubscribeBotVisitors();
                return new Promise((resolve, reject) => {
                    try {
                        this.socket.disconnect(() => {
                            // console.log('& graphql onDisconnect', something)
                            resolve();
                        });
                    }
                    catch (err) {
                        // console.log('& graphql disconnect err', err)
                        reject(err);
                    }
                });
            }
        });
    }
    requestProfiles() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not supported');
        });
    }
    updateProfile(d) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const fields = ['avatar', 'handle', 'email', 'firstName', 'tagline', 'lastName'];
            const values = {};
            fields.forEach(field => {
                if (d[field]) {
                    values[field] = d[field];
                }
            });
            const data = yield this.client.mutate({
                mutation: graphql_tag_1.default `
        mutation userUpdate($values: UserParams!) {
          userUpdate(input: {values: $values}) {
            successful
            messages {
              message
            }
          }
        }
      `,
                variables: { values },
            });
            if (!data.data.userUpdate.successful) {
                throw new Error(JSON.stringify(data.data.userUpdate.messages));
            }
        });
    }
    lookup() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not supported');
        });
    }
    remove() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // TODO: remove user
            return this.disconnect();
        });
    }
    downloadURL() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not supported');
        });
    }
    downloadFile() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not supported');
        });
    }
    downloadThumbnail() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not supported');
        });
    }
    downloadTROS() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not supported');
        });
    }
    requestUpload() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not supported');
        });
    }
    follow() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not supported');
        });
    }
    unfollow() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not supported');
        });
    }
    block() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not supported');
        });
    }
    unblock() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not supported');
        });
    }
    subscribeBot() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not supported');
        });
    }
    unsubscribeBot() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not supported');
        });
    }
    loadChats() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not supported');
        });
    }
    removeBot() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not supported');
        });
    }
    removeBotPost() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not supported');
        });
    }
    updateBot() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not supported');
        });
    }
    loadRelations() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not supported');
        });
    }
    publishBotPost() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not supported');
        });
    }
    geosearch() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not supported');
        });
    }
    sendMessage() {
        throw new Error('Not supported');
    }
    loadChat() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not supported');
        });
    }
    subscribeToHomestream() {
        throw new Error('Not supported');
    }
    enablePush() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not supported');
        });
    }
    disablePush() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not supported');
        });
    }
    loadUpdates() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not supported');
        });
    }
    loadHomestream() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw new Error('Not supported');
        });
    }
    getBotProfiles(relationship, includeCurrentUser, id, lastId, max = 10) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const res = yield this.client.query({
                query: graphql_tag_1.default `
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
            });
            // return empty list for null data
            if (!res.data.bot || !res.data.bot.subscribers) {
                return { list: [], count: 0 };
            }
            let list = res.data.bot.subscribers.edges;
            let count = res.data.bot.subscribers.totalCount;
            if (!includeCurrentUser) {
                list = list.filter(p => {
                    return p.node.__typename !== 'CurrentUser';
                });
                count -= 1;
            }
            return {
                list: list.map(p => convertProfile(p.node)),
                cursor: list.length ? list[list.length - 1].cursor : null,
                count,
            };
        });
    }
}
tslib_1.__decorate([
    mobx_1.observable
], GraphQLTransport.prototype, "connected", void 0);
tslib_1.__decorate([
    mobx_1.observable
], GraphQLTransport.prototype, "connecting", void 0);
tslib_1.__decorate([
    mobx_1.observable
], GraphQLTransport.prototype, "geoBot", void 0);
tslib_1.__decorate([
    mobx_1.observable
], GraphQLTransport.prototype, "message", void 0);
tslib_1.__decorate([
    mobx_1.observable
], GraphQLTransport.prototype, "notification", void 0);
tslib_1.__decorate([
    mobx_1.observable
], GraphQLTransport.prototype, "presence", void 0);
tslib_1.__decorate([
    mobx_1.observable
], GraphQLTransport.prototype, "rosterItem", void 0);
tslib_1.__decorate([
    mobx_1.observable
], GraphQLTransport.prototype, "botVisitor", void 0);
tslib_1.__decorate([
    mobx_1.action
], GraphQLTransport.prototype, "login", null);
tslib_1.__decorate([
    mobx_1.action
], GraphQLTransport.prototype, "authenticate", null);
tslib_1.__decorate([
    mobx_1.action
], GraphQLTransport.prototype, "unsubscribeBotVisitors", null);
exports.GraphQLTransport = GraphQLTransport;
function convertImage(image) {
    return image ? { id: image.trosUrl, url: image.thumbnailUrl } : null;
}
function convertProfile(_a) {
    var { avatar, bots, followers, followed } = _a, data = tslib_1.__rest(_a, ["avatar", "bots", "followers", "followed"]);
    // console.log('convertProfile', bots, followers, followed, data)
    return Object.assign({ avatar: convertImage(avatar), botsSize: bots.totalCount, followersSize: followers.totalCount, followedSize: followed.totalCount }, data);
}
function convertBot(_a) {
    var { lat, lon, image, addressData, isPublic, owner, items, visitors, subscriberCount, visitorCount, guestCount, subscribers } = _a, data = tslib_1.__rest(_a, ["lat", "lon", "image", "addressData", "isPublic", "owner", "items", "visitors", "subscriberCount", "visitorCount", "guestCount", "subscribers"]);
    try {
        const relationships = subscribers.edges.length ? subscribers.edges[0].relationships : [];
        const contains = (relationship) => relationships.indexOf(relationship) !== -1;
        return Object.assign({}, data, { owner: convertProfile(owner), image: convertImage(image), addressData: addressData ? JSON.parse(addressData) : {}, totalItems: items ? items.totalCount : 0, followersSize: subscriberCount.totalCount - 1, visitors: visitors ? visitors.edges.map(rec => convertProfile(rec.node)) : undefined, visitorsSize: visitorCount.totalCount, guestsSize: guestCount.totalCount, location: { latitude: lat, longitude: lon }, visibility: isPublic ? Bot_1.VISIBILITY_PUBLIC : Bot_1.VISIBILITY_OWNER, guest: contains('GUEST'), visitor: contains('VISITOR'), isSubscribed: contains('SUBSCRIBED') });
    }
    catch (e) {
        // console.error('ERROR CONVERTING:', arguments[0], e)
    }
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
//# sourceMappingURL=GraphQLTransport.js.map