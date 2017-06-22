// @flow

import {ActionSheetIOS} from 'react-native';
import * as log from '../utils/log';
import ImagePicker from 'react-native-image-crop-picker';
// const ImagePicker = NativeModules.ImageCropPicker;

const options = {
  cancelButtonTitle: 'Cancel',
  takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
  chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
  // customButtons: {
  //    'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection]
  // },
  cameraType: 'back', // 'front' or 'back'
  mediaType: 'photo', // 'photo' or 'video'
  videoQuality: 'high', // 'low', 'medium', or 'high'
  maxWidth: 5000, // photos only
  maxHeight: 5000, // photos only
  // aspectX: 1, // aspectX:aspectY, the cropping image's ratio of width to height
  // aspectY: 1, // aspectX:aspectY, the cropping image's ratio of width to height
  quality: 0.95, // photos only
  angle: 0, // photos only
  allowsEditing: false, // Built in functionality to resize/reposition the image
  noData: true, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
  storageOptions: {
    // if this key is provided, the image will get saved in the documents/pictures directory (rather than a temporary directory)
    skipBackup: true, // image will NOT be backed up to icloud
    path: 'images', // will save image at /Documents/images rather than the root
  },
};

const createHandler = (callback: Function) => (response: Image) => {
  // if (response.didCancel) {
  //   log.log('User cancelled image picker', {level: log.levels.VERBOSE});
  // } else if (response.error) {
  //   alert(response.error);
  //   log.log('UIImagePickerManager Error: ', response.error, {level: log.levels.VERBOSE});
  // } else if (response.customButton) {
  //   log.log('User tapped custom button: ', response.customButton, {level: log.levels.VERBOSE});
  // } else {
  // You can display the image using either data:
  log.log('SIZE:', response.size, response.path, {level: log.levels.VERBOSE});
  // const fileName = response.uri.replace('file://', '');
  const source = {
    uri: response.path,
    // type: fileName.indexOf('.png') === -1 ? 'image/jpeg' : 'image/png',
    type: response.mime,
    name: response.path.substring(response.path.lastIndexOf('/') + 1),
    isStatic: true,
  };
  console.log('&&& source', source);
  callback(source, response);
  // }
};

// export default function showImagePicker(title, callback) {
//   const UIImagePickerManager = NativeModules.ImagePickerManager;
//   UIImagePickerManager.showImagePicker({...options, title}, createHandler(callback));
// }

type Image = {
  data: any,
  height: number,
  width: number,
  mime: String,
  path: String,
  size: number
};

export const launchImageLibrary = async (callback: Function): Promise<void> => {
  try {
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: false,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      compressImageQuality: 0.5,
      // compressVideoPreset: 'MediumQuality',
    });
    createHandler(callback)(image);
  } catch (err) {
    console.log('&&& Error', err);
    alert(err.message ? err.message : err);
  }
};

export const launchCamera = async (callback: Function): Promise<void> => {
  // @TODO
  try {
    const image = await ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: false,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      compressImageQuality: 0.5,
      // compressVideoPreset: 'MediumQuality',
    });
    createHandler(callback)(image);
  } catch (err) {
    alert(err.message ? err.message : err);
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
export const showImagePicker = (title: string, callback: Function): void => {
  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: [...photoActions.map(a => a.title), 'Cancel'],
      cancelButtonIndex: photoActions.length,
      title,
    },
    index => photoActions[index].action(callback)
  );
};
