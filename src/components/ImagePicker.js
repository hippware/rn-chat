// @flow

import {ActionSheetIOS} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {log, levels} from '../utils/log';

const createHandler = (callback: Function) => (response: Image) => {
  log('SIZE:', response, response, {level: levels.VERBOSE});
  const source = {
    uri: response.path,
    type: response.mime,
    name: response.path.substring(response.path.lastIndexOf('/') + 1),
    isStatic: true,
  };
  callback(source, response);
};

type Image = {
  data: any,
  height: number,
  width: number,
  mime: String,
  path: String,
  size: number,
};

const IMG_DEFAULT_SIZE = 1000;

export const launchImageLibrary = async (callback: Function, cropping: boolean = true): Promise<void> => {
  try {
    const image = await ImagePicker.openPicker({
      width: IMG_DEFAULT_SIZE,
      height: IMG_DEFAULT_SIZE,
      cropping,
      mediaType: 'photo',
      // cropperCircleOverlay: false,
      // compressImageMaxWidth: 640,
      // compressImageMaxHeight: 480,
      // compressImageQuality: 0.5,
    });
    createHandler(callback)(image);
  } catch (err) {
    log('launchImageLibrary error', err, {level: levels.ERROR});
  }
};

export const launchCamera = async (callback: Function, cropping: boolean = true): Promise<void> => {
  // @TODO
  try {
    const image = await ImagePicker.openCamera({
      width: IMG_DEFAULT_SIZE,
      height: IMG_DEFAULT_SIZE,
      cropping,
      cropperCircleOverlay: false,
      // compressImageMaxWidth: 640,
      // compressImageMaxHeight: 480,
      // compressImageQuality: 0.5,
    });
    createHandler(callback)(image);
  } catch (err) {
    log('launchCamera error', err, {level: levels.ERROR});
  }
};

const photoActions = [
  {
    title: 'Take Photo',
    action: launchCamera,
  },
  {
    title: 'Choose from Library',
    action: launchImageLibrary,
  },
];

// @ANDROID
export const showImagePicker = (title: string, callback: Function, cropping: boolean = true): void => {
  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: [...photoActions.map(a => a.title), 'Cancel'],
      cancelButtonIndex: photoActions.length,
      title,
    },
    (index) => {
      index < photoActions.length && photoActions[index].action(callback, cropping);
    },
  );
};
