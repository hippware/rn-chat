import React from 'react'
import {Animated, StyleSheet} from 'react-native'
import {width, k} from '../Global'
import Carousel from 'react-native-snap-carousel'
import LocationCard from '../home-cards/LocationCard'
import TutorialCard from '../home-cards/TutorialCard'
import YouCard from '../home-cards/YouCard'
import {inject, observer} from 'mobx-react/native'
import {IWocky, IBot} from 'wocky-client'
import {IHomeStore} from '../../store/HomeStore'
import {reaction} from 'mobx'

type Props = {
  wocky?: IWocky
  homeStore?: IHomeStore
}

type State = {
  marginBottom: Animated.Value
}

@inject('homeStore')
@observer
export default class SnapScroller extends React.Component<Props, State> {
  state = {
    marginBottom: new Animated.Value(10 * k),
  }

  componentDidMount() {
    reaction(
      () => this.props.homeStore.fullScreenMode,
      (mode: boolean) => {
        // const {scrollListToIndex, scrollIndex} = this.props.homeStore
        Animated.spring(this.state.marginBottom, {
          toValue: mode ? -155 : 10 * k,
        }).start(this.props.homeStore.syncList)
      }
    )
  }

  render() {
    const {homeStore} = this.props
    return (
      <Animated.View style={[styles.container, {marginBottom: this.state.marginBottom}]}>
        {homeStore.listData.length && (
          <Carousel
            key={homeStore.fullScreenMode ? 1 : 0}
            ref={homeStore.setListRef}
            data={homeStore.listData}
            renderItem={this.renderItem}
            sliderWidth={width}
            itemWidth={width - 50 * k}
            onSnapToItem={slideIndex => homeStore.setScrollIndex(slideIndex)}
            inactiveSlideOpacity={1}
            onLayout={ev => {
              // homeStore.syncList()
            }}
          />
        )}
      </Animated.View>
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
    // marginBottom: 10 * k,
    alignSelf: 'flex-end',
    height: 100,
  },
})
