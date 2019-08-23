import {Keyboard, Platform} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import ActionSheet from 'react-native-action-sheet'
import Permissions from 'react-native-permissions'
import {warn} from 'src/utils/logger'

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
      ImagePicker.launchImageLibrary(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker')
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error)
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton)
        } else {
          console.log('IMAGE RESPONSE: ', JSON.stringify(response))
          const source = {uri: response.uri}

          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };

          // this.setState({
          //   avatarSource: source,
          // })
        }
      })

      // const result = await ImagePicker.openPicker({
      //   width: IMG_DEFAULT_SIZE,
      //   height: IMG_DEFAULT_SIZE,
      //   cropping,
      //   mediaType: 'photo',
      //   // cropperCircleOverlay: false,
      //   compressImageMaxWidth: IMG_DEFAULT_SIZE,
      //   compressImageMaxHeight: IMG_DEFAULT_SIZE,
      //   // compressImageQuality: 0.5,
      // })
      // const image: Image = result[0] || result

      // return {
      //   uri: getImageUri(image.path),
      //   type: image.mime,
      //   name: image.path.substring(image.path.lastIndexOf('/') + 1),
      //   width: image.width,
      //   height: image.height,
      //   size: image.size,
      // }
    }
  } catch (err) {
    // disable error log because normal user picker cancelling is interpreted as error
    // log('launchImageLibrary error', err, {level: levels.ERROR});
  }
}

async function launchCamera(cropping: boolean): Promise<PickerImage | void> {
  Keyboard.dismiss()
  try {
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        console.log('IMAGE RESPONSE: ', JSON.stringify(response))
        const source = {uri: response.uri}
      }
    })
    // return {
    //   ...image,
    //   uri: image.path,
    //   type: image.mime,
    //   name: image.path,
    // }
  } catch (err) {
    warn('camera error:', err)
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

export async function showImagePicker(cropping: boolean = true): Promise<PickerImage | void> {
  const options = {
    options: [...photoActions.map(a => a.title), 'Cancel'],
    cancelButtonIndex: photoActions.length,
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
