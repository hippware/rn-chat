"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const Base_1 = require("./Base");
const utils_1 = require("./utils");
exports.FileSource = mobx_state_tree_1.types
    .model('FileSource', {
    uri: mobx_state_tree_1.types.string,
    contentType: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.string),
    width: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.number),
    height: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.number),
    cached: false
})
    .named('FileSource');
exports.File = mobx_state_tree_1.types
    .compose(Base_1.Base, mobx_state_tree_1.types.model('File', {
    id: mobx_state_tree_1.types.identifier(mobx_state_tree_1.types.string),
    item: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.string),
    source: mobx_state_tree_1.types.maybe(exports.FileSource),
    thumbnail: mobx_state_tree_1.types.maybe(exports.FileSource),
    url: '',
    isNew: false
}))
    .named('File')
    .volatile(self => ({
    loading: false,
    error: ''
}))
    .views(self => ({
    get loaded() {
        return self.source !== null;
    }
}))
    .actions(self => {
    return {
        downloadThumbnail: mobx_state_tree_1.flow(function* () {
            const service = self.service;
            if (!self.loading && !self.thumbnail && self.url) {
                try {
                    self.error = '';
                    self.loading = true;
                    self.thumbnail = yield self.service.downloadThumbnail(self.url, self.id);
                    self.url = '';
                }
                catch (e) {
                    self.error = e;
                    console.warn(e);
                }
                finally {
                    self.loading = false;
                }
            }
        }),
        download: mobx_state_tree_1.flow(function* () {
            if (!self.source && !self.loading) {
                try {
                    self.error = '';
                    self.loading = true;
                    self.source = yield self.service.downloadTROS(self.id);
                    self.thumbnail = self.source;
                }
                catch (e) {
                    console.warn(e);
                    self.error = e;
                }
                finally {
                    self.loading = false;
                }
            }
        })
    };
})
    .actions(self => ({
    afterAttach: mobx_state_tree_1.flow(function* () {
        yield utils_1.waitFor(() => self.service.connected);
        if (!self.thumbnail) {
            if (self.url) {
                yield self.downloadThumbnail();
            }
            else {
                yield self.download();
            }
        }
    })
}));
//# sourceMappingURL=File.js.map