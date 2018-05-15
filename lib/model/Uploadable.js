"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const Base_1 = require("./Base");
function createUploadable(property, access) {
    return mobx_state_tree_1.types
        .compose(Base_1.Base, mobx_state_tree_1.types.model('Uploadable', {}))
        .volatile(() => ({
        uploading: false,
        uploaded: false,
        uploadError: '',
    }))
        .actions((self) => ({
        upload: mobx_state_tree_1.flow(function* ({ file, size, width, height }) {
            if (!self.uploading) {
                try {
                    self.uploaded = false;
                    self.uploading = true;
                    const url = yield self.service._requestUpload({
                        file,
                        size,
                        width,
                        height,
                        access: typeof access === 'function' ? access(self) : access,
                    });
                    self.service.files.get(url);
                    self.uploaded = true;
                    self[property] = url;
                    // show local image first
                    if (file.uri) {
                        self[property].setSource({ uri: file.uri, size, width, height });
                    }
                }
                catch (e) {
                    // console.error(e) TODO
                    self.uploadError = e;
                }
                finally {
                    self.uploading = false;
                }
            }
        }),
    }));
}
exports.createUploadable = createUploadable;
//# sourceMappingURL=Uploadable.js.map