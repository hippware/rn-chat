// @flow

import {Image} from 'react-native';
import * as log from './log';

global.fs = require('react-native-fs');

global.tempDir = fs.CachesDirectoryPath;
global.downloadHttpFile = async (fromUrl, toFile, headers) => {
  const promise = fs.downloadFile({fromUrl, toFile, headers}).promise;
  const {statusCode} = await promise;
  if (statusCode != 200) {
    throw 'Cannot upload file';
  }
};
global.fileExists = fs.exists;
global.readFile = fs.readFile;
global.writeFile = fs.writeFile;
global.mkdir = fs.mkdir;

global.getImageSize = uri =>
  new Promise((resolve, reject) =>
    Image.getSize(`file://${uri}`, (width, height) => {
      if (!width || !height) {
        log.log('Invalid file:', uri);
        resolve();
      } else {
        resolve({width, height});
      }
    }),
  );
