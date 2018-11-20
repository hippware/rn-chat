import React from 'react'
import {View} from 'react-native'
import {RText} from '../common'

type Props = {
  onPress: () => void // the function that gets called when the user presses "Allow Accelerometer"
}

class OnboardingLocation extends React.Component<Props> {
  render() {
    return (
      // TODO: @irfirl to add components and styling
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <RText size={30} style={{textAlign: 'center'}}>
          Onboarding - Accelerometer
        </RText>
      </View>
    )
  }
}

export default OnboardingLocation
