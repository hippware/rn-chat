// @flow

import * as xmpp from './xmpp/xmpp';
import assert from 'assert';
import {action, autorunAsync, when} from 'mobx';
import autobind from 'autobind-decorator';
import factory from '../factory/fileFactory';
import * as log from '../utils/log';

const NS = 'hippware.com/hxep/http-file';

@autobind
export class FileStore {
  @action
  create = (id: string) => {
    return factory.create(id);
  };

  async downloadFile(url) {
    assert(url, 'URL should be defined');
    const folder = `${tempDir}/${url.split('/').slice(-1)[0]}`;
    const fileName = `${folder}/` + 'file.jpeg';
    const res = {uri: fileName, contentType: 'image/jpeg'};
    if (await fileExists(fileName)) {
      const response = await getImageSize(fileName);
      if (response) {
        res.width = response.width;
        res.height = response.height;
        res.cached = true;
        return res;
      }
    }
    (await fileExists(folder)) || (await mkdir(folder));
    const iq = $iq({type: 'get'})
      .c('download-request', {xmlns: NS})
      .c('id', {})
      .t(url);

    let data = await xmpp.sendIQ(iq);
    if (!data) {
      throw 'invalid data';
    }
    if (!data.download) {
      log.log('file data should be defined', data, {level: log.levels.WARNING});
      return;
    }
    data = data.download;
    assert(data.url, 'data.url should be defined');
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
    try {
      await downloadHttpFile(data.url, fileName, headers);
    } catch (e) {
      log.log('ERROR: ', e, ' remove file', {level: log.levels.ERROR});
      await fs.unlink(fileName);
      throw e;
    }
    res.cached = false;
    const response = await getImageSize(fileName);
    if (response) {
      res.width = response.width;
      res.height = response.height;
    }
    return res;
  }

  async requestUpload({file, size, width, height, purpose, access}) {
    assert(file, 'file should be defined');
    assert(file.name, 'file.name should be defined');
    assert(size, 'size should be defined');
    assert(file.type, 'file.type should be defined');
    assert(width, 'width should be defined');
    assert(height, 'height should be defined');
    const iq = $iq({type: 'set'})
      .c('upload-request', {xmlns: NS})
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
    const stanza = await xmpp.sendIQ(iq);
    const data = {...stanza.upload, file};
    await this.upload(data);
    log.log('DATA:', data, {level: log.levels.INFO});
    assert(data.reference_url, 'reference_url is not defined');
    return data.reference_url;
  }

  upload({method, headers, url, file}): Promise<void> {
    assert(url, 'url should be defined');
    assert(file, 'file should be defined');
    assert(headers, 'headers should be defined');
    assert(method, 'method should be defined');
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
      request.send(process.env.NODE_ENV === 'test' ? file.body : {uri: file.uri});
      request.onreadystatechange = function (oEvent) {
        if (request.readyState === 4) {
          if (request.status === 200) {
            resolve();
          } else {
            log.log('Error upload', request.responseText, {level: log.levels.ERROR});
            reject(new Error(`fileStore.upload error: ${request.responseText}`));
          }
        }
      };
    });
  }
}

export default new FileStore();
