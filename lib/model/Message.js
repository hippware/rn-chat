"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const Profile_1 = require("./Profile");
const File_1 = require("./File");
const utils_1 = require("../store/utils");
const Base_1 = require("./Base");
const Uploadable_1 = require("./Uploadable");
const moment = require('moment');
exports.Message = mobx_state_tree_1.types
    .compose(Base_1.Base, Uploadable_1.createUploadable('media', (self) => `user:${self.to}@${self.service.host}`), mobx_state_tree_1.types.model('Message', {
    id: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.identifier(mobx_state_tree_1.types.string), utils_1.default.generateID),
    archiveId: '',
    isArchived: false,
    from: mobx_state_tree_1.types.reference(Profile_1.Profile),
    to: '',
    media: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.reference(File_1.File)),
    unread: false,
    time: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.number, () => Date.now()),
    body: ''
}))
    .named('Message')
    .views(self => ({
    get date() {
        return moment(self.time).calendar();
    }
}))
    .actions(self => ({
    read: () => (self.unread = false),
    send: () => self.service._sendMessage(self)
}));
//# sourceMappingURL=Message.js.map