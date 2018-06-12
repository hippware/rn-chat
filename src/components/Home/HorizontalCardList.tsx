import React from 'react'
import {View} from 'react-native'
import {width} from '../Global'
import Carousel from 'react-native-snap-carousel'

const data = ['1', '2', '3']

export default class SnapScroller extends React.Component<{}> {
  list?: any

  render() {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          left: 0,
          right: 0,
          height: 150,
        }}
      >
        <Carousel
          ref={c => (this.list = c)}
          data={data}
          renderItem={this.renderItem}
          sliderWidth={width}
          itemWidth={width - 20}
          // onSnapToItem={slideIndex => console.log('slideIndex', slideIndex)}
        />
      </View>
    )
  }

  renderItem = ({item}) => (
    <View style={{borderColor: 'red', backgroundColor: 'white', borderWidth: 1, flex: 1}} />
  )
}
