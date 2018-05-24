// @flow

import React from 'react'
import {Actions} from 'react-native-router-flux'
import {inject} from 'mobx-react/native'
import {CameraKitCameraScreen} from 'react-native-camera-kit'

type Props = {
  callback: Function
}

@inject('store')
class CameraScreen extends React.Component<Props> {
  onBottomButtonPressed = async event => {
    if (event.type === 'left') {
      return Actions.pop()
    } else {
      const source = event.captureImages[0]
      const response = await this.props.store.getImageSize(source.uri)
      this.props.callback(
        {...source, type: 'image/jpeg', isStatic: true},
        {size: source.size, ...response}
      )
      Actions.pop()
    }
  }

  render() {
    return (
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
    )
  }
}

export default CameraScreen
