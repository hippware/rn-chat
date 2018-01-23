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
  getImageSize(uri) {
    return new Promise((resolve, reject) =>
      Image.getSize(`file://${uri}`, (width, height) => {
        if (!width || !height) {
          log.log('Invalid file:', uri);
          resolve();
        } else {
          resolve({width, height});
        }
      }));
  }
  async downloadHttpFile(fromUrl, toFile, headers) {
    const promise = fs.downloadFile({fromUrl, toFile, headers}).promise;
    const {statusCode} = await promise;
    alert(statusCode);
    if (statusCode != 200) {
      throw 'Cannot upload file';
    }
  }
  async removeFile(name) {
    await fs.unlink(name);
  }
}

const fileService = new FileService();
export default fileService;
