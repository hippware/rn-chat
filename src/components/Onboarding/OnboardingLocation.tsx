import React from 'react'
import {View} from 'react-native'
import {RText} from '../common'

type Props = {
  onPress: () => void // the function that gets called when the user presses "Always Allow Location"
}

class OnboardingLocation extends React.Component<Props> {
  render() {
    return (
      // TODO: @irfirl to add components and styling
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <RText size={30} style={{textAlign: 'center'}}>
          Onboarding - Location
        </RText>
        <RText size={20} style={{textAlign: 'center'}}>
          @irfirl to add some sweet components and styles here
        </RText>
      </View>
    )
  }
}

export default OnboardingLocation
