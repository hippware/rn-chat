"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const File_1 = require("./File");
const Profile_1 = require("./Profile");
const PaginableList_1 = require("./PaginableList");
const moment = require('moment');
exports.BotPost = mobx_state_tree_1.types
    .model('BotPost', {
    id: mobx_state_tree_1.types.identifier(mobx_state_tree_1.types.string),
    content: '',
    title: '',
    image: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.reference(File_1.File)),
    profile: mobx_state_tree_1.types.reference(Profile_1.Profile),
    time: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.number, () => Date.now())
})
    .volatile(self => ({
    imageSaving: false
}))
    .views(self => ({
    get date() {
        return new Date(self.time);
    },
    get dateAsString() {
        return moment(self.time).calendar();
    },
    get relativeDateAsString() {
        return moment(self.time).fromNow(true);
    }
}));
exports.BotPostPaginableList = PaginableList_1.createPaginable(exports.BotPost);
//# sourceMappingURL=BotPost.js.map