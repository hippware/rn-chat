"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
// tslint:disable-next-line:no_unused-variable
const mobx_1 = require("mobx");
const MessageStore_1 = require("./MessageStore");
const Bot_1 = require("../model/Bot");
exports.default = mobx_state_tree_1.types
    .compose(MessageStore_1.default, mobx_state_tree_1.types.model('XmppBot', {
    bots: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.map(Bot_1.Bot), {})
}))
    .named('BotStore')
    .actions(self => ({
    createBot: (id, bot = {}) => self.bots.get(id) || (self.bots.put(Object.assign({}, bot, { id })) && self.bots.get(id))
}))
    .actions(self => {
    const { logger } = mobx_state_tree_1.getEnv(self);
    let handler;
    return {
        afterCreate: () => {
            handler = mobx_1.autorun('BotStore', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                try {
                    if (self.connected && self.roster.length) {
                        yield self.loadChats();
                    }
                }
                catch (e) {
                    logger.log('error loadChats autorun:', e);
                }
            }));
        },
        beforeDestroy: () => {
            if (handler) {
                handler();
            }
        }
    };
});
//# sourceMappingURL=BotStore.js.map