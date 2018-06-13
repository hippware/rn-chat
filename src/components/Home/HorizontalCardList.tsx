import React from 'react'
import {View, StyleSheet} from 'react-native'
import {width, k} from '../Global'
import Carousel from 'react-native-snap-carousel'

const data = ['1', '2', '3']

export default class SnapScroller extends React.Component<{}> {
  list?: any

  render() {
    return (
      <View style={styles.container}>
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

  renderItem = ({item}) => <View style={styles.card} />
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    height: 100,
    marginBottom: 10 * k,
  },
  card: {
    borderColor: 'red',
    backgroundColor: 'white',
    borderWidth: 1,
    flex: 1,
  },
})
