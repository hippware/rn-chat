import React from 'react'
// import {Text} from 'react-native'

import {storiesOf} from '@storybook/react-native'
// import {action} from '@storybook/addon-actions'
// import {linkTo} from '@storybook/addon-links'

// import Button from './Button'
// import CenterView from './CenterView'
// import Welcome from './Welcome'
import OnboardingLocation from '../../src/components/Onboarding/OnboardingLocation'
import OnboardingAccelerometer from '../../src/components/Onboarding/OnboardingAccelerometer'
// import OnboardingSwiper from '../../src/components/Onboarding/OnboardingSwiper'
import OnboardingNotifications from '../../src/components/Onboarding/OnboardingNotifications'
import OnboardingFindFriends from '../../src/components/Onboarding/OnboardingFindFriends'
import {LocationWarningUI} from '../../src/components/modals/LocationWarning'
import MockFindFriends from './FindFriendsList/MockFindFriends'
import ListOnMap from './rn-touch-through-view/ListOnMap'

function emptyFn() {
  /* noop */
}

storiesOf('Touch Through View + Flatlist', module)
  // tslint:disable-next-line
  // .add('Main Swiper', () => <OnboardingSwiper log={console.log} onceStore={{flip: emptyFn}} />)
  .add('default', () => <ListOnMap />)

storiesOf('Onboarding', module)
  // tslint:disable-next-line
  // .add('Main Swiper', () => <OnboardingSwiper log={console.log} onceStore={{flip: emptyFn}} />)
  .add('1 - Location', () => <OnboardingLocation onPress={emptyFn} />)
  .add('1a - Location Warning', () => <LocationWarningUI onPress={emptyFn} />)
  .add('2 - Accelerometer', () => <OnboardingAccelerometer onPress={emptyFn} />)
  .add('3 - Notifications', () => <OnboardingNotifications onPress={emptyFn} />)
  .add('4 - FindFriends', () => <OnboardingFindFriends onPress={emptyFn} onSkip={emptyFn} />)
  .add('5 - FindFriendsList', () => <MockFindFriends />)

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />)

// storiesOf('Button', module)
//   .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
//   .add('with text', () => (
//     <Button onPress={action('clicked-text')}>
//       <Text>Hello Button</Text>
//     </Button>
//   ))
//   .add('with some emoji', () => (
//     <Button onPress={action('clicked-emoji')}>
//       <Text>😀 😎 👍 💯</Text>
//     </Button>
//   ))
