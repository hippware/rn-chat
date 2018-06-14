import React from 'react'
import {View, StyleSheet} from 'react-native'
import {width, k} from '../Global'
import Carousel from 'react-native-snap-carousel'
import LocationCard from '../home-cards/LocationCard'
import TutorialCard from '../home-cards/TutorialCard'
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
        <Carousel
          data={homeStore.listData}
          renderItem={this.renderItem}
          sliderWidth={width}
          itemWidth={width - 50 * k}
          onSnapToItem={slideIndex => homeStore.set({scrollIndex: slideIndex})}
        />
      </View>
    )
  }

  renderItem = ({item, index}: {item: IEventBot; index: number}) => {
    switch (this.props.homeStore.listMode) {
      case 'home':
        return <LocationCard item={item} index={index} />
      case 'tutorial':
        return (
          <TutorialCard
            title="Something"
            text="Something else man"
            icon={require('../../../images/tutorialCreate.png')}
          />
        )
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
