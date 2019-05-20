import {Keyboard, Platform} from 'react-native'
import ImagePicker, {Image} from 'react-native-image-crop-picker'
import {Actions} from 'react-native-router-flux'
import ActionSheet from 'react-native-action-sheet'
import Permissions from 'react-native-permissions'

export type PickerImage = {
  height: number
  width: number
  size: number
  uri: string
  type: string
  name: string
}

const IMG_DEFAULT_SIZE = 1000

function getImageUri(rawUri: string) {
  let uri = rawUri
  if (Platform.OS === 'android') {
    uri = rawUri.indexOf('file://') !== 0 ? 'file://' + rawUri : rawUri
  }
  return uri
}

async function photoPermissionsGranted(includeCamera: boolean = false): Promise<boolean> {
  const perms = [
    includeCamera ? await Permissions.request('camera') : 'authorized',
    await Permissions.request('photo'),
    Platform.OS === 'android' ? await Permissions.request('storage') : 'authorized',
  ]

  perms.forEach(p => {
    if (p !== 'authorized') {
      return false
    }
  })
  return true
}

async function launchImageLibrary(cropping: boolean): Promise<PickerImage | void> {
  try {
    if (await photoPermissionsGranted()) {
      const result = await ImagePicker.openPicker({
        width: IMG_DEFAULT_SIZE,
        height: IMG_DEFAULT_SIZE,
        cropping,
        mediaType: 'photo',
        // cropperCircleOverlay: false,
        // compressImageMaxWidth: 640,
        // compressImageMaxHeight: 480,
        // compressImageQuality: 0.5,
      })
      const image: Image = result[0] || result

      return {
        uri: getImageUri(image.path),
        type: image.mime,
        name: image.path.substring(image.path.lastIndexOf('/') + 1),
        width: image.width,
        height: image.height,
        size: image.size,
      }
    }
  } catch (err) {
    // disable error log because normal user picker cancelling is interpreted as error
    // log('launchImageLibrary error', err, {level: levels.ERROR});
  }
}

async function cropImage(image: PickerImage): Promise<PickerImage> {
  const croppedImage = await ImagePicker.openCropper({
    path: image.uri,
    width: IMG_DEFAULT_SIZE,
    height: IMG_DEFAULT_SIZE,
  })
  return {
    ...croppedImage,
    uri: croppedImage.path,
    type: image.type,
    name: image.name,
  }
}

async function launchCamera(): Promise<PickerImage | void> {
  if (await photoPermissionsGranted(true)) {
    Keyboard.dismiss()
    return new Promise(resolve => {
      Actions.camera({
        afterImagePicked: async image => {
          if (Platform.OS === 'android') {
            image = await cropImage(image)
          }
          resolve(image)
        },
      })
    })
  }
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

export async function showImagePicker(
  title?: string,
  cropping: boolean = true
): Promise<PickerImage | void> {
  const options = {
    options: [...photoActions.map(a => a.title), 'Cancel'],
    cancelButtonIndex: photoActions.length,
  }
  if (title) {
    ;(options as any).title = title
  }
  return new Promise(resolve => {
    ActionSheet.showActionSheetWithOptions(options, index => {
      if (index < photoActions.length) {
        const image = photoActions[index].action(cropping)
        resolve(image)
      }
    })
  })
}
