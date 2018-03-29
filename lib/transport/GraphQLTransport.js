"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// import {observable, when} from 'mobx'
// import * as Utils from './utils'
const apollo_client_1 = require("apollo-client");
const apollo_link_http_1 = require("apollo-link-http");
const apollo_cache_inmemory_1 = require("apollo-cache-inmemory");
const graphql_tag_1 = require("graphql-tag");
const mobx_1 = require("mobx");
class GraphQLTransport {
    constructor(resource) {
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
            // todo: implement login when it's ready
            this.client = new apollo_client_1.ApolloClient({
                link: new apollo_link_http_1.HttpLink({
                    // use http link for now but may need websockets client later to handle subscriptions
                    // https://www.apollographql.com/docs/link/links/ws.html
                    uri: `https://${this.host}/graphql`,
                    headers: {
                        'x-auth-user': this.username,
                        'x-auth-token': this.password
                    }
                }),
                cache: new apollo_cache_inmemory_1.InMemoryCache()
            });
            return true;
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
    loadOwnBots(userId, after, max = 10) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // const afterClause = after ? `after: "${after}"` : ''
            const res = yield this.client.query({
                query: graphql_tag_1.default `
        query LoadOwnBots {
          currentUser {
            bots(first: ${max}, relationship: OWNED) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              totalCount
              edges {
                cursor
                node {
                  id
                  title
                  address
                  addressData
                  description
                  geofence
                  image
                  public
                  radius
                  server
                  shortname
                  type
                }
              }
            }
          }
        }
      `
            });
            const list = res.data.currentUser.bots.edges.map((e) => e.node);
            return { list, count: list.length };
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
    loadSubscribedBots(userId, lastId, max = 10) {
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
            throw 'Not supported';
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
            throw 'Not supported';
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
    loadBot(id, server) {
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
exports.GraphQLTransport = GraphQLTransport;
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