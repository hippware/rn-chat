import React from 'react'
import {Animated, StyleSheet} from 'react-native'
import {width, k} from '../Global'
import Carousel from 'react-native-snap-carousel'
import LocationCard from '../home-cards/LocationCard'
import TutorialCard from '../home-cards/TutorialCard'
import YouCard from '../home-cards/YouCard'
import {observer} from 'mobx-react/native'
import {IWocky, IBot} from 'wocky-client'
import {reaction} from 'mobx'

type Props = {
  wocky?: IWocky
  fullScreenMode: boolean
  syncList: () => void
  listData: any[]
  setScrollIndex: (index: number) => void
  setListRef: (ref: any) => void
  listMode: string
  scrollIndex: number
}

type State = {
  marginBottom: Animated.Value
}

@observer
export default class HorizontalCardList extends React.Component<Props, State> {
  state = {
    marginBottom: new Animated.Value(10 * k),
  }

  componentDidMount() {
    reaction(
      () => this.props.fullScreenMode,
      (mode: boolean) => {
        Animated.spring(this.state.marginBottom, {
          toValue: mode ? -155 : 10 * k,
        }).start(this.props.syncList)
      }
    )
  }

  render() {
    const {listData, fullScreenMode, setListRef, setScrollIndex} = this.props
    return (
      <Animated.View style={[styles.container, {marginBottom: this.state.marginBottom}]}>
        {listData.length && (
          <Carousel
            key={fullScreenMode ? 1 : 0}
            ref={setListRef}
            data={listData}
            renderItem={this.renderItem}
            sliderWidth={width}
            itemWidth={width - 50 * k}
            onSnapToItem={slideIndex => setScrollIndex(slideIndex)}
            inactiveSlideOpacity={1}
            // onLayout={ev => {}}
          />
        )}
      </Animated.View>
    )
  }

  renderItem = ({item, index}: {item: IBot | string | any; index: number}) => {
    // TODO: strategy pattern
    if (item === 'you') {
      return <YouCard />
    } else if (item.type === 'tutorial') {
      return <TutorialCard {...item} />
    } else if (this.props.listMode === 'home') {
      return <LocationCard item={item as IBot} index={index} scrollIndex={this.props.scrollIndex} />
    } else {
      return <LocationCard item={item as IBot} index={index} scrollIndex={this.props.scrollIndex} />
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
