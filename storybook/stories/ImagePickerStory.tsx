import React from 'react'
// import Camera from '../../src/components/Camera'
import {Router, Scene, Stack} from 'react-native-router-flux'
import {TouchableOpacity, View, Alert, Text} from 'react-native'
import {showImagePicker} from 'src/components/ImageCropPicker'
// import fileService from 'src/store/fileService'

export default () => (
  <Router>
    <Stack hideNavBar>
      <Scene key="screen" component={Screen} />
      <Stack hideNavBar key="camera">
        {/* <Scene key="cameraScreen" component={CameraScreen} /> */}
      </Stack>
    </Stack>
  </Router>
)

const Screen = () => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <TouchableOpacity
      onPress={async () => {
        const image = await showImagePicker()
        Alert.alert('we have an image!' + JSON.stringify(image))
      }}
      style={{padding: 20, borderWidth: 2}}
    >
      <Text>Show Image Picker</Text>
    </TouchableOpacity>
  </View>
)

// const CameraScreen = (props: any) => (
//   <Camera store={{getImageSize: fileService.getImageSize}} {...props} />
// )
