require("../strophe");
var Strophe = global.Strophe;
import Utils from '../utils';
import assert from 'assert';
import {HOST} from '../../../globals';

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
            let method = data.method['#text'];
            let url = data.url['#text'];

            let headers = [];
            // set headers
            if (data.headers && data.headers.header){
                for (let header of data.headers.header){
                    headers.push(header);
                }
            }

            let formData = new FormData();
            formData.append("file", this.file);
            formData.submit(url, (err,res)=>{
                console.log(err, res.statusMessage);
                res.resume();
            });
            sleep(1000);

            //fetch(url, { method, headers, body: formData })
            //    .then(function(res) {
            //        return res.json();
            //    }).then(function(json) {
            //    console.log(json);
            //}).catch((error) => {
            //    console.log("ERROR", error);
            //});

        } else {
            console.log("Data is empty, cannot upload");
        }
    }

    onConnected(username, password){
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
    requestUpload({file, filename, size, mimeType, width, height, purpose}){
        assert(file, "file should be defined");
        assert(filename, "filename should be defined");
        assert(size, "size should be defined");
        assert(mimeType, "mimeType should be defined");
        assert(width, "width should be defined");
        assert(height, "height should be defined");
        if (!purpose){
            purpose = 'avatar:'+this.username + '@' + HOST;
        }
        this.uploadId = Utils.getUniqueId('file');
        this.file = file;
        const iq = $iq({type: 'set', to:HOST, id: this.uploadId})
            .c('upload-request', {xmlns: NS})
                .c('filename', {}).t(filename).up()
                .c('size', {}).t(size).up()
                .c('mime-type', {}).t(mimeType).up()
                .c('width', {}).t(width).up()
                .c('height', {}).t(height).up()
                .c('purpose', {}).t(purpose);

        this.service.sendIQ(iq);
    }



}


