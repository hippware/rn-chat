import React from 'react'
import {TouchableOpacity, View, FlatList, StyleSheet, Text, Image} from 'react-native'
import {colors} from '../../constants'
import {k} from '../Global'
import {observer, inject} from 'mobx-react/native'

import EventCard from '../event-cards/EventCard'
import ListFooter from '../ListFooter'
import {RText} from '../common'
import HomeStreamHeader from './HomestreamHeader'
import {IWocky, IEventBot} from 'wocky-client'

type Props = {
  wocky?: IWocky
}

@inject('wocky')
@observer
class EventList extends React.Component<Props> {
  list: any

  componentDidMount() {
    if (this.props.wocky!.profile) this.props.wocky!.profile!.subscribedBots.load()
  }

  scrollToTop = () => {
    if (this.list && this.list.props.data.length)
      this.list.scrollToIndex({animated: true, index: 0})
  }

  renderItem = ({item}: {item: IEventBot}) => <EventCard item={item} />

  keyExtractor = (item: any) => item.id

  onUpdate = () => {
    this.scrollToTop()
    setTimeout(this.props.wocky!.incorporateUpdates, 500)
  }

  render() {
    const {sessionCount, events, connected} = this.props.wocky!
    const backgroundColor = colors.LIGHT_GREY
    const footerImage = require('../../../images/graphicEndHome.png')
    const {finished} = events
    const isFirstSession = sessionCount <= 2

    return (
      <View style={{flex: 1, backgroundColor}}>
        <FlatList
          data={events.length > 0 ? events.list : null}
          ref={r => (this.list = r)}
          onEndReachedThreshold={0.5}
          onEndReached={events.load}
          initialNumToRender={2}
          ListHeaderComponent={<HomeStreamHeader visible={isFirstSession} />}
          // trick to 'refresh' FlatList after re-connect so onEndReached could be called again
          ListFooterComponent={
            connected
              ? observer(() => <ListFooter footerImage={footerImage} finished={finished} />)
              : null
          }
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
        <UpdateButton
          scroll={this.scrollToTop}
          visible={!isFirstSession}
          onUpdate={this.onUpdate}
        />
        <ReviewButton />
      </View>
    )
  }
}

const UpdateButton = inject('wocky')(
  observer(
    ({scroll, visible, wocky, onUpdate}) =>
      visible && wocky.updates.length ? (
        <TouchableOpacity onPress={onUpdate} style={styles.updateButton}>
          <Image source={require('../../../images/up.png')} style={{marginRight: 5 * k}} />
          <RText weight="Medium" color={colors.WHITE} size={12}>
            New Updates
          </RText>
        </TouchableOpacity>
      ) : null
  )
)

// TODO: 'Enjoying tinyrobot? Leave a review!'. https://github.com/hippware/rn-chat/issues/1520
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
