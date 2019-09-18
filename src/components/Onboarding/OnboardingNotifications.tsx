import React from 'react'
import {View, Image} from 'react-native'
import {RText, GradientButton} from '../common'
import {WHITE} from 'src/constants/colors'
import {s} from '../Global'
import {onboardingSlideStyle as styles} from '../styles'

type Props = {
  onPress: () => void // the function that gets called when the user presses "Allow Notifications"
}

const OnboardingNotifications = ({onPress}: Props) => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 40,
    }}
  >
    <View style={{width: '80%', marginBottom: 33 * s}}>
      <RText style={styles.onboardingH1}>Turn On{'\r\n'} Notifications</RText>
    </View>

    <View style={{width: '70%', marginBottom: 72 * s}}>
      <RText style={styles.onboardingSubtext}>
        Know instantly when friends visit your locations or share new locations with you.
      </RText>
    </View>

    <View style={{marginBottom: 82 * s}}>
      <Image source={require('../../../images/notificationIcn.png')} />
    </View>

    <GradientButton
      isPink
      style={{height: 50, width: '80%', borderRadius: 4}}
      onPress={this.props.onPress}
    >
      <RText color={WHITE} size={18.5}>
        Allow Notifications
      </RText>
    </GradientButton>
  </View>
)

export default OnboardingNotifications
