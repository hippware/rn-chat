import React from 'react'
import Camera from '../../src/components/Camera'
import {Router, Scene, Stack, Actions} from 'react-native-router-flux'
import {TouchableOpacity, View, Alert, Text, Image} from 'react-native'
import {showImagePicker} from 'src/components/ImagePicker'

export default () => (
  <Router>
    <Stack hideNavBar>
      <Scene key="screen" component={Screen} />
      <Stack hideNavBar key="camera">
        <Scene key="cameraScreen" component={CameraScreen} />
      </Stack>
    </Stack>
  </Router>
)

const Screen = () => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <TouchableOpacity
      onPress={async () => {
        const image = await showImagePicker()
        // Alert.alert('we have image!' + JSON.stringify(image))
        console.log('& in screen', image)
        Actions.pop()
      }}
      style={{padding: 20, borderWidth: 2}}
    >
      <Text>Show Image Picker</Text>
    </TouchableOpacity>
  </View>
)

const CameraScreen = (props: any) => <Camera store={{getImageSize}} {...props} />

async function getImageSize(uri: string): Promise<{width: number; height: number}> {
  return new Promise<{width; height}>((resolve, reject) =>
    Image.getSize(
      `file://${uri}`,
      (width, height) => {
        if (!width || !height) {
          reject(new Error(`Invalid image file: ${uri}`))
        } else {
          resolve({width, height})
        }
      },
      err => reject(err)
    )
  )
}
