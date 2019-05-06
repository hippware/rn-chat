import React from 'react'
import {View, Platform} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {inject} from 'mobx-react/native'
import {CameraKitCameraScreen} from 'react-native-camera-kit'
import {width, height} from './Global'
import {PickerImage} from './ImagePicker'

type Props = {
  afterImagePicked: (imageSource: PickerImage) => void
  store?: any
}

@inject('store')
class CameraScreen extends React.Component<Props> {
  onBottomButtonPressed = async event => {
    if (event.type === 'left') {
      return Actions.pop()
    } else {
      const source = event.captureImages[0]
      const {width: photoWidth, height: photoHeight} = await this.props.store.getImageSize(
        source.uri
      )
      this.props.afterImagePicked({
        ...source,
        uri: Platform.select({android: 'file://' + source.uri, ios: source.uri}),
        type: 'image/jpeg',
        width: photoWidth,
        height: photoHeight,
      })
      Actions.pop()
    }
  }

  render() {
    return (
      <View style={{width, height}}>
        <CameraKitCameraScreen
          actions={{
            rightButtonText: 'Done',
            leftButtonText: 'Cancel',
            rightCaptureRetakeButtonText: 'Done',
            leftCaptureRetakeButtonText: 'Retake',
          }}
          onBottomButtonPressed={this.onBottomButtonPressed}
          allowCaptureRetake
          cameraOptions={{
            flashMode: 'auto',
            focusMode: 'on',
            zoomMode: 'on',

            // these options have no effect on Android: https://github.com/wix/react-native-camera-kit/issues/11
            ratioOverlay: '1:1',
            ratioOverlayColor: 'black',
          }}
          flashImages={{
            on: require('../../images/flashOn.png'),
            off: require('../../images/flashOff.png'),
            auto: require('../../images/flashAuto.png'),
          }}
          cameraFlipImage={require('../../images/cameraFlipIcon.png')}
          captureButtonImage={require('../../images/cameraButton.png')}
        />
      </View>
    )
  }
}

export default CameraScreen
