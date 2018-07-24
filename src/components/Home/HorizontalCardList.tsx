import React from 'react'
import {Animated, StyleSheet, View, TouchableOpacity, Image} from 'react-native'
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
import {Actions} from 'react-native-router-flux'
import {colors} from '../../constants'

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
const toggle = require('../../../images/homeToggle.png')
const toggleOff = require('../../../images/homeToggleOff.png')
const create = require('../../../images/create.png')

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
      reaction(
        () => homeStore.fullScreenMode || homeStore.showingPopup,
        (isFullScreen: boolean) => {
          Animated.spring(this.state.translateY, {
            toValue: isFullScreen ? 160 * k : translateYDefault,
          }).start()
        },
        {name: 'HorizontalCardList: show/hide depending on fullscreenMode'}
      ),

      reaction(
        () => homeStore.index,
        (index: number) => {
          this.list.snapToItem(index, true, false)
        },
        {name: 'HorizontalCardList: auto-scroll to the selected index'}
      ),
    ]
  }

  componentWillUnmount() {
    this.reactions.forEach(disposer => disposer())
    this.reactions = []
  }

  render() {
    const {homeStore} = this.props
    const {list, setIndex, index} = homeStore
    const {translateY} = this.state
    return (
      <Animated.View style={[styles.container, {transform: [{translateY}]}]}>
        <ButtonColumn />
        <Carousel
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
      </Animated.View>
    )
  }

  renderItem = ({item, index}: {item: ICard; index: number}) => {
    const RenderClass = cardMap[getType(item).name]
    return <Observer>{() => <RenderClass {...item} />}</Observer>
  }
}

const ButtonColumn = inject('homeStore')(
  observer(
    ({homeStore}) =>
      Actions.currentScene !== 'locationEdit' && (
        <View
          style={{
            position: 'absolute',
            top: -150,
            right: 10,
          }}
        >
          <TouchableOpacity onPress={homeStore.toggleListMode} style={[styles.button, styles.pill]}>
            <Image source={homeStore.listMode === 'home' ? toggle : toggleOff} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Actions.createBot()
            }}
            style={styles.button}
          >
            <Image source={create} />
          </TouchableOpacity>
        </View>
      )
  )
)

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    height: 115 * k,
  },
  button: {
    marginTop: 15 * k,
  },
  pill: {
    shadowColor: colors.PINK,
    shadowRadius: 5 * k,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 0},
  },
})
