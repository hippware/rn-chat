import React, {Fragment} from 'react'
import {StyleSheet, Text, View, Dimensions, FlatListProps} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {LoremIpsum} from './GestureBottomSheetStory'
import BottomPopupNew from '../../../src/components/common/BottomPopupNew'

const Wrapper = ({children}) => (
  <View style={{flex: 1}}>
    <View
      style={[StyleSheet.absoluteFillObject, {marginTop: 100, padding: 10, alignItems: 'center'}]}
    >
      <Text style={{fontSize: 20}}>My Gesture Sheet Story</Text>
      <TouchableOpacity onPress={() => null} style={{marginTop: 20}}>
        <Text style={{padding: 10, backgroundColor: 'blue', color: 'white'}}>
          Test background is touchable
        </Text>
      </TouchableOpacity>
    </View>
    {children}
  </View>
)

export const BottomPopupWithList = () => (
  <Wrapper>
    <BottomPopupNew
      listProps={{
        data: [<LoremIpsum />, <LoremIpsum />, <LoremIpsum />],
        renderItem: ({item}) => item,
        keyExtractor: (item, index) => index.toString(),
      }}
    />
  </Wrapper>
)

export const BottomPopupWithSmallContent = () => (
  <Wrapper>
    <BottomPopupNew>
      <Text>A simple child</Text>
    </BottomPopupNew>
  </Wrapper>
)

export const BottomPopupWithLargeContent = () => (
  <Wrapper>
    <BottomPopupNew>
      <Fragment>
        <LoremIpsum />
        <LoremIpsum />
        <LoremIpsum />
        <LoremIpsum />
        <LoremIpsum />
        <LoremIpsum />
      </Fragment>
    </BottomPopupNew>
  </Wrapper>
)
