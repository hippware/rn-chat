import {Keyboard, Platform} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import ActionSheet from 'react-native-action-sheet'
import Permissions from 'react-native-permissions'
import {warn, log} from 'src/utils/logger'

export type PickerImage = {
  height: number
  width: number
  size: number
  uri: string
  type: string
  name: string
}

function getImageUri(rawUri: string) {
  let uri = rawUri
  return uri
  if (Platform.OS === 'android') {
    if (rawUri.indexOf('content://') !== 0) {
      uri = rawUri
    } else {
      uri = rawUri.indexOf('file://') !== 0 ? 'file://' + rawUri : rawUri
    }
  } else {
    uri = rawUri.replace('file://', '')
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
      return new Promise((resolve, reject) => {
        ImagePicker.launchImageLibrary({}, response => {
          if (response.didCancel) {
            reject()
          } else if (response.error) {
            reject(response.error)
          } else if (response.customButton) {
            // console.log('User tapped custom button: ', response.customButton)
          } else {
            const res: any = {
              uri: getImageUri(response.uri),
              type: response.type,
              name: response.fileName,
              width: response.width,
              height: response.height,
              size: response.fileSize,
            }
            resolve(res)

            // You can also display the image using data:
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };

            // this.setState({
            //   avatarSource: source,
            // })
          }
        })
      })
    }
  } catch (err) {
    // disable error log because normal user picker cancelling is interpreted as error
    log('launchImageLibrary error', err)
  }
}

async function launchCamera(cropping: boolean): Promise<PickerImage | void> {
  Keyboard.dismiss()
  try {
    return new Promise((resolve, reject) => {
      ImagePicker.launchCamera({rotation: 360}, response => {
        if (response.didCancel) {
          reject()
        } else if (response.error) {
          reject(response.error)
        } else if (response.customButton) {
          // console.log('User tapped custom button: ', response.customButton)
        } else {
          const res: any = {
            uri: getImageUri(response.uri),
            type: response.type,
            name: response.fileName,
            width: response.width,
            height: response.height,
            size: response.fileSize,
          }
          resolve(res)

          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };

          // this.setState({
          //   avatarSource: source,
          // })
        }
      })
    })
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
