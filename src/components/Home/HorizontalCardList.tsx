import React from 'react'
import {View, StyleSheet} from 'react-native'
import {width, k} from '../Global'
import Carousel from 'react-native-snap-carousel'
import LocationCard from '../home-cards/LocationCard'
import TutorialCard from '../home-cards/TutorialCard'
import YouCard from '../home-cards/YouCard'
import {inject, observer} from 'mobx-react/native'
import {IWocky, IBot} from 'wocky-client'
import {IHomeStore} from '../../store/HomeStore'

type Props = {
  wocky?: IWocky
  homeStore?: IHomeStore
}

@inject('homeStore')
@observer
export default class SnapScroller extends React.Component<Props> {
  render() {
    const {homeStore} = this.props
    return (
      <View style={styles.container}>
        {homeStore.listData.length && (
          <Carousel
            ref={homeStore.setListRef}
            data={homeStore.listData}
            renderItem={this.renderItem}
            sliderWidth={width}
            itemWidth={width - 50 * k}
            onSnapToItem={slideIndex => homeStore.setScrollIndex(slideIndex)}
            inactiveSlideOpacity={1}
          />
        )}
      </View>
    )
  }

  renderItem = ({item, index}: {item: IBot | string | any; index: number}) => {
    if (item === 'you') {
      return <YouCard />
    } else if (item.type === 'tutorial') {
      return <TutorialCard {...item} />
    } else if (this.props.homeStore.listMode === 'home') {
      return <LocationCard item={item as IBot} index={index} />
    } else {
      return <LocationCard item={item as IBot} index={index} />
    }
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10 * k,
    alignSelf: 'flex-end',
    height: 100,
  },
})
