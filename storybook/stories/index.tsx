import React from 'react'
import SplashScreen from 'react-native-splash-screen'

SplashScreen.hide()

import {storiesOf} from '@storybook/react-native'
import {YellowBox} from 'react-native'
import * as RNBottomSheet from './BottomSheetStory'
import GestureBottomSheetStory from './bottomSheet/GestureBottomSheetStory'
import * as MyGestureSheetStory from './bottomSheet/MyGestureSheetStory'
import MyGestureSheetStoryFunctional from './bottomSheet/MyGestureSheetStoryFunctional'

YellowBox.ignoreWarnings([
  // I belive these are coming from either react-native-reanimated or react-native-gesture-handler
  'Warning: AsyncStorage',
])

// function emptyFn() {
//   /* noop */
// }

// storiesOf('HomeBanner', module).add('Default', () => <HomeBannerStory />)

// storiesOf('BotDetails', module).add('Invitation not accepted', () => <BotDetailsStory />)

// storiesOf('Touch Through View + Flatlist', module)
//   .add('Draggable List On Map', () => <DraggableOnMap />)
//   .add('Keyboard Aware Draggable List On Map', () => <KeyboardAwareDraggableOnMap />)
//   .add('Friend Search', () => <MockFriendSearch />)

// storiesOf('MapOptions', module).add('MapOptions', () => <MapOptions />)

// storiesOf('Onboarding', module)
//   .add('1 - Location', () => <OnboardingLocation onPress={emptyFn} />)
//   .add('1a - Location Warning IOS', () => <LocationWarningIOS onPress={emptyFn} />)
//   .add('1b - Location Warning Android', () => <LocationWarningAndroid onPress={emptyFn} />)
//   .add('2 - Accelerometer', () => <OnboardingAccelerometer onPress={emptyFn} />)
//   .add('3 - Notifications', () => <OnboardingNotifications onPress={emptyFn} />)
//   .add('4 - FindFriends', () => <OnboardingFindFriends onPress={emptyFn} onSkip={emptyFn} />)
//   .add('5 - FindFriendsList', () => <MockFindFriends />)
//   .add('6 - SignUp', () => <SignUpStory />)

// // storiesOf('ImagePicker', module).add('1 - Default', () => <ImagePickerStory />)

// storiesOf('UserActivity', module).add('1 - Default', () => <UserActivityStory />)

// storiesOf('Custom Transitioner', module).add('1 - Default', () => <CustomTransitionerStory />)

// storiesOf('Chat', module)
//   .add('1 - Messages flow in router', () => <MessagesRouterStory />)
//   .add('2 - Chat user search screen', () => <ChatUserSearchScreen />)
//   .add('3 - Chat', () => <ChatViewStory />)

// storiesOf('Codepush Brick', module).add('Update', () => <UpdateBrick />)

// storiesOf('Android Spinner', module).add('Default', () => (
//   <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//     <Spinner size={50} />
//   </View>
// ))

storiesOf('My Gesture Bottom Sheet', module)
  .add('with flatlist', () => <MyGestureSheetStory.BottomPopupWithList />)
  .add('with small content', () => <MyGestureSheetStory.BottomPopupWithSmallContent />)
  .add('with large content', () => <MyGestureSheetStory.BottomPopupWithLargeContent />)
  .add('Functional', () => <MyGestureSheetStoryFunctional />)

storiesOf('Bottom Sheet', module)
  .add('Basic Example', () => <RNBottomSheet.BasicExample />)
  .add('Example with Gesture Handling?', () => <RNBottomSheet.ExampleWithPanning />)

storiesOf('GestureHandler Bottom Sheet', module).add('Default', () => <GestureBottomSheetStory />)
