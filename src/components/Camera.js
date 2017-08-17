import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  ImageEditor,
  CameraRoll,
  ImageStore,
  Text,
} from 'react-native';
import Camera from 'react-native-camera';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  retakeContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    height: height - ((height + width) / 2),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: 'black',
  },
  bottomOverlay: {
    bottom: 0,
    height: height - ((height + width) / 2),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  captureButton: {
    flex: 1,
    alignItems: 'center',
  },
  leftButton: {
    flex: 1,
    paddingLeft: 10,
  },
  rightButton: {
    flex: 1,
    paddingRight: 10,
  },
  typeButton: {
    padding: 5,
  },
  flashButton: {
    padding: 5,
  },
  buttonsSpace: {
    width: 10,
  },
});

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.camera = null;

    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.disk,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto,
      },
      isRecording: false,
    };
  }

  takePicture = async () => {
    if (this.camera) {
      this.camera.capture()
        .then(({path, metadata}) => {
          Image.getSize(path, (w, h) => {
            //this.setState({path, width:h, height:h});
            const cropData = !metadata || (metadata.Orientation !== 6 && metadata.Orientation !== 8) ? {
              offset: {x: (w - h) / 2, y: 0},
              size: {width: h, height: h},
            } : {
              offset: {x: 0, y: (w - h) / 2},
              size: {width: h, height: h},
            };
            ImageEditor.cropImage(path, cropData,
              (successURI) => {
                ImageStore.getBase64ForTag(successURI, (base64) => {
                  ImageStore.removeImageForTag(successURI);
                  const path = `data:image/jpeg;base64,${base64}`;
                  CameraRoll.saveToCameraRoll(path).then(success =>
                  {
                    this.setState({width: w, height: h, path: success});
                  });
                  // CameraRoll.saveToCameraRoll(path);
                }, (failure) => {

                });
                // this.setState({path:ImageStore.getBase64ForTag(successURI)});
                // CameraRoll.saveToCameraRoll(successURI);
                // successURI contains your newly cropped image
              },
              (error) => {
                console.log(error);
              });
          });
        })
        .catch(err => console.error(err));
    }
  };
  retake = () => {
    this.setState({path: null});
  };
  switchType = () => {
    let newType;
    const {back, front} = Camera.constants.Type;

    if (this.state.camera.type === back) {
      newType = front;
    } else if (this.state.camera.type === front) {
      newType = back;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType,
      },
    });
  };

  get typeIcon() {
    let icon;
    const {back, front} = Camera.constants.Type;

    if (this.state.camera.type === back) {
      icon = require('../../images/ic_camera_rear_white.png');
    } else if (this.state.camera.type === front) {
      icon = require('../../images/ic_camera_front_white.png');
    }

    return icon;
  }

  switchFlash = () => {
    let newFlashMode;
    const {auto, on, off} = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.flashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.flashMode === off) {
      newFlashMode = auto;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newFlashMode,
      },
    });
  }

  get flashIcon() {
    let icon;
    const {auto, on, off} = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      icon = require('../../images/flashAuto.png');
    } else if (this.state.camera.flashMode === on) {
      icon = require('../../images/flashOn.png');
    } else if (this.state.camera.flashMode === off) {
      icon = require('../../images/flashOff.png');
    }

    return icon;
  }

  render() {
    if (this.state.path) {
      return (<View style={styles.retakeContainer}>
        <StatusBar animated hidden />
        <Image resizeMode='contain' style={{width, height}} source={{uri: this.state.path}} />
        <View style={[styles.overlay, styles.topOverlay]} />
        <View style={[styles.overlay, styles.bottomOverlay]}>
          <TouchableOpacity style={styles.leftButton} onPress={this.retake}>
            <Text style={{textAlign: 'left', color: 'white'}}>Retake</Text>
          </TouchableOpacity>
          <View style={styles.captureButton} />
          <TouchableOpacity style={styles.rightButton} onPress={this.takePicture}>
            <Text style={{textAlign: 'right', color: 'white'}}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>);
    }
    return (
      <View style={styles.container}>
        <StatusBar animated hidden />
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
          defaultTouchToFocus
          keepAwake
          mirrorImage={false}
        />
        <View style={[styles.overlay, styles.topOverlay]}>
          <TouchableOpacity
            style={styles.typeButton}
            onPress={this.switchType}
          >
            <Image
              source={this.typeIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flashButton}
            onPress={this.switchFlash}
          >
            <Image
              source={this.flashIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
          <TouchableOpacity style={styles.leftButton} onPress={this.takePicture}>
            <Text style={{color: 'white'}}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.captureButton} onPress={this.takePicture}>
            <Image source={require('../../images/cameraButton.png')} />
          </TouchableOpacity>
          <View style={styles.rightButton} />
        </View>
      </View>
    );
  }
}

