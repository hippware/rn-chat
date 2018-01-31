"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const Base_1 = require("./Base");
const utils_1 = require("./utils");
const File_1 = require("./File");
exports.UploadFile = mobx_state_tree_1.types
    .compose(Base_1.Base, mobx_state_tree_1.types.model('UploadFile', {
    file: File_1.FileSource,
    width: mobx_state_tree_1.types.number,
    height: mobx_state_tree_1.types.number,
    size: mobx_state_tree_1.types.number,
    access: mobx_state_tree_1.types.string,
    target: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.reference(File_1.File))
}))
    .named('UploadFile')
    .volatile(self => ({
    uploading: false,
    error: ''
}))
    .views(self => ({
    get uploaded() {
        return self.target !== null;
    }
}))
    .actions(self => ({
    afterAttach: mobx_state_tree_1.flow(function* () {
        yield utils_1.waitFor(() => self.service.connected);
        if (!self.uploaded && !self.uploading) {
            try {
                self.uploading = true;
                self.target = self.service.createFile(yield self.service.requestUpload(self));
            }
            catch (e) {
                self.error = e;
            }
            finally {
                self.uploading = false;
            }
        }
    })
}));
//# sourceMappingURL=UploadFile.js.map