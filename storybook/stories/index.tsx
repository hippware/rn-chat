import React from 'react'
import SplashScreen from 'react-native-splash-screen'

SplashScreen.hide()

import {storiesOf} from '@storybook/react-native'
import {YellowBox} from 'react-native'
import SwitchStory from './SwitchStory'
import LocationSettingsModalStory from './LocationSettingsModalStory'
import OnboardingLocation from '../../src/components/Onboarding/OnboardingLocation'
import {
  LocationWarningIOS,
  LocationWarningAndroid,
} from '../../src/components/modals/LocationWarning'
import OnboardingAccelerometer from '../../src/components/Onboarding/OnboardingAccelerometer'
import OnboardingNotifications from '../../src/components/Onboarding/OnboardingNotifications'
import OnboardingFindFriends from '../../src/components/Onboarding/OnboardingFindFriends'
import MockFindFriends from './FindFriendsList/MockFindFriends'
import SignUpStory from './SignUpStory'

YellowBox.ignoreWarnings([
  // I belive these are coming from either react-native-reanimated or react-native-gesture-handler
  'Warning: AsyncStorage',
])

function emptyFn() {
  /* noop */
}

// storiesOf('HomeBanner', module).add('Default', () => <HomeBannerStory />)

// storiesOf('BotDetails', module).add('Invitation not accepted', () => <BotDetailsStory />)

// storiesOf('Touch Through View + Flatlist', module)
//   .add('Draggable List On Map', () => <DraggableOnMap />)
//   .add('Keyboard Aware Draggable List On Map', () => <KeyboardAwareDraggableOnMap />)
//   .add('Friend Search', () => <MockFriendSearch />)

// storiesOf('MapOptions', module).add('MapOptions', () => <MapOptions />)

storiesOf('Onboarding', module)
  .add('1 - Location', () => <OnboardingLocation onPress={emptyFn} />)
  .add('1a - Location Warning IOS', () => <LocationWarningIOS onPress={emptyFn} />)
  .add('1b - Location Warning Android', () => <LocationWarningAndroid onPress={emptyFn} />)
  .add('2 - Accelerometer', () => <OnboardingAccelerometer onPress={emptyFn} />)
  .add('3 - Notifications', () => <OnboardingNotifications onPress={emptyFn} />)
  .add('4 - FindFriends', () => <OnboardingFindFriends onPress={emptyFn} onSkip={emptyFn} />)
  .add('5 - FindFriendsList', () => <MockFindFriends />)
  .add('6 - SignUp', () => <SignUpStory />)

// // storiesOf('ImagePicker', module).add('1 - Default', () => <ImagePickerStory />)

// storiesOf('UserActivity', module).add('1 - Default', () => <UserActivityStory />)

// storiesOf('Chat', module)
//   .add('2 - Chat user search screen', () => <ChatUserSearchScreen />)
//   .add('3 - Chat', () => <ChatViewStory />)

// storiesOf('Codepush Brick', module).add('Update', () => <UpdateBrick />)

// storiesOf('Android Spinner', module).add('Default', () => (
//   <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//     <Spinner size={50} />
//   </View>
// ))

storiesOf('Location Settings', module)
  .add('Accept/Reject', () => <LocationSettingsModalStory type="ACCEPT_REJECT_REQUEST" />)
  .add('Accept request', () => <LocationSettingsModalStory type="ACCEPT_REQUEST" />)
  .add('Send Request', () => <LocationSettingsModalStory type="SEND_REQUEST" />)
  .add('Send Request w/ contact', () => (
    <LocationSettingsModalStory type="SEND_REQUEST" withContact />
  ))

storiesOf('Switch', module).add('default', () => <SwitchStory />)

// storiesOf('My Gesture Bottom Sheet', module)
//   .add('with flatlist', () => <MyGestureSheetStory.BottomPopupWithList />)
//   .add('with small content', () => <MyGestureSheetStory.BottomPopupWithSmallContent />)
//   .add('with large content', () => <MyGestureSheetStory.BottomPopupWithLargeContent />)
//   .add('Functional', () => <MyGestureSheetStoryFunctional />)

// storiesOf('GestureHandler Bottom Sheet', module).add('Default', () => <GestureBottomSheetStory />)
