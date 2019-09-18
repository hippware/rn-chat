import React from 'react'
import {View, Image} from 'react-native'
import {RText, GradientButton} from '../common'
import {WHITE} from 'src/constants/colors'
import {s} from '../Global'
import {onboardingSlideStyle as styles} from '../styles'

type Props = {
  onPress: () => void // the function that gets called when the user presses "Allow Accelerometer"
}

const OnboardingAccelerometer = ({onPress}: Props) => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 40,
    }}
  >
    <View style={{width: '80%', marginBottom: 33 * s}}>
      <RText style={styles.onboardingH1}>Allow{'\r\n'} Accelerometer</RText>
    </View>

    <View style={{width: '70%', marginBottom: 42 * s}}>
      <RText style={styles.onboardingSubtext}>
        Using the accelerometer increases battery-efficiency by intelligently toggling
        location-tracking while moving.
      </RText>
    </View>

    <View style={{marginBottom: 82 * s}}>
      <Image source={require('../../../images/walkingMan.png')} />
    </View>

    <GradientButton
      isPink
      style={{height: 50, width: '80%', borderRadius: 4}}
      onPress={this.props.onPress}
      testID="accelerometerPermissionButton"
    >
      <RText color={WHITE} size={18.5}>
        Allow Accelerometer
      </RText>
    </GradientButton>
  </View>
)

export default OnboardingAccelerometer
