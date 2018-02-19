"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const File_1 = require("./File");
const Profile_1 = require("./Profile");
const Base_1 = require("./Base");
const Loadable_1 = require("./Loadable");
const PaginableList_1 = require("./PaginableList");
const Uploadable_1 = require("./Uploadable");
const Timeable_1 = require("./Timeable");
exports.BotPost = mobx_state_tree_1.types
    .compose(mobx_state_tree_1.types.compose(Base_1.Base, Timeable_1.Timeable, Loadable_1.Loadable), Uploadable_1.createUploadable('image', (self) => `redirect:${self.service.host}/bot/${mobx_state_tree_1.getParent(mobx_state_tree_1.getParent(mobx_state_tree_1.getParent(self))).id}`), mobx_state_tree_1.types.model('BotPost', {
    id: mobx_state_tree_1.types.identifier(mobx_state_tree_1.types.string),
    content: '',
    title: '',
    image: File_1.FileRef,
    profile: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.reference(Profile_1.Profile))
}))
    .named('BotPost')
    .actions(self => ({
    setContent: (content) => (self.content = content),
    setTitle: (title) => (self.title = title),
    publish: mobx_state_tree_1.flow(function* () {
        yield self.service._publishBotPost(self);
    })
}));
exports.BotPostPaginableList = PaginableList_1.createPaginable(exports.BotPost);
//# sourceMappingURL=BotPost.js.map