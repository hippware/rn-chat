import React from 'react'
import {Animated, StyleSheet} from 'react-native'
import {width, k} from '../Global'
import Carousel from 'react-native-snap-carousel'
import BotCard from '../home-cards/BotCard'
import TutorialCard from '../home-cards/TutorialCard'
import YouCard from '../home-cards/YouCard'
import {observer, inject, Observer} from 'mobx-react/native'
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

const cardMap = {
  BotCard,
  YouCard,
  TutorialCard,
}

@inject('homeStore')
@observer
export default class HorizontalCardList extends React.Component<Props, State> {
  state = {
    marginBottom: new Animated.Value(10 * k),
  }

  list: any

  componentDidMount() {
    const {homeStore} = this.props

    // show/hide the list depending on fullscreenMode
    reaction(
      () => homeStore.fullScreenMode,
      (mode: boolean) => {
        Animated.spring(this.state.marginBottom, {
          toValue: mode ? -155 : 10 * k,
        }).start()
      }
    )

    // auto-scroll the list to the selected index (but only when a bot marker is selected)
    reaction(
      () => homeStore.index,
      (index: number) => {
        this.list.snapToItem(index, true, false)
      }
    )
  }

  render() {
    const {homeStore} = this.props
    const {fullScreenMode, list, setIndex} = homeStore
    return (
      <Animated.View style={[styles.container, {marginBottom: this.state.marginBottom}]}>
        {list.length && (
          <Carousel
            ref={r => (this.list = r)}
            data={Array.from(list)}
            renderItem={this.renderItem}
            sliderWidth={width}
            itemWidth={width - 50 * k}
            // onSnapToItem={index => list[index].select()} // enable if you don't need to unselect current bot for you/tutorial
            onSnapToItem={setIndex}
            inactiveSlideOpacity={1}
          />
        )}
      </Animated.View>
    )
  }

  renderItem = ({item, index}: {item: ICard; index: number}) => {
    const RenderClass = cardMap[getType(item).name]
    return <Observer>{() => <RenderClass {...item} />}</Observer>
  }
}

const styles = StyleSheet.create({
  container: {
    // marginBottom: 10 * k,
    alignSelf: 'flex-end',
    height: 100,
  },
})
