require("../strophe");
var Strophe = global.Strophe;
import Utils from '../utils';
import assert from 'assert';
import {HOST, isTesting} from '../../../globals';
const NS = 'hippware.com/hxep/http-file';
/***
 * This class adds roster functionality to standalone XMPP service
 */
export default class  {
    constructor(service){
        this.service = service;
        if (!service){
            throw new Error("No xmpp service is defined for plugin");
        }
        this.host = this.service.host;
        this.uploadId = null;
        this._onUploadResponseReceived = this._onUploadResponseReceived.bind(this);
        this._uploadFile = this._uploadFile.bind(this);
        this.requestUpload = this.requestUpload.bind(this);
        if (!this.host){
            throw new Error("HOST is not defined");
        }
        Strophe.addNamespace('HTTPFILEX', 'hippware.com/hxep/http-file');
    }

    _onUploadResponseReceived(stanza) {
        if (this.service.delegate && this.service.delegate.onUploadResponseReceived){
            this._uploadFile(stanza.upload);
            this.service.delegate.onUploadResponseReceived(stanza);
        }
    }

    _uploadFile(data){
        if (data){
            data.accessURL = "tros:"+this.service.username+"@"+data.jid;
            let method = data.method;
            let url = data.url;

            let request = new XMLHttpRequest();
            request.open(method, url, true);
            let formData = new FormData();
            let headers = {};
            if (data.headers && data.headers.header){
                for (let header of data.headers.header){
                    headers[header.name] = header.value;
                    if (header.name !== "content-type"){
                        request.setRequestHeader(header.name, header.value);
                    }
                }
            }
            let contentType = headers["content-type"];
            delete headers["content-type"];

            const onSuccess = this.service.delegate && this.service.delegate.onUploadFileSuccess;
            const onError = this.service.delegate && this.service.delegate.onUploadFileFailure;

            if (isTesting){
                formData.append("file", this.file.body);
                const URL = require('url');
                url = URL.parse(url);
                formData.submit({host:url.hostname, port:url.port, path:url.path, headers, contentType }, (err,res)=>{
                    if (err){
                        onError && onError(err);
                    } else {
                        onSuccess && onSuccess(data);
                    }
                    res.resume();
                });
            } else {
                formData.append("file", this.file);
                request.onreadystatechange = function (oEvent) {
                    if (request.readyState === 4) {
                        if (request.status === 200) {
                            console.log("Successful upload");
                            onSuccess && onSuccess(data);
                        } else {
                            console.log("Error upload");
                            onError && onError(request.statusText);
                        }
                    }
                };
                request.send(formData);
            }
        } else {
            console.log("Data is empty, cannot upload");
        }
    }

    onConnected(username, password){
        console.log("CONNECTED USERNAME:", username);
        this.username = username;
    }

    onIQ(stanza){
        const id = stanza.id;
        if (id == this.uploadId){
            this._onUploadResponseReceived(stanza);
        }
    }

    /**
     * Send file upload request
     */
    requestUpload({file, size, width, height, purpose}){
        assert(file, "file should be defined");
        assert(file.name, "file.name should be defined");
        assert(size, "size should be defined");
        assert(file.type, "file.type should be defined");
        assert(width, "width should be defined");
        assert(height, "height should be defined");
        if (!purpose){
            purpose = 'avatar:'+this.username + '@' + HOST;
        }
        this.uploadId = Utils.getUniqueId('file');
        this.file = file;
        const iq = $iq({type: 'set', to:HOST, id: this.uploadId})
            .c('upload-request', {xmlns: NS})
                .c('filename', {}).t(file.name).up()
                .c('size', {}).t(size).up()
                .c('mime-type', {}).t(file.type).up()
                .c('width', {}).t(width).up()
                .c('height', {}).t(height).up()
                .c('purpose', {}).t(purpose);

        this.service.sendIQ(iq);
    }



}


