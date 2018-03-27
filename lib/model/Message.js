"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const Profile_1 = require("./Profile");
const File_1 = require("./File");
const utils = require("../transport/utils");
const Base_1 = require("./Base");
const Uploadable_1 = require("./Uploadable");
const Timeable_1 = require("./Timeable");
const moment = require('moment');
exports.Message = mobx_state_tree_1.types
    .compose(mobx_state_tree_1.types.compose(Base_1.Base, Timeable_1.Timeable, Uploadable_1.createUploadable('media', (self) => `user:${self.to}@${self.service.host}`)), mobx_state_tree_1.types.model('Message', {
    id: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, utils.generateID),
    archiveId: '',
    from: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.reference(Profile_1.Profile)),
    to: '',
    media: File_1.FileRef,
    unread: false,
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
    clear: () => {
        self.media = null;
        self.body = '';
        self.id = utils.generateID();
    },
    setBody: (text) => {
        self.body = text;
    }
}))
    .actions(self => ({
    send: () => {
        self.time = Date.now();
        self.service._sendMessage(self);
        self.clear();
    }
}));
//# sourceMappingURL=Message.js.map