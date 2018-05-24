// @flow

import {Alert, ActionSheetIOS} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import {log, levels} from '../utils/log'
import {Actions} from 'react-native-router-flux'
import {CameraKitCamera, CameraKitGallery} from 'react-native-camera-kit'

const createHandler = (callback: any) => (response: Image) => {
  log('SIZE:', response, response, {level: levels.VERBOSE})
  const source = {
    uri: response.path,
    type: response.mime,
    name: response.path.substring(response.path.lastIndexOf('/') + 1),
    isStatic: true,
  }
  callback(source, response)
}

type Image = {
  data: any
  height: number
  width: number
  mime: string
  path: string
  size: number
}

const IMG_DEFAULT_SIZE = 1000

export const launchImageLibrary = async (
  callback: any,
  cropping: boolean = true
): Promise<void> => {
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
    })
    createHandler(callback)(image as Image)
  } catch (err) {
    // disable error log because normal user picker cancelling is interpreted as error
    // log('launchImageLibrary error', err, {level: levels.ERROR});
  }
}

export const launchCamera = async (callback: any /*cropping: boolean = true*/): Promise<void> => {
  const isCameraAuthorized = await CameraKitCamera.checkDeviceCameraAuthorizationStatus()
  if (!isCameraAuthorized) {
    const isUserAuthorizedCamera = await CameraKitCamera.requestDeviceCameraAuthorization()
    if (!isUserAuthorizedCamera) {
      Alert.alert('Cannot use camera')
      return
    }
  }
  const isPhotosAuthorized = await CameraKitGallery.checkDevicePhotosAuthorizationStatus()
  if (!isPhotosAuthorized) {
    const isUserAuthorizedPhotos = await CameraKitGallery.requestDevicePhotosAuthorization()
    if (!isUserAuthorizedPhotos) {
      Alert.alert('Cannot open photo gallery')
      return
    }
  }
  Actions.camera({callback})
  // @TODO
  // try {
  //   const image = await ImagePicker.openCamera({
  //     width: IMG_DEFAULT_SIZE,
  //     height: IMG_DEFAULT_SIZE,
  //     cropping,
  //     cropperCircleOverlay: false,
  //     // compressImageMaxWidth: 640,
  //     // compressImageMaxHeight: 480,
  //     // compressImageQuality: 0.5,
  //   });
  //   createHandler(callback)(image);
  // } catch (err) {
  //   log('launchCamera error', err, {level: levels.ERROR});
  // }
}

const photoActions = [
  {
    title: 'Take Photo',
    action: launchCamera,
  },
  {
    title: 'Choose from Library',
    action: launchImageLibrary,
  },
]

// @ANDROID
export const showImagePicker = (title: string, callback: any, cropping: boolean = true): void => {
  const options = {
    options: [...photoActions.map(a => a.title), 'Cancel'],
    cancelButtonIndex: photoActions.length,
  }
  if (title) {
    ;(options as any).title = title
  }
  ActionSheetIOS.showActionSheetWithOptions(options, index => {
    if (index < photoActions.length) photoActions[index].action(callback, cropping)
  })
}
