import React from 'react'
import {Animated, StyleSheet} from 'react-native'
import {width, k} from '../Global'
import Carousel from 'react-native-snap-carousel'
import LocationCard from '../home-cards/LocationCard'
import TutorialCard from '../home-cards/TutorialCard'
import YouCard from '../home-cards/YouCard'
import {observer, inject} from 'mobx-react/native'
import {IWocky} from 'wocky-client'
import {reaction} from 'mobx'
import {IHomeStore, ICard} from '../../store/HomeStore'
import {getType} from 'mobx-state-tree'

type Props = {
  wocky?: IWocky
  homeStore?: IHomeStore
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

  list: any
  pendingScrollIndex?: number

  componentDidMount() {
    const {homeStore} = this.props

    // show/hide the list depending on fullscreenMode
    reaction(
      () => homeStore.fullScreenMode,
      (mode: boolean) => {
        Animated.spring(this.state.marginBottom, {
          toValue: mode ? -155 : 10 * k,
        }).start(homeStore.onListShown)
      }
    )

    // auto-scroll the list to the selected index (but only when a bot marker is selected)
    reaction(
      () => homeStore.index,
      (index: number) => {
        // NOTE: extra params on `snapToItem` prevent it from firing event listeners after scroll
        // https://github.com/archriss/react-native-snap-carousel/blob/master/doc/PROPS_METHODS_AND_GETTERS.md#available-methods
        if (index !== this.pendingScrollIndex) {
          this.list.snapToItem(index, true, false)
        }
        this.pendingScrollIndex = undefined
      }
    )
  }

  render() {
    const {homeStore} = this.props
    const {fullScreenMode, list, setScrollIndex} = homeStore
    return (
      <Animated.View style={[styles.container, {marginBottom: this.state.marginBottom}]}>
        {list.length && (
          <Carousel
            key={fullScreenMode ? 1 : 0}
            ref={r => (this.list = r)}
            data={list}
            renderItem={this.renderItem}
            sliderWidth={width}
            itemWidth={width - 50 * k}
            onSnapToItem={slideIndex => {
              this.pendingScrollIndex = slideIndex
              setScrollIndex(slideIndex)
            }}
            inactiveSlideOpacity={1}
          />
        )}
      </Animated.View>
    )
  }

  renderItem = ({item, index}: {item: ICard; index: number}) => {
    const RenderClass = CardDataRenderMap[getType(item).name]
    return <RenderClass {...item} isFocused />
  }
}

const styles = StyleSheet.create({
  container: {
    // marginBottom: 10 * k,
    alignSelf: 'flex-end',
    height: 100,
  },
})
