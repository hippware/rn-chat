import React from 'react'
import {View, StyleSheet, Text, Image} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import Swipeable from 'react-native-swipeable'
import LinearGradient from 'react-native-linear-gradient'
import {IWocky} from 'wocky-client'
import {k} from '../Global'

const leftContent = <Text />

type Props = {
  wocky?: IWocky
}

@inject('wocky')
@observer
class WelcomeNote extends React.Component<Props> {
  onRelease = () => this.props.wocky!.setSessionCount(3)
  render() {
    return this.props.wocky!.sessionCount <= 2 ? (
      <Swipeable
        leftContent={leftContent}
        rightContent={leftContent}
        onLeftActionRelease={this.onRelease}
        onRightActionRelease={this.onRelease}
      >
        <LinearGradient
          colors={['rgba(255,151,77,1)', 'rgba(253,56,134,1)']}
          style={styles.gradient}
        >
          <Image
            style={{width: 31.7 * k, height: 36.5 * k}}
            source={require('../../../images/white.png')}
          />
          <View style={{flex: 1}}>
            <Text style={styles.welcome}>
              {'Welcome to '}
              <Text style={{fontFamily: 'Roboto-Bold'}}>tinyrobot</Text>
              ! We’ve added our team as your friends! You may unfollow us at anytime. 🎉
            </Text>
          </View>
        </LinearGradient>
      </Swipeable>
    ) : null
  }
}

export default WelcomeNote

const styles = StyleSheet.create({
  gradient: {
    height: 95 * k,
    paddingTop: 17.5 * k,
    paddingRight: 26.6 * k,
    paddingLeft: 17.5 * k,
    flexDirection: 'row'
  },
  welcome: {
    paddingLeft: 19.8 * k,
    fontFamily: 'Roboto-Regular',
    fontSize: 15 * k,
    color: 'white',
    backgroundColor: 'transparent'
  }
})
