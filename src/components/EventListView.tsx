import React from 'react'
import {TouchableOpacity, View, FlatList, StyleSheet, Text, Image} from 'react-native'
import {colors} from '../constants'
import {k} from './Global'
import {observer, inject} from 'mobx-react/native'

import EventCard from './event-cards/EventCard'
import ListFooter from './ListFooter'
import LinearGradient from 'react-native-linear-gradient'
import Swipeable from 'react-native-swipeable'
import {RText} from './common'

const leftContent = <Text />
const HomeStreamHeader = inject('wocky')(observer(({visible, wocky}) => {
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

@inject('wocky')
@observer
class EventList extends React.Component<{}> {
  list: ?Object

  scrollToTop = () => {
    this.list && this.list.props.data.length && this.list.scrollToIndex({animated: true, index: 0})
  }

  render() {
    const {sessionCount, events, connected} = this.props.wocky
    const backgroundColor = colors.LIGHT_GREY
    const footerImage = require('../../images/graphicEndHome.png')
    const {finished} = events
    const isFirstSession = sessionCount <= 2

    return (
      <View style={{flex: 1, backgroundColor}}>
        <FlatList
          data={events.length > 0 ? events.list : null}
          ref={r => (this.list = r)}
          // onRefresh=@TODO
          onEndReachedThreshold={0.5}
          onEndReached={events.load}
          initialNumToRender={2}
          ListHeaderComponent={() => <HomeStreamHeader visible={isFirstSession} />}
          // trick to 'refresh' FlatList after re-connect so onEndReached could be called again
          ListFooterComponent={connected ? observer(() => <ListFooter footerImage={footerImage} finished={finished} />) : null}
          renderItem={({item}) => <EventCard item={item} />}
          keyExtractor={item => item.id}
        />
        <UpdateButton scroll={this.scrollToTop} visible />
        <ReviewButton />
      </View>
    )
  }
}

const UpdateButton = inject('wocky')(observer(({scroll, visible, wocky}) =>
  (visible && wocky.updates.length ? (
    <TouchableOpacity
      onPress={() => {
        scroll()
        setTimeout(wocky.incorporateUpdates, 500)
      }}
      style={styles.updateButton}
    >
      <Image source={require('../../images/up.png')} style={{marginRight: 5 * k}} />
      <RText weight='Medium' color={colors.WHITE} size={12}>
            New Updates
      </RText>
    </TouchableOpacity>
  ) : null)))

// TODO: 'Enjoying tinyrobot? Leave a review!'. https://github.com/hippware/rn-chat/issues/1484
const ReviewButton = () => null

export default EventList

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
  updateButton: {
    position: 'absolute',
    top: 20 * k,
    paddingHorizontal: 40 * k,
    paddingVertical: 7 * k,
    backgroundColor: colors.PINK,
    alignSelf: 'center',
    borderRadius: 17 * k,
    flexDirection: 'row',
    alignItems: 'center',
  },
})
