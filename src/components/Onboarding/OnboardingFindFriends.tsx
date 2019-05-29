import React from 'react'
import {View, Image, TouchableOpacity} from 'react-native'
import {RText, GradientButton} from '../common'
import {WHITE, PINK} from 'src/constants/colors'
import {s, minHeight} from '../Global'
import {onboardingSlideStyle as styles} from '../styles'

type Props = {
  onPress: () => void
  onSkip: () => void
}

const OnboardingFindFriends = ({onPress, onSkip}: Props) => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30,
    }}
    testID="onboardingFindFriends"
  >
    <View style={{width: '80%', marginBottom: 33 * s}}>
      <RText style={styles.onboardingH1}>Find Friends</RText>
    </View>

    <View style={{width: '70%', marginBottom: 48 * s}}>
      <RText style={styles.onboardingSubtext}>
        Let’s add your family and friends. Once they join you will be able to share your location
        and places on the map.
      </RText>
    </View>

    <View style={{marginBottom: 82 * s}}>
      <Image source={require('../../../images/FindFriends.png')} />
    </View>

    <GradientButton
      isPink
      style={{height: 50, width: '80%', borderRadius: 4, marginBottom: 26 * s}}
      onPress={onPress}
    >
      <RText color={WHITE} size={18.5}>
        Find Friends
      </RText>
    </GradientButton>

    <TouchableOpacity
      onPress={onSkip}
      style={{marginBottom: 34 * minHeight}}
      testID="onboardingSkipFindFriends"
    >
      <View>
        <RText color={PINK} size={18.5}>
          Skip
        </RText>
      </View>
    </TouchableOpacity>
  </View>
)

export default OnboardingFindFriends
