import React, {Fragment} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {LoremIpsum} from './GestureBottomSheetStory'
import BottomPopupNew from '../../../src/components/common/BottomPopupNew'
import MapView from 'react-native-maps'

const Wrapper = ({children}) => (
  <View style={{flex: 1}}>
    <MapView
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
    />
    <Text style={[{marginTop: 100, padding: 10, textAlign: 'center', fontSize: 20}]}>
      My Gesture Sheet Story
    </Text>
    {children}
  </View>
)

export const BottomPopupWithList = () => (
  <Wrapper>
    <BottomPopupNew
      preview
      fullViewHeight={200}
      listProps={{
        data: [<LoremIpsum key="1" />, <LoremIpsum key="2" />, <LoremIpsum key="3" />],
        renderItem: ({item}) => item,
        keyExtractor: (item, index) => index.toString(),
      }}
    />
  </Wrapper>
)

export const BottomPopupWithSmallContent = () => (
  <Wrapper>
    <BottomPopupNew fullViewHeight={200} renderContent={() => <Text>A simple child</Text>} />
  </Wrapper>
)

export const BottomPopupWithLargeContent = () => (
  <Wrapper>
    <BottomPopupNew
      fullViewHeight={200}
      renderContent={() => (
        <Fragment>
          <LoremIpsum />
          <LoremIpsum />
          <LoremIpsum />
          <LoremIpsum />
          <LoremIpsum />
          <LoremIpsum />
        </Fragment>
      )}
    />
  </Wrapper>
)
