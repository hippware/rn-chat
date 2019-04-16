import {Alert, Keyboard, Platform} from 'react-native'
import ImagePicker, {Image} from 'react-native-image-crop-picker'
import {Actions} from 'react-native-router-flux'
import {CameraKitCamera, CameraKitGallery} from 'react-native-camera-kit'
import ActionSheet from 'react-native-action-sheet'

export type AfterImagePicked = (imageSource: PickerImage) => void

type Props = {
  title?: string
  afterImagePicked: AfterImagePicked
  cropping?: boolean
}

export type PickerImage = {
  height: number
  width: number
  size: number
  uri: string
  type: string
  name: string
}

const IMG_DEFAULT_SIZE = 1000

async function launchImageLibrary({afterImagePicked, cropping}: Props): Promise<void> {
  try {
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
    afterImagePicked({
      uri: Platform.select({android: 'file://' + image.path, ios: image.path}),
      type: image.mime,
      name: image.path.substring(image.path.lastIndexOf('/') + 1),
      width: image.width,
      height: image.height,
      size: image.size,
    })
  } catch (err) {
    // disable error log because normal user picker cancelling is interpreted as error
    // log('launchImageLibrary error', err, {level: levels.ERROR});
  }
}

async function launchCamera({afterImagePicked}: Props): Promise<void> {
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
  Actions.camera({afterImagePicked})
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
