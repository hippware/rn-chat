"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const File_1 = require("./File");
const Base_1 = require("./Base");
function createUploadable(property, access) {
    let props = {};
    props[property] = mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.reference(File_1.File));
    return mobx_state_tree_1.types
        .compose(Base_1.Base, mobx_state_tree_1.types.model('Uploadable', props))
        .volatile(self => ({
        uploading: false,
        uploaded: false,
        uploadError: ''
    }))
        .actions((self) => ({
        upload: mobx_state_tree_1.flow(function* ({ file, size, width, height }) {
            if (!self.uploading) {
                try {
                    self.uploaded = false;
                    self.uploading = true;
                    const url = yield self.service._requestUpload({ file, size, width, height, access: typeof access === 'function' ? access(self) : access });
                    self.service.createFile(url);
                    self[property] = url;
                    self.uploaded = true;
                }
                catch (e) {
                    self.uploadError = e;
                }
                finally {
                    self.uploading = false;
                }
            }
        })
    }));
}
exports.createUploadable = createUploadable;
//# sourceMappingURL=Uploadable.js.map