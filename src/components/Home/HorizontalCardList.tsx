import React from 'react'
import {View, StyleSheet} from 'react-native'
import {width, k} from '../Global'
import Carousel from 'react-native-snap-carousel'
import LocationCard from './LocationCard'
import {inject} from 'mobx-react/native'
import {IWocky, IEventBot} from 'wocky-client'
import {IHomeStore} from '../../store/HomeStore'

type Props = {
  wocky?: IWocky
  homeStore?: IHomeStore
}

@inject('wocky', 'homeStore')
export default class SnapScroller extends React.Component<Props> {
  list?: any

  render() {
    const {wocky, homeStore} = this.props
    const {events} = wocky!
    return (
      <View style={styles.container}>
        <Carousel
          ref={c => (this.list = c)}
          // data={data}
          data={events.length > 0 ? events.list : null}
          renderItem={this.renderItem}
          sliderWidth={width}
          itemWidth={width - 50 * k}
          onSnapToItem={slideIndex => homeStore.set({scrollIndex: slideIndex})}
        />
      </View>
    )
  }

  renderItem = ({item, index}: {item: IEventBot; index: number}) => (
    <LocationCard item={item} index={index} />
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10 * k,
    alignSelf: 'flex-end',
    height: 120 * k,
  },
})
