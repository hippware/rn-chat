import React from 'react'
import {Animated, StyleSheet} from 'react-native'
import {width, k} from '../Global'
import Carousel from 'react-native-snap-carousel'
import BotCard from '../home-cards/BotCard'
import TutorialCard from '../home-cards/TutorialCard'
import YouCard from '../home-cards/YouCard'
import {observer, inject, Observer} from 'mobx-react/native'
import {IWocky} from 'wocky-client'
import {reaction, computed} from 'mobx'
import {IHomeStore, ICard} from '../../store/HomeStore'
import {getType} from 'mobx-state-tree'
import {Actions} from 'react-native-router-flux'

type Props = {
  wocky?: IWocky
  homeStore?: IHomeStore
}

type State = {
  translateY: Animated.Value
}

const cardMap = {
  BotCard,
  YouCard,
  TutorialCard,
}

const translateYDefault = -13 * k

@inject('homeStore')
@observer
export default class HorizontalCardList extends React.Component<Props, State> {
  state = {
    translateY: new Animated.Value(translateYDefault),
  }

  list: any
  reactions: any[] = []

  componentDidMount() {
    const {homeStore} = this.props

    this.reactions = [
      // show/hide the list depending on fullscreenMode
      reaction(
        () => homeStore.fullScreenMode || this.showingBottomPopup,
        (isFullScreen: boolean) => {
          Animated.spring(this.state.translateY, {
            toValue: isFullScreen ? 400 * k : translateYDefault,
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
    const {translateY} = this.state
    return (
      <Animated.View style={[styles.container, {transform: [{translateY}]}]}>
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

  @computed
  get showingBottomPopup() {
    // TODO: move this logic to rnrf
    return ['bottomMenu', 'locationDetails'].includes(Actions.currentScene)
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    height: 115 * k,
  },
})
