import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import {RText, GradientButton} from '../common'
import {WHITE} from 'src/constants/colors'
import {k} from '../Global'

type Props = {
  onPress: () => void // the function that gets called when the user presses "Allow Accelerometer"
}

class OnboardingLocation extends React.Component<Props> {
  render() {
    return (
      // TODO: @irfirl to add components and styling
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{width: '80%', marginBottom: 33 * k}}>
          <RText style={styles.onboardingH1}>Allow Accelerometer</RText>
        </View>

        <View style={{width: '70%', marginBottom: 42 * k}}>
          <RText style={styles.onboardingSubtext}>
            Using the accelerometer increases battery-efficiency by intelligently toggling
            location-tracking while moving.
          </RText>
        </View>

        <View style={{marginBottom: 82 * k}}>
          <Image source={require('../../../images/walkingMan.png')} />
        </View>

        <GradientButton
          isPink
          style={{height: 50, width: '80%', borderRadius: 4}}
          onPress={this.props.onPress}
        >
          <RText color={WHITE} size={17.5}>
            Allow Accelerometer
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
