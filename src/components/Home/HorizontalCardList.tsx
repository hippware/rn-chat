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

const marginBottomDefault = 13 * k

@inject('homeStore')
@observer
export default class HorizontalCardList extends React.Component<Props, State> {
  state = {
    marginBottom: new Animated.Value(marginBottomDefault),
  }

  list: any
  reactions: any[] = []

  componentDidMount() {
    const {homeStore} = this.props

    this.reactions = [
      // show/hide the list depending on fullscreenMode
      reaction(
        () => homeStore.fullScreenMode,
        (isFullScreen: boolean) => {
          Animated.spring(this.state.marginBottom, {
            toValue: isFullScreen ? -155 * k : marginBottomDefault,
          }).start()
        }
      ),

      // auto-scroll the list to the selected index (but only when a bot marker is selected)
      reaction(
        () => homeStore.index,
        (index: number) => {
          this.list.snapToItem(index, true, false)
        }
      ),
    ]
  }

  componentWillUnmount() {
    this.reactions.forEach(disposer => disposer())
    this.reactions = []
  }

  render() {
    const {homeStore} = this.props
    const {list, setIndex, fullScreenMode, index} = homeStore
    return (
      <Animated.View style={[styles.container, {marginBottom: this.state.marginBottom}]}>
        {list.length && (
          <Carousel
            key={fullScreenMode ? 1 : 0}
            ref={r => (this.list = r)}
            data={list.slice()}
            renderItem={this.renderItem}
            firstItem={index}
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
    alignSelf: 'flex-end',
    height: 115 * k,
  },
})
