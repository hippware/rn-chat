import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux';
import { CameraKitCameraScreen } from 'react-native-camera-kit';

export default class CameraScreen extends Component {
  onBottomButtonPressed = async (event) => {
    if (event.type === 'left') {
      return Actions.pop();
    }
    if (event.type === 'capture') {
      const source = event.captureImages[0];
      const response = await getImageSize(source.uri);
      this.props.callback({...source, type: 'image/jpeg', isStatic: true}, {size: source.size, ...response});
      Actions.pop();
      Actions.pop();
    }
  };

  render() {
    return (
      <CameraKitCameraScreen
        actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
        onBottomButtonPressed={this.onBottomButtonPressed}
        cameraOptions={{
          flashMode: 'auto',
          focusMode: 'on',
          zoomMode: 'on',
          ratioOverlay:'1:1',
          ratioOverlayColor: 'black'
        }}
        flashImages={{
          on: require('../../images/flashOn.png'),
          off: require('../../images/flashOff.png'),
          auto: require('../../images/flashAuto.png')
        }}
        cameraFlipImage={require('../../images/cameraFlipIcon.png')}
        captureButtonImage={require('../../images/cameraButton.png')}
      />
    );
  }
}
