import xmpp from './xmpp/xmpp';
import assert from "assert";
const NS = "hippware.com/hxep/http-file";
import {action, autorunAsync, when} from 'mobx';
import autobind from 'autobind-decorator';
import {isTesting} from '../globals';
import Model from '../model/Model';
import File from '../model/File';

@autobind
export default class FileStore {
  model: Model;
  
  constructor(model: Model){
    this.model = model;
  }
  
  createFile(url: string){
    const file = new File(url);
    when(()=>this.model.connected && !file.loaded,
      ()=> this.downloadFile(url).then(source => file.load(source)));
    return file;
  }
  
  @action async downloadFile(url) {
    assert(url, "URL should be defined");
    const folder = tempDir + '/' + url.split('/').slice(-1)[0];
    const fileName = folder + '/' + 'file.png';
    let res = {uri: fileName, contentType: 'image/png'};
    if (await fileExists(fileName)) {
      res.cached = true;
      console.log("CACHED!", fileName);
    } else {
      await fileExists(folder) || await mkdir(folder);
      const iq = $iq({type: "get"})
        .c("download-request", {xmlns: NS})
        .c("id", {}).t(url);

      let data = await xmpp.sendIQ(iq);
      data = data.download;
      assert(data, "data should be defined");
      assert(data.url, "data.url should be defined");
      let headers = {};
      if (data.headers && data.headers.header) {
        let arr = data.headers.header;
        if (!Array.isArray(arr)) {
          arr = [arr];
        }
        for (let header of arr) {
          headers[header.name] = header.value;
        }
      }
      await downloadHttpFile(data.url, fileName, headers);
      res.cached = false;
      console.log("DOWNLOADED ", fileName);
    }
    return res;
  }
  
  @action async requestUpload({file, size, width, height, purpose}) {
    console.log("requestUpload", {file, size, width, height, purpose});
    assert(file, "file should be defined");
    assert(file.name, "file.name should be defined");
    assert(size, "size should be defined");
    assert(file.type, "file.type should be defined");
    assert(width, "width should be defined");
    assert(height, "height should be defined");
    assert(purpose, "purpose should be defined");
    const iq = $iq({type: "set"})
      .c("upload-request", {xmlns: NS})
      .c("filename", {}).t(file.name).up()
      .c("size", {}).t(size).up()
      .c("mime-type", {}).t(file.type).up()
      .c("width", {}).t(width).up()
      .c("height", {}).t(height).up()
      .c("purpose", {}).t(purpose);
  
    // pass file to the result
    const stanza = await xmpp.sendIQ(iq);
    const data = {...stanza.upload, file};
    await this.upload(data);
    return data;
  }
  
  upload({method, headers, url, file}) {
    console.log(`uploadFile(${method}, ${url}, ${JSON.stringify(headers)}, ${file})`);
    assert(url, "url should be defined");
    assert(file, "file should be defined");
    assert(headers, "headers should be defined");
    assert(method, "method should be defined");
    return new Promise((resolve, reject)=> {
      let request = new XMLHttpRequest();
      request.open(method, url, true);
      let formData = new FormData();
      let resheaders = {};
      if (headers && headers.header) {
        for (let header of headers.header) {
          resheaders[header.name] = header.value;
          if (header.name !== "content-type") {
            request.setRequestHeader(header.name, header.value);
          }
        }
      }
      let contentType = resheaders["content-type"];
      delete resheaders["content-type"];
    
      if (isTesting) {
        formData.append("file", file.body);
        const URL = require("url");
        const urlData = URL.parse(url);
        formData.submit({
            host: urlData.hostname,
            port: urlData.port,
            path: urlData.path,
            headers: resheaders,
            contentType
          },
          (err, res)=> {
            if (res.statusCode >= 400) {
              reject(res.statusMessage);
            } else if (err) {
              reject(err);
            } else {
              resolve();
            }
            res.resume();
          });
      } else {
        formData.append("file", file);
        request.onreadystatechange = function(oEvent) {
          if (request.readyState === 4) {
            if (request.status === 200) {
              console.log("Successful upload");
              resolve();
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
}
