"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const File_1 = require("../model/File");
const RegisterStore_1 = require("./RegisterStore");
const NS = 'hippware.com/hxep/http-file';
exports.FileStore = mobx_state_tree_1.types
    .compose(RegisterStore_1.default, mobx_state_tree_1.types.model('XmppFile', {
    files: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.map(File_1.File), {})
}))
    .named('FileStore')
    .actions(self => ({
    _upload: mobx_state_tree_1.flow(function* ({ method, headers, url, file }) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open(method, url, true);
            const resheaders = {};
            let headerArr = headers.header ? headers.header : [];
            if (!Array.isArray(headerArr)) {
                headerArr = [headerArr];
            }
            for (const header of headerArr) {
                resheaders[header.name] = header.value;
                request.setRequestHeader(header.name, header.value);
            }
            request.send(process.env.NODE_ENV === 'test' ? file.body : { uri: file.uri });
            request.onreadystatechange = function (oEvent) {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        resolve();
                    }
                    else {
                        reject(new Error(`fileStore.upload error: ${request.responseText}`));
                    }
                }
            };
        });
    })
}))
    .actions(self => {
    return {
        downloadURL: mobx_state_tree_1.flow(function* (tros) {
            const iq = $iq({ type: 'get' })
                .c('download-request', { xmlns: NS })
                .c('id', {})
                .t(tros);
            let data = yield self.sendIQ(iq);
            if (!data) {
                throw 'invalid data';
            }
            if (!data.download) {
                throw 'file data should be defined';
            }
            data = data.download;
            const headers = {};
            if (data.headers && data.headers.header) {
                let arr = data.headers.header;
                if (!Array.isArray(arr)) {
                    arr = [arr];
                }
                for (const header of arr) {
                    headers[header.name] = header.value;
                }
            }
            return { url: data.url, headers };
        })
    };
})
    .actions(self => {
    const { fileService } = mobx_state_tree_1.getEnv(self);
    return {
        downloadFile: mobx_state_tree_1.flow(function* (tros, name, sourceUrl) {
            const folder = `${fileService.tempDir}/${tros.split('/').slice(-1)[0]}`;
            if (!(yield fileService.fileExists(folder))) {
                yield fileService.mkdir(folder);
            }
            const mainFileName = `${folder}/main.jpeg`;
            const fileName = `${folder}/${name}.jpeg`;
            const res = { uri: fileName, contentType: 'image/jpeg' };
            // check main file first
            if (yield fileService.fileExists(mainFileName)) {
                const response = yield fileService.getImageSize(mainFileName);
                if (response) {
                    res.uri = mainFileName;
                    res.width = response.width;
                    res.height = response.height;
                    res.cached = true;
                    return res;
                }
            }
            if (mainFileName !== fileName && (yield fileService.fileExists(fileName))) {
                const response = yield fileService.getImageSize(fileName);
                if (response) {
                    res.width = response.width;
                    res.height = response.height;
                    res.cached = true;
                    return res;
                }
            }
            try {
                let url = sourceUrl, headers = null;
                if (!sourceUrl) {
                    const data = yield self.downloadURL(tros);
                    url = data.url;
                    headers = data.headers;
                }
                yield fileService.downloadHttpFile(url, fileName, headers);
            }
            catch (e) {
                try {
                    yield fileService.removeFile(fileName);
                }
                catch (err) { }
                throw e;
            }
            res.cached = true;
            const response = yield fileService.getImageSize(fileName);
            if (response) {
                res.width = response.width;
                res.height = response.height;
            }
            return res;
        })
    };
})
    .actions(self => {
    return {
        createFile: (id, file = {}) => {
            return self.files.get(id) || (self.files.put(Object.assign({}, file, { id })) && self.files.get(id));
        },
        downloadThumbnail: mobx_state_tree_1.flow(function* (url, tros) {
            return yield self.downloadFile(tros, 'thumbnail', url);
        }),
        downloadTROS: mobx_state_tree_1.flow(function* (tros) {
            return yield self.downloadFile(tros, 'main', '');
        }),
        _requestUpload: mobx_state_tree_1.flow(function* ({ file, size, width, height, access }) {
            const iq = $iq({ type: 'set' })
                .c('upload-request', { xmlns: NS })
                .c('filename', {})
                .t(file.name)
                .up()
                .c('size', {})
                .t(size)
                .up()
                .c('mime-type', {})
                .t(file.type)
                .up()
                .c('width', {})
                .t(width)
                .up()
                .c('height', {})
                .t(height)
                .up();
            if (access) {
                iq.c('access', {}).t(access);
            }
            // pass file to the result
            const stanza = yield self.sendIQ(iq);
            const data = Object.assign({}, stanza.upload, { file });
            yield self._upload(data);
            return data.reference_url;
        })
    };
});
//# sourceMappingURL=FileStore.js.map