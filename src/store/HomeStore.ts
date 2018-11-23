import {types, getType, getParent, applySnapshot} from 'mobx-state-tree'
import {IObservableArray} from 'mobx'
import {Bot, IBot, Location} from 'wocky-client'

const SelectableCard = types
  .model('SelectableCard', {
    isSelected: false,
  })
  .views(self => ({
    // returns index within parent list
    get index() {
      return (getParent(self) as IObservableArray).findIndex(item => {
        return item === self
      })
    },
  }))
  .actions(self => ({
    setSelected: (value: boolean) => (self.isSelected = value),
    select: () => {
      ;(getParent(self, 2) as IHomeStore).setIndex(self.index)
    },
  }))

type SelectableCardType = typeof SelectableCard.Type
export interface ISelectableCard extends SelectableCardType {}
const BotCard = types
  .compose(
    SelectableCard,
    types.model({
      bot: types.reference(Bot),
    })
  )
  .named('BotCard')

type BotCardType = typeof BotCard.Type
interface IBotCard extends BotCardType {}

const YouCard = SelectableCard.props({
  you: types.boolean,
}).named('YouCard')
// NOTE: if we don't need to unselect current bot we can return empty 'select' and use it from HorizontalCardList
// .actions(self => ({
//   select: () => {
//     // no action for you card
//   },
// }))

const TutorialCard = SelectableCard.props({
  tutorial: types.boolean,
}).named('TutorialCard')

const Card = types.union(BotCard, YouCard, TutorialCard)
export type ICard = typeof Card.Type

const HomeStore = types
  .model('HomeStore', {
    fullScreenMode: false,
    detailsMode: false,
    creationMode: false,
    homeBotList: types.optional(types.array(Card), [{tutorial: true}, {you: true}]), // pre-populate with 'you', tutorial card
    index: 0,
    focusedBotLocation: types.maybeNull(Location),
    mapCenterLocation: types.maybeNull(Location),
    scrolledToBot: types.maybeNull(types.reference(Bot)),
  })
  .views(self => ({
    // return the list for current mode
    get list(): ICard[] {
      return self.creationMode ? [] : self.homeBotList
    },
  }))
  .views(self => ({
    get isBotSelected(): boolean {
      return getType(self.list[self.index]) === BotCard
    },
  }))
  .actions(self => ({
    setCreationMode(value) {
      self.creationMode = value
    },
    setDetailsMode(value) {
      self.detailsMode = value
    },
    setFocusedLocation(location) {
      if (!location) {
        self.focusedBotLocation = null
      } else {
        const {latitude, longitude, accuracy} = location
        // change center only if location is changed
        if (
          !self.focusedBotLocation ||
          self.focusedBotLocation.longitude !== longitude ||
          self.focusedBotLocation.latitude !== latitude
        ) {
          self.focusedBotLocation = Location.create({latitude, longitude, accuracy})
        }
      }
    },
    setMapCenter({latitude, longitude, accuracy}) {
      self.mapCenterLocation = Location.create({latitude, longitude, accuracy})
    },
  }))
  .actions(self => ({
    // sets new index for the current mode, deselects previously selected bot and select new one.
    setIndex: (index: number): void => {
      self.fullScreenMode = false
      if (self.index < self.homeBotList.length) {
        self.homeBotList[self.index].setSelected(false)
      }
      if (index < self.homeBotList.length) {
        self.index = index
        if (self.list.length) {
          // select card
          self.list[self.index].setSelected(true)
          // change map center if bot card is selected
          if (getType(self.list[self.index]) === BotCard) {
            self.setFocusedLocation((self.list[self.index] as IBotCard).bot.location)
          }
        }
      }
    },
  }))
  .actions(self => {
    return {
      logout() {
        applySnapshot(self, {})
      },
      addBotsToList(bots: IBot[]): void {
        const list = self.homeBotList
        bots.forEach(bot => {
          if (!list.find((item: any) => item.bot && item.bot.id === bot.id)) {
            list.push(BotCard.create({bot}))
          }
        })
      },
      removeBot(bot: IBot): void {
        const index = self.homeBotList.findIndex((item: any) => item.bot && item.bot.id === bot.id)
        if (index !== -1) {
          self.homeBotList.splice(index, 1)
        }
        if (index <= self.index) {
          self.setIndex(self.index - 1) // TODO set index within visible area
        }
      },
      // toggleListMode: (): void => {
      //   self.setIndex(self.index) // need to do it to 'refresh' bot markers, deselect and set new map center
      //   self.fullScreenMode = false
      // },
      toggleFullscreen: () => {
        self.fullScreenMode = !self.fullScreenMode
      },
      disableFullScreen: () => {
        self.fullScreenMode = false
      },
      start() {
        // empty
      },
      finish() {
        self.setFocusedLocation(null) // otherwise focused location will not be changed and reaction will not fire
      },
    }
  })
  .postProcessSnapshot((snapshot: any) => {
    // No need to persist this store
    return {}
  })
  .actions(self => ({
    selectBot(bot: IBot) {
      const index = self.list.findIndex((b: any) => b.bot && b.bot.id === bot.id)
      if (index >= 0) {
        self.setIndex(index)
      } else {
        self.addBotsToList([bot])
        self.setIndex(self.list.length - 1)
      }
    },
  }))

export default HomeStore
type HomeStoreType = typeof HomeStore.Type
export interface IHomeStore extends HomeStoreType {}
