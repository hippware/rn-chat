import React from 'react'
import {View, StyleSheet, Image, Text} from 'react-native'
import {RText, GradientButton} from '../common'
import {WHITE} from 'src/constants/colors'
import {k} from '../Global'

type Props = {
  onPress: () => void // the function that gets called when the user presses "Always Allow Location"
}

class OnboardingLocation extends React.Component<Props> {
  render() {
    return (
      // TODO: @irfirl to add components and styling
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{width: '80%', marginBottom: 32 * k}}>
          <RText style={styles.onboardingH1}>Allow Location Access</RText>
        </View>

        <View style={{width: '70%', marginBottom: 67 * k}}>
          <RText style={styles.onboardingSubtext}>
            With '<Text style={{color: '#fe5c6c'}}>Always Allow</Text>' you won’t miss out on
            relevant location notifications.
          </RText>
        </View>

        <View style={{marginBottom: 37 * k}}>
          <Image source={require('../../../images/001Gps.png')} />
        </View>

        <View style={{marginBottom: 37 * k}}>
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

const styles = StyleSheet.create({
  almostDone: {
    color: '#3f324d',
    fontSize: 18,
  },
  onboardingH1: {
    color: '#fe5c6c',
    fontSize: 30,
    fontWeight: '100',
    textAlign: 'center',
  },
  onboardingSubtext: {
    color: '#757575',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '100',
  },
})

export default OnboardingLocation
