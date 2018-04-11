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
// TODO use GraphQL fragment for this?
const PROFILE_PROPS = 'id firstName lastName handle';
const BOT_PROPS = `id title address isPublic: public addressData description geofence image public radius server shortname 
  type lat lon owner { ${PROFILE_PROPS} } 
  items { totalCount }
  guestCount: subscribers(first:0 type:GUEST){ totalCount }
  visitorCount: subscribers(first:0 type:VISITOR){ totalCount }
  subscriberCount: subscribers(first:0 type:SUBSCRIBER){ totalCount }
`;
class GraphQLTransport {
    constructor(resource) {
        this.subscriptions = {};
        this.connected = false;
        this.connecting = false;
        this.resource = resource;
    }
    login(user, password, host) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (user) {
                this.username = user;
            }
            if (password) {
                this.password = password;
            }
            if (host) {
                this.host = host;
            }
            this.socket = new phoenix_1.Socket(`wss://${this.host}/graphql`);
            // todo: implement login when it's ready
            this.client = new apollo_client_1.ApolloClient({
                link: socket_apollo_link_1.createAbsintheSocketLink(AbsintheSocket.create(this.socket)),
                cache: new apollo_cache_inmemory_1.InMemoryCache(),
                defaultOptions: {
                    watchQuery: {
                        fetchPolicy: 'network-only',
                        errorPolicy: 'ignore'
                    },
                    query: {
                        fetchPolicy: 'network-only',
                        errorPolicy: 'all'
                    }
                }
            });
            try {
                const res = yield this.client.mutate({
                    mutation: graphql_tag_1.default `
          mutation authenticate($user: String!, $token: String!) {
            authenticate(user: $user, token: $token) {
              id
            }
          }
        `,
                    variables: { user, token: password }
                });
                return !!res.data && res.data.authenticate !== null;
            }
            catch (err) {
                return false;
            }
        });
    }
    loadProfile(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const res = yield this.client.query({
                query: graphql_tag_1.default `
        query LoadProfile {
          user(id: "${user}") {
            id
            handle
            phoneNumber
            email
          }
        }
      `
            });
            return res.data.user;
        });
    }
    requestRoster() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    generateId() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    loadBot(id, server) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const res = yield this.client.query({
                query: graphql_tag_1.default `
        {
          bot(id: "${id}") {
            ${BOT_PROPS}
            subscribers(first: 1 id: "${this.username}") {
              edges {
                relationships
              }
            }
          }
        }
      `
            });
            return convertBot(res.data.bot);
        });
    }
    _loadBots(relationship, userId, after, max = 10) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const res = yield this.client.query({
                query: graphql_tag_1.default `
        {
          user(id: "${userId}") {
            id
            bots(first: ${max} after: ${after ? `"${after}"` : null} relationship: ${relationship}) {
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
      `
            });
            const { bots } = res.data.user;
            const list = bots.edges.map((e) => e.node);
            return { list, cursor: bots.edges.length ? bots.edges[bots.edges.length - 1].cursor : null, count: bots.totalCount };
        });
    }
    setLocation(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const res = yield this.client.mutate({
                mutation: graphql_tag_1.default `
        mutation setLocation($latitude: Float!, $longitude: Float!, $accuracy: Float!, $resource: String!) {
          setLocation(location: {accuracy: $accuracy, lat: $latitude, lon: $longitude, resource: $resource}) {
            result
            successful
          }
        }
      `,
                variables: params
            });
            return res.data.setLocation.successful;
        });
    }
    subscribeBotVisitors(botId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.subscriptions[botId]) {
                this.subscriptions[botId]();
            }
            console.log('SUBSCRIBE BOT VISITORS', botId);
            this.subscriptions[botId] = yield this.client
                .subscribe({
                query: graphql_tag_1.default `
          subscription botVisitors($id: String!) {
            botVisitors(id: $id) {
              subscribers(first: 100, type: VISITOR) {
                edges {
                  node {
                    avatar
                    firstName
                    lastName
                    handle
                    id
                  }
                }
              }
            }
          }
        `,
                variables: { id: botId }
            })
                .subscribe({
                next: (result) => {
                    console.log('SUBSCRIPTION RESULT:', JSON.stringify(result));
                    // this.botVisitor = {...result.data.botVisitors.subscribers.edges[0].node, botId}
                    // disabled until new subscription is not ready
                }
            });
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
    loadBotSubscribers(id, lastId, max = 10) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    loadBotGuests(id, lastId, max = 10) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    loadBotVisitors(id, lastId, max = 10) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    loadBotPosts(id, before) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    shareBot(id, server, recepients, message, action) { }
    register(data, host, providerName) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    testRegister({ phoneNumber }, host) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    disconnect() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.socket) {
                this.socket.disconnect();
            }
        });
    }
    requestProfiles(users) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    updateProfile(d) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    lookup(handle) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    remove() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.disconnect();
        });
    }
    downloadURL(tros) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    downloadFile(tros, name, sourceUrl) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    downloadThumbnail(url, tros) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    downloadTROS(tros) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    requestUpload(params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    follow(username) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    unfollow(username) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    block(username) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    unblock(username) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    subscribeBot(id, geofence) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    unsubscribeBot(id, geofence) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    loadChats(max) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    removeBot(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    removeBotPost(id, postId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    updateBot(bot) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    loadRelations(userId, relation, lastId, max) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    publishBotPost(botId, post) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    geosearch(props) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    sendMessage(msg) { }
    loadChat(userId, lastId, max) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    subscribeToHomestream(version) { }
    enablePush(token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    disablePush() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    loadUpdates(ver) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
        });
    }
    loadHomestream(lastId, max) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            throw 'Not supported';
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
exports.GraphQLTransport = GraphQLTransport;
function convertBot(_a) {
    var { lat, lon, isPublic, items, subscriberCount, visitorCount, guestCount, subscribers } = _a, data = tslib_1.__rest(_a, ["lat", "lon", "isPublic", "items", "subscriberCount", "visitorCount", "guestCount", "subscribers"]);
    const relationships = subscribers.edges.length ? subscribers.edges[0].relationships : [];
    const contains = (relationship) => relationships.indexOf(relationship) !== -1;
    return Object.assign({}, data, { totalItems: items ? items.totalCount : 0, followersSize: subscriberCount.totalCount, visitorsSize: visitorCount.totalCount, guestsSize: guestCount.totalCount, location: { latitude: lat, longitude: lon }, visibility: isPublic ? Bot_1.VISIBILITY_PUBLIC : Bot_1.VISIBILITY_OWNER, guest: contains('GUEST'), visitor: contains('VISITOR'), isSubscribed: contains('SUBSCRIBED') });
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