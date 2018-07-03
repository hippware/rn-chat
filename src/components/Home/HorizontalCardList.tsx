import React from 'react'
import {Animated, StyleSheet} from 'react-native'
import {width, k} from '../Global'
import Carousel from 'react-native-snap-carousel'
import LocationCard from '../home-cards/LocationCard'
import TutorialCard from '../home-cards/TutorialCard'
import YouCard from '../home-cards/YouCard'
import {observer, inject} from 'mobx-react/native'
import {IWocky, IBot} from 'wocky-client'
import {reaction} from 'mobx'
import {IHomeStore, ICard} from '../../store/HomeStore'
import {getType} from 'mobx-state-tree'

type Props = {
  wocky?: IWocky
  homeStore?: IHomeStore
  syncList: () => void
  // listData: any[]
  setScrollIndex: (index: number) => void
  setListRef: (ref: any) => void
  // listMode: string
  scrollIndex: number
}

type State = {
  marginBottom: Animated.Value
}

const CardDataRenderMap = {
  LocationCardData: LocationCard,
  YouCardData: YouCard,
  TutorialCardData: TutorialCard,
}

@inject('homeStore')
@observer
export default class HorizontalCardList extends React.Component<Props, State> {
  state = {
    marginBottom: new Animated.Value(10 * k),
  }

  componentDidMount() {
    reaction(
      () => this.props.homeStore.fullScreenMode,
      (mode: boolean) => {
        Animated.spring(this.state.marginBottom, {
          toValue: mode ? -155 : 10 * k,
        }).start(this.props.syncList)
      }
    )
  }

  render() {
    const {setListRef, setScrollIndex, homeStore} = this.props
    const {fullScreenMode, list} = homeStore
    return (
      <Animated.View style={[styles.container, {marginBottom: this.state.marginBottom}]}>
        {list.length && (
          <Carousel
            key={fullScreenMode ? 1 : 0}
            ref={setListRef}
            data={list}
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

  renderItem = ({item, index}: {item: ICard; index: number}) => {
    const RenderClass = CardDataRenderMap[getType(item).name]
    // console.log('& render item', {...item}, RenderClass)
    return <RenderClass {...item} isFocused />
    // return null
  }
}

const styles = StyleSheet.create({
  container: {
    // marginBottom: 10 * k,
    alignSelf: 'flex-end',
    height: 100,
  },
})
