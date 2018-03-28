import React, {Component} from 'react'
import {TouchableOpacity, View, FlatList, StyleSheet, Text, Image} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import Swipeable from 'react-native-swipeable'
import LinearGradient from 'react-native-linear-gradient'

import BotBubble from './map/BotBubble'
import {k} from './Global'

const leftContent = <Text />

type Props = {
  wocky?: any,
  locationStore?: any,
  visible: boolean
}

const WelcomeNote = inject('wocky')(observer(({visible, wocky}: Props) => {
  return visible ? (
    <Swipeable leftContent={leftContent} rightContent={leftContent} onLeftActionRelease={() => wocky.setSessionCount(3)} onRightActionRelease={() => wocky.setSessionCount(3)}>
      <LinearGradient colors={['rgba(255,151,77,1)', 'rgba(253,56,134,1)']} style={styles.gradient}>
        <Image style={{width: 31.7 * k, height: 36.5 * k}} source={require('../../images/white.png')} />
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
}))

@inject('wocky', 'locationStore')
@observer
class HomeStreamHeader extends React.Component<Props> {
  componentDidMount() {
    this.props.wocky.profile && this.props.wocky.profile.subscribedBots.load()
  }
  render() {
    return (
      <View>
        <WelcomeNote {...this.props} />
        {this.props.locationStore.alwaysOn &&
          this.props.wocky.profile &&
          !!this.props.wocky.profile.activeBots.length && (
            <FlatList
              data={this.props.wocky.profile.activeBots}
              horizontal
              style={{backgroundColor: 'white', height: 90}}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View style={{padding: 15}}>
                  <BotBubble bot={item} scale={0} />
                </View>
              )}
            />
          )}
      </View>
    )
  }
}

export default HomeStreamHeader

const styles = StyleSheet.create({
  gradient: {
    height: 95 * k,
    paddingTop: 17.5 * k,
    paddingRight: 26.6 * k,
    paddingLeft: 17.5 * k,
    flexDirection: 'row',
  },
  welcome: {
    paddingLeft: 19.8 * k,
    fontFamily: 'Roboto-Regular',
    fontSize: 15 * k,
    color: 'white',
    backgroundColor: 'transparent',
  },
})
