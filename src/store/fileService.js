// @flow

import fs, {MainBundlePath} from 'react-native-fs';
import {Image} from 'react-native';

export class FileService {
  get tempDir() {
    return fs.CachesDirectoryPath;
  }

  fileExists(filePath) {
    return fs.exists(filePath);
  }

  mkdir(folder) {
    return fs.mkdir(folder);
  }

  async getImageSize(uri: string) {
    return new Promise((resolve, reject) =>
      Image.getSize(`file://${uri}`, (width, height) => {
        if (!width || !height) {
          console.log('Invalid image file:', uri);
          resolve();
        } else {
          resolve({width, height});
        }
      }));
  }

  async downloadHttpFile(fromUrl: string, toFile: string, headers: any) {
    const {promise} = fs.downloadFile({fromUrl, toFile, headers});
    const {statusCode} = await promise;
    if (statusCode !== 200) {
      throw `Cannot download file ${fromUrl}`;
    }
  }
  async removeFile(name: string) {
    await fs.unlink(name);
  }
}

const fileService = new FileService();
export default fileService;
