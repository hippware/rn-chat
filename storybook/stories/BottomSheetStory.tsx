import React, {createRef} from 'react'
import BottomSheet from 'reanimated-bottom-sheet'
import {View, Text, Animated} from 'react-native'
import {
  FlatList,
  PanGestureHandler,
  TapGestureHandler,
  NativeViewGestureHandler,
} from 'react-native-gesture-handler'

const data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

const notes = `
react-native-reanimated-bottomsheet example.

Pros: Very nice API
Cons: swiping up and down on the flatlist only scrolls the list, but we can't use that gesture to raise or lower the bottomsheet. Maybe there's a way around this...
`

export const BasicExample = () => {
  const renderContent = () => (
    <FlatList
      data={data}
      renderItem={({item, index}) => {
        return (
          <View style={{height: 50}}>
            <Text>{'notification ' + index}</Text>
          </View>
        )
      }}
      bounces={false}
      keyExtractor={(item, index) => index.toString()}
    />
  )

  const renderHeader = () => (
    <View style={{height: 50, backgroundColor: 'red'}}>
      <Text style={{marginTop: 30}}>"Grabbable" header</Text>
    </View>
  )

  return (
    <View style={{flex: 1}}>
      <BottomSheet
        snapPoints={[450, 100]}
        renderContent={renderContent}
        renderHeader={renderHeader}
        enabledInnerScrolling={true}
      />
      <Text style={{marginTop: 30}}>{notes}</Text>
    </View>
  )
}

const notes2 = `working example with gesture handlers?`

export const ExampleWithPanning = () => {
  const innerContentScrollRef = createRef<PanGestureHandler>()
  const headerRef = createRef<PanGestureHandler>()
  const tapRef = createRef<TapGestureHandler>()
  const scroll = createRef<NativeViewGestureHandler>()

  const renderContent = () => (
    <NativeViewGestureHandler
      ref={scroll}
      waitFor={innerContentScrollRef}
      // simultaneousHandlers={innerContentScrollRef}
    >
      <Animated.FlatList
        data={data}
        renderItem={({item, index}) => {
          return (
            <View style={{height: 50}}>
              <Text>{'notification ' + index}</Text>
            </View>
          )
        }}
        bounces={false}
        keyExtractor={(item, index) => index.toString()}
      />
    </NativeViewGestureHandler>
  )

  const renderHeader = () => (
    <View style={{height: 50, backgroundColor: 'red'}}>
      <Text style={{marginTop: 30}}>"Grabbable" header</Text>
    </View>
  )

  return (
    <Animated.View style={{flex: 1}}>
      <BottomSheet
        snapPoints={[450, 100]}
        renderContent={renderContent}
        renderHeader={renderHeader}
        // enabledInnerScrolling={true}
        innerGestureHandlerRefs={[innerContentScrollRef, headerRef, tapRef]}
        // simultaneousHandlers=
      />
      <Text style={{marginTop: 30}}>{notes2}</Text>
    </Animated.View>
  )
}
