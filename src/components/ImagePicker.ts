import {Alert, Keyboard} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import {Actions} from 'react-native-router-flux'
import {CameraKitCamera, CameraKitGallery} from 'react-native-camera-kit'
import ActionSheet from 'react-native-action-sheet'

type Props = {
  title?: string
  callback: any
  cropping?: boolean
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

function createHandler(callback: any, response: Image) {
  // log('SIZE:', response, {level: levels.VERBOSE})
  const source = {
    uri: response.path,
    type: response.mime,
    name: response.path.substring(response.path.lastIndexOf('/') + 1),
    isStatic: true,
  }
  callback(source, response)
}

async function launchImageLibrary({callback, cropping}: Props): Promise<void> {
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
    createHandler(callback, image as Image)
  } catch (err) {
    // disable error log because normal user picker cancelling is interpreted as error
    // log('launchImageLibrary error', err, {level: levels.ERROR});
  }
}

async function launchCamera({callback}: Props): Promise<void> {
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
  Keyboard.dismiss()
  Actions.camera({callback})
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
export function showImagePicker(props: Props): void {
  const defaultProps = {
    cropping: true,
  }
  const options = {
    options: [...photoActions.map(a => a.title), 'Cancel'],
    cancelButtonIndex: photoActions.length,
  }
  if (props.title) {
    ;(options as any).title = props.title
  }
  ActionSheet.showActionSheetWithOptions(options, index => {
    if (index < photoActions.length) photoActions[index].action({...defaultProps, ...props})
  })
}
