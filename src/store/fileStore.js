// @flow

import {types, getEnv} from 'mobx-state-tree';
import {when, reaction} from 'mobx';
import assert from 'assert';

// import * as log from '../utils/log';
import Persistable from './compose/Persistable';
import File from '../modelV2/File';

const FileStore = Persistable.named('FileStore')
  .props({
    files: types.map(File),
  })
  .actions((self) => {
    const {fs, getImageSize} = getEnv(self);

    function create(id: ?string, data: ?Object, lazy: boolean = false): File {
      if (!id) {
        return new File();
      }
      self.files.put({id, ...data});
      if (!this.files[id]) {
        this.files[id] = new File(id, lazy);
      }
      // assign additional data
      if (data) {
        if (data.item) {
          this.files[id].item = data.item;
        }
        if (data.isNew) {
          this.files[id].isNew = data.isNew;
        }
        // Object.assign(this.files[id], data);
      }
      return this.files[id];
    }

    function download(file: File) {
      if (!file.loaded && !file.loading && file.id) {
        downloadFromUrl(file.id)
          .then(file.load)
          .catch((e) => {
            file.load(null, e);
          });
      }
      file.loading = true;
    }

    async function downloadFromUrl(url: string): Object {
      assert(url, 'URL should be defined');
      const folder = `${fs.CachesDirectoryPath}/${url.split('/').slice(-1)[0]}`;
      const fileName = `${folder}/` + 'file.jpeg';
      const res = {uri: fileName, contentType: 'image/jpeg'};
      if (await fs.fileExists(fileName)) {
        const response = await getImageSize(fileName);
        if (response) {
          res.width = response.width;
          res.height = response.height;
          res.cached = true;
          return res;
        }
      }
      (await fs.fileExists(folder)) || (await fs.mkdir(folder));
      // TODO: file service
      // const iq = $iq({type: 'get'})
      //   .c('download-request', {xmlns: NS})
      //   .c('id', {})
      //   .t(url);
      // let data = await xmpp.sendIQ(iq);
      // if (!data) {
      //   throw 'invalid data';
      // }
      // if (!data.download) {
      //   log.log('file data should be defined', data, {level: log.levels.WARNING});
      //   return;
      // }
      // data = data.download;
      // assert(data.url, 'data.url should be defined');
      // const headers = {};
      // if (data.headers && data.headers.header) {
      //   let arr = data.headers.header;
      //   if (!Array.isArray(arr)) {
      //     arr = [arr];
      //   }
      //   for (const header of arr) {
      //     headers[header.name] = header.value;
      //   }
      // }
      // try {
      //   await downloadHttpFile(data.url, fileName, headers);
      // } catch (e) {
      //   log.log('ERROR: ', e, ' remove file', {level: log.levels.ERROR});
      //   await fs.unlink(fileName);
      //   throw e;
      // }
      // res.cached = false;
      // const response = await getImageSize(fileName);
      // if (response) {
      //   res.width = response.width;
      //   res.height = response.height;
      // }
      return res;
    }

    return {create, download};
  });

export default FileStore;
