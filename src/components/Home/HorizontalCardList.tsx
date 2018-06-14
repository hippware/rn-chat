import React from 'react'
import {View, StyleSheet} from 'react-native'
import {width, k} from '../Global'
import Carousel from 'react-native-snap-carousel'
import LocationCard from './LocationCard'
import {inject} from 'mobx-react/native'
import {IWocky, IEventBot} from 'wocky-client'

type Props = {
  wocky?: IWocky
}

@inject('wocky')
export default class SnapScroller extends React.Component<Props> {
  list?: any

  render() {
    const {events} = this.props.wocky!
    return (
      <View style={styles.container}>
        <Carousel
          ref={c => (this.list = c)}
          // data={data}
          data={events.length > 0 ? events.list : null}
          renderItem={this.renderItem}
          sliderWidth={width}
          itemWidth={width - 50 * k}
          // onSnapToItem={slideIndex => console.log('slideIndex', slideIndex)}
        />
      </View>
    )
  }

  renderItem = ({item}: {item: IEventBot}) => <LocationCard item={item} />
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    height: 100,
    marginBottom: 10 * k,
  },
})
