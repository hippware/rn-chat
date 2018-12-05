import React from 'react'
import {View, Image, Text} from 'react-native'
import {RText, GradientButton} from '../common'
import {WHITE} from 'src/constants/colors'
import {s, minHeight} from '../Global'
import {onboardingSlideStyle as styles} from '../styles'

type Props = {
  onPress: () => void // the function that gets called when the user presses "Always Allow Location"
}

class OnboardingLocation extends React.Component<Props> {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginTop: 40 * minHeight,
        }}
      >
        <View style={{width: '80%', marginBottom: 32 * s}}>
          <RText style={styles.onboardingH1}>Allow Location Access</RText>
        </View>

        <View style={{width: '70%', marginBottom: 67 * s}}>
          <RText style={styles.onboardingSubtext}>
            With '<Text style={{color: '#fe5c6c'}}>Always Allow</Text>' you won’t miss out on
            relevant location notifications.
          </RText>
        </View>

        <View style={{marginBottom: 37 * s}}>
          <Image source={require('../../../images/001Gps.png')} />
        </View>

        <View style={{marginBottom: 37 * s}}>
          <RText style={styles.onboardingSubtext}>You can also go invisible later 😉</RText>
        </View>

        <GradientButton
          isPink
          style={{height: 50, width: '80%', borderRadius: 4}}
          onPress={this.props.onPress}
        >
          <RText color={WHITE} size={17.5}>
            Always Allow Location
          </RText>
        </GradientButton>
      </View>
    )
  }
}

export default OnboardingLocation
