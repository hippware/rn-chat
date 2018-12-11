import React from 'react'
import {View, Image} from 'react-native'
import {RText, GradientButton, Separator} from '../common'
import {s, minHeight, k} from '../Global'
import {onboardingSlideStyle as styles} from '../styles'

type Props = {
  onPress: () => void // the function that gets called when the user presses "Allow Accelerometer"
}

class OnboardingFindFriendsList extends React.Component<Props> {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'center',
            width: '70%',
            paddingTop: 80 * s,
            height: 200 * k,
          }}
        >
          <Image
            style={{width: 60, height: 70, marginTop: 5}}
            source={require('../../../images/iconBot.png')}
          />
          <RText style={[styles.onboardingH1, {textAlign: 'left', marginLeft: 20, width: 176}]}>
            Find Friends on tinyrobot!
          </RText>
        </View>

        <Separator style={{width: '100%', marginHorizontal: 5}} />

        <GradientButton
          isPink
          style={{height: 50 * minHeight, width: '100%', position: 'absolute', bottom: 0}}
          onPress={this.props.onPress}
        >
          <RText size={18.5} color="white" style={{letterSpacing: 0.8}}>
            Done
          </RText>
        </GradientButton>
      </View>
    )
  }
}

export default OnboardingFindFriendsList
