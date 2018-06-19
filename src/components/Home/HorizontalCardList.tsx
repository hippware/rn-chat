import React from 'react'
import {View, StyleSheet} from 'react-native'
import {width, k} from '../Global'
import Carousel from 'react-native-snap-carousel'
import LocationCard from '../home-cards/LocationCard'
import TutorialCard from '../home-cards/TutorialCard'
import YouCard from '../home-cards/YouCard'
import {inject, observer} from 'mobx-react/native'
import {IWocky, IEventBot} from 'wocky-client'
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
            onSnapToItem={slideIndex => homeStore.set({scrollIndex: slideIndex})}
            inactiveSlideOpacity={1}
            firstItem={homeStore.listStartIndex}
          />
        )}
      </View>
    )
  }

  renderItem = ({item, index}: {item: IEventBot | string | any; index: number}) => {
    if (item === 'you') {
      return <YouCard />
    } else if (item.type === 'tutorial') {
      return <TutorialCard {...item} />
    }
    // return null
    switch (this.props.homeStore.listMode) {
      case 'home':
        return <LocationCard item={item as IEventBot} index={index} />
      case 'discover':
        return <LocationCard item={item as IEventBot} index={index} />
      case 'tutorial':
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
