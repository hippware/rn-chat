require("./strophe");
import Utils from "./utils";
import assert from "assert";
import service from "./xmpp";
import {isTesting} from "../../globals";

const NS = "hippware.com/hxep/http-file";
import querystring from 'querystring';

function uploadFile(data, file) {
    assert(data, "data should be defined");
    assert(data.url, "data.url should be defined");
    assert(file, "file should be defined");
    return new Promise((resolve, reject)=> {
        let method = data.method;
        let url = data.url;

        let request = new XMLHttpRequest();
        request.open(method, url, true);
        let formData = new FormData();
        let headers = {};
        if (data.headers && data.headers.header) {
            for (let header of data.headers.header) {
                headers[header.name] = header.value;
                if (header.name !== "content-type") {
                    request.setRequestHeader(header.name, header.value);
                }
            }
        }
        let contentType = headers["content-type"];
        delete headers["content-type"];

        if (isTesting) {
            formData.append("file", file.body);
            const URL = require("url");
            url = URL.parse(url);
            formData.submit({host: url.hostname, port: url.port, path: url.path, headers, contentType}, (err, res)=> {
                if (res.statusCode >= 400){
                    reject(res.statusMessage);
                } else if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
                res.resume();
            });
        } else {
            formData.append("file", file);
            request.onreadystatechange = function (oEvent) {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        console.log("Successful upload");
                        resolve(data);
                    } else {
                        console.log("Error upload");
                        reject(request.responseText);
                    }
                }
            };
            request.send(formData);
        }
    });
}

class FileService {
    constructor(service){
        this.requestUpload = this.requestUpload.bind(this);
        this.requestDownload = this.requestDownload.bind(this);
        this.cache = {};
    }

    async requestDownload(url){
        if (this.cache[url]){
            console.log("IMAGE CACHE=", url);
            return this.cache[url];
        }
        console.log("REQUEST DOWNLOADING FILE", url);
        assert(url, "url should be defined");
        const iq = $iq({type: "get", to: service.host})
            .c("download-request", {xmlns: NS})
                .c("id", {}).t(url);

        let data = await service.sendIQ(iq);
        data = data.download;
        assert(data, "data should be defined");
        assert(data.url, "data.url should be defined");
        let headers = {};
        if (data.headers && data.headers.header) {
            let arr = data.headers.header;
            if (!Array.isArray(arr)){
                arr = [arr];
            }
            for (let header of arr) {
                headers[header.name] = header.value;
            }
        }
        const fileName = tempDir  + '/' + data.url.split('/').slice(-1)[0];
        const ext = fileName.split('.')[1];
        if (await fileExists(fileName)){
            console.log("CACHED!", fileName);
        } else {
            const url2 = data.url.replace(/ /g,"%20");
            await downloadHttpFile(url2, fileName, headers);
        }
        const res = {uri: fileName, contentType:'image/'+ext};
        this.cache[url] = res;
        return res;
    }

    /**
     * Send file upload request
     */
    async requestUpload({file, size, width, height, purpose}){
        assert(file, "file should be defined");
        assert(file.name, "file.name should be defined");
        assert(size, "size should be defined");
        assert(file.type, "file.type should be defined");
        assert(width, "width should be defined");
        assert(height, "height should be defined");
        if (!purpose){
            purpose = "avatar:"+service.username + "@" + service.host;
        }
        const iq = $iq({type: "set", to: service.host})
            .c("upload-request", {xmlns: NS})
            .c("filename", {}).t(file.name).up()
            .c("size", {}).t(size).up()
            .c("mime-type", {}).t(file.type).up()
            .c("width", {}).t(width).up()
            .c("height", {}).t(height).up()
            .c("purpose", {}).t(purpose);

        let data = await service.sendIQ(iq);
        assert(data.upload, "No upload data returned");
        let res = await uploadFile(data.upload, file);
        return data.upload;

    }
}

export default new FileService();


