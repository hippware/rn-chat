import React, {useState} from 'react'
import {Text, View} from 'react-native'
import {LoremIpsum} from './GestureBottomSheetStory'
import BottomPopupNew from '../../../src/components/common/BottomPopupNew'
import {RText} from '../../../src/components/common'

const Wrapper = ({children}) => (
  <View style={{flex: 1, backgroundColor: 'lightblue'}}>
    {/* <MapView
      provider={'google'}
      initialRegion={{
        latitude: 34.141291,
        longitude: -118.1413,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      }}
      style={StyleSheet.absoluteFill}
      mapType={'standard'}
      rotateEnabled={false}
      pitchEnabled={false}
    /> */}
    <Text style={[{marginTop: 100, padding: 10, textAlign: 'center', fontSize: 20}]}>
      My Gesture Sheet Story
    </Text>
    {children}
  </View>
)

export const BottomPopupWithList = () => {
  const [preview, setPreview] = useState(true)
  return (
    <Wrapper>
      <BottomPopupNew
        preview={preview}
        fullViewHeight={500}
        previewHeight={200}
        allowFullScroll
        listProps={{
          ListHeaderComponent: (
            <View style={{height: 100, backgroundColor: 'red', flex: 1}}>
              <RText>This is the header</RText>
            </View>
          ),
          data: [<LoremIpsum key="1" />, <LoremIpsum key="2" />, <LoremIpsum key="3" />],
          renderItem: ({item}) => item,
          keyExtractor: (item, index) => index.toString(),
        }}
        onPreviewTransition={() => setPreview(true)}
        onFullViewTransition={() => setPreview(false)}
      />
    </Wrapper>
  )
}

// export const BottomPopupWithSmallContent = () => (
//   <Wrapper>
//     <BottomPopupNew fullViewHeight={200} renderContent={() => <Text>A simple child</Text>} />
//   </Wrapper>
// )

// export const BottomPopupWithLargeContent = () => (
//   <Wrapper>
//     <BottomPopupNew
//       fullViewHeight={200}
//       renderContent={() => (
//         <Fragment>
//           <LoremIpsum />
//           <LoremIpsum />
//           <LoremIpsum />
//           <LoremIpsum />
//           <LoremIpsum />
//           <LoremIpsum />
//         </Fragment>
//       )}
//     />
//   </Wrapper>
// )
