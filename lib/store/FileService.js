"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
function upload({ method, headers, url, file }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open(method, url, true);
            const resheaders = {};
            let headerArr = headers.header ? headers.header : [];
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
    });
}
exports.upload = upload;
//# sourceMappingURL=FileService.js.map