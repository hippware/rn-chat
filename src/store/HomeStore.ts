import {types, getType, getParent} from 'mobx-state-tree'
import {Bot, IBot, Location} from 'wocky-client'

export const SelectableCard = types
  .model('SelectableCard', {
    isSelected: false,
  })
  .views(self => ({
    // returns index within parent list
    get index() {
      return getParent(self).findIndex(item => {
        return item === self
      })
    },
  }))
  .actions(self => ({
    setSelected: (value: boolean) => (self.isSelected = value),
    select: () => {
      getParent(getParent(self)).setIndex(self.index)
    },
  }))

type SelectableCardType = typeof SelectableCard.Type
export interface ISelectableCard extends SelectableCardType {}
export const BotCard = types
  .compose(
    SelectableCard,
    types.model({
      bot: types.reference(Bot),
    })
  )
  .named('BotCard')

type BotCardType = typeof BotCard.Type
export interface IBotCard extends BotCardType {}

export const YouCard = SelectableCard.props({
  you: types.boolean,
}).named('YouCard')
// NOTE: if we don't need to unselect current bot we can return empty 'select' and use it from HorizontalCardList
// .actions(self => ({
//   select: () => {
//     // no action for you card
//   },
// }))

export const TutorialCard = SelectableCard.props({
  tutorial: types.boolean,
}).named('TutorialCard')

export const Card = types.union(BotCard, YouCard, TutorialCard)
export type ICard = typeof Card.Type

const HomeStore = types
  .model('HomeStore', {
    listMode: 'home',
    fullScreenMode: false,
    creationMode: false,
    discoverList: types.optional(types.array(Card), []),
    // homeBotList: types.optional(types.array(Card), [{tutorial: true}, {you: true}]), // pre-populate with 'you', tutorial card
    homeBotList: types.optional(types.array(Card), [{tutorial: true}, {you: true}]), // pre-populate with 'you', tutorial card
    discoverIndex: 0,
    homeBotIndex: 0,
    focusedBotLocation: types.maybe(Location),
    mapCenterLocation: types.maybe(Location),
    scrolledToBot: types.maybe(types.reference(Bot)),
    editIcon: types.maybe(types.string),
  })
  .views(self => ({
    // return the list for current mode
    get list(): ICard[] {
      return self.creationMode
        ? []
        : self.listMode === 'home' ? self.homeBotList : self.discoverList
    },
    // return index for the current mode
    get index(): number {
      return self.listMode === 'home' ? self.homeBotIndex : self.discoverIndex
    },
  }))
  .actions(self => ({
    setCreationMode(value) {
      self.creationMode = value
    },
    setFocusedBotLocation(location) {
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
      if (self.listMode === 'home') {
        self.homeBotList[self.homeBotIndex].setSelected(false)
        self.homeBotIndex = index
      } else {
        self.discoverList[self.discoverIndex].setSelected(false)
        self.discoverIndex = index
      }
      if (self.list.length) {
        // select card
        self.list[self.index].setSelected(true)
        // change map center if bot card is selected
        if (getType(self.list[self.index]) === BotCard) {
          self.setFocusedBotLocation((self.list[self.index] as IBotCard).bot.location)
        }
      }
    },
    setEditIcon: (icon: string) => (self.editIcon = icon),
  }))
  .actions(self => ({
    addBotsToList(listName: 'discover' | 'home', bots: IBot[]): void {
      const list = listName === 'home' ? self.homeBotList : self.discoverList
      bots.forEach(bot => {
        // it is probably less effective than merge but order is always preserved and no need to do 'map to array' conversion every time
        if (!list.find((item: any) => item.bot && item.bot.id === bot.id)) {
          list.push(BotCard.create({bot}))
        }
      })
    },
    toggleListMode: (): void => {
      if (self.listMode === 'discover') {
        self.listMode = 'home'
      } else {
        self.listMode = 'discover'
      }
      self.setIndex(self.index) // need to do it to 'refresh' bot markers, deselect and set new map center
      self.fullScreenMode = false
    },
    toggleFullscreen: () => {
      self.fullScreenMode = !self.fullScreenMode
    },
    postProcessSnapshot(snapshot: any) {
      // No need to persist this store
      return {}
    },
  }))

export default HomeStore
type HomeStoreType = typeof HomeStore.Type
export interface IHomeStore extends HomeStoreType {}
