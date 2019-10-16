import React from 'react'
import SplashScreen from 'react-native-splash-screen'

SplashScreen.hide()

import {storiesOf} from '@storybook/react-native'
// import {action} from '@storybook/addon-actions'
// import {linkTo} from '@storybook/addon-links'

import OnboardingLocation from '../../src/components/Onboarding/OnboardingLocation'
import OnboardingAccelerometer from '../../src/components/Onboarding/OnboardingAccelerometer'
import OnboardingNotifications from '../../src/components/Onboarding/OnboardingNotifications'
import OnboardingFindFriends from '../../src/components/Onboarding/OnboardingFindFriends'
import {
  LocationWarningIOS,
  LocationWarningAndroid,
} from '../../src/components/modals/LocationWarning'
import MockFindFriends from './FindFriendsList/MockFindFriends'
// import {
//   DraggableOnMap,
//   KeyboardAwareDraggableOnMap,
//   MockFriendSearch,
// } from './rn-touch-through-view/ListOnMap'
import BotDetailsStory from './BotDetailsStory'
import SignUpStory from './SignUpStory'
// import ImagePickerStory from './ImagePickerStory'
import UserActivityStory from './UserActivityStory'
import CustomTransitionerStory from './CustomTransitionerStory'
import {MessagesRouterStory, ChatUserSearchScreen, ChatViewStory} from './MessagesStory'
import UpdateBrick from 'src/components/UpdateBrick'
import {Spinner} from 'src/components/common'
import {View} from 'react-native'
import MapOptions from 'src/components/MapOptions'

function emptyFn() {
  /* noop */
}

storiesOf('BotDetails', module).add('Invitation not accepted', () => <BotDetailsStory />)

// storiesOf('Touch Through View + Flatlist', module)
//   .add('Draggable List On Map', () => <DraggableOnMap />)
//   .add('Keyboard Aware Draggable List On Map', () => <KeyboardAwareDraggableOnMap />)
//   .add('Friend Search', () => <MockFriendSearch />)

storiesOf('MapOptions', module).add('MapOptions', () => <MapOptions />)

storiesOf('Onboarding', module)
  .add('1 - Location', () => <OnboardingLocation onPress={emptyFn} />)
  .add('1a - Location Warning IOS', () => <LocationWarningIOS onPress={emptyFn} />)
  .add('1b - Location Warning Android', () => <LocationWarningAndroid onPress={emptyFn} />)
  .add('2 - Accelerometer', () => <OnboardingAccelerometer onPress={emptyFn} />)
  .add('3 - Notifications', () => <OnboardingNotifications onPress={emptyFn} />)
  .add('4 - FindFriends', () => <OnboardingFindFriends onPress={emptyFn} onSkip={emptyFn} />)
  .add('5 - FindFriendsList', () => <MockFindFriends />)
  .add('6 - SignUp', () => <SignUpStory />)

// storiesOf('ImagePicker', module).add('1 - Default', () => <ImagePickerStory />)

storiesOf('UserActivity', module).add('1 - Default', () => <UserActivityStory />)

storiesOf('Custom Transitioner', module).add('1 - Default', () => <CustomTransitionerStory />)

storiesOf('Chat', module)
  .add('1 - Messages flow in router', () => <MessagesRouterStory />)
  .add('2 - Chat user search screen', () => <ChatUserSearchScreen />)
  .add('3 - Chat', () => <ChatViewStory />)

storiesOf('Codepush Brick', module).add('Update', () => <UpdateBrick />)

storiesOf('Android Spinner', module).add('Default', () => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Spinner size={50} />
  </View>
))
