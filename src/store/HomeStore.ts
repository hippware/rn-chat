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
    discoverList: types.optional(types.array(Card), []),
    homeBotList: types.optional(types.array(Card), [{you: true}, {tutorial: true}]), // pre-populate with 'you', tutorial card
    discoverIndex: 0,
    homeBotIndex: 0,
    center: types.maybe(Location),
    scrolledToBot: types.maybe(types.reference(Bot)),
  })
  .views(self => ({
    // return the list for current mode
    get list(): ICard[] {
      return self.listMode === 'home' ? self.homeBotList : self.discoverList
    },
    // return index for the current mode
    get index(): number {
      return self.listMode === 'home' ? self.homeBotIndex : self.discoverIndex
    },
  }))
  .actions(self => ({
    setCenter(center) {
      if (!center) {
        self.center = null
      } else {
        const {latitude, longitude, accuracy} = center
        // change center only if location is changed
        if (
          !self.center ||
          self.center.longitude !== longitude ||
          self.center.latitude !== latitude
        ) {
          self.center = Location.create({latitude, longitude, accuracy})
        }
      }
    },
  }))
  .actions(self => ({
    // sets new index for the current mode, deselects previously selected bot and select new one.
    setIndex: (index: number): void => {
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
          self.setCenter((self.list[self.index] as IBotCard).bot.location)
        }
      }
    },
  }))
  .actions(self => ({
    addBotsToHomeList(bots: IBot[]): void {
      bots.forEach(bot => {
        // it is probably less effective than merge but order is always preserved and no need to do 'map to array' conversion every time
        if (!self.homeBotList.find((item: any) => item.bot && item.bot.id === bot.id)) {
          self.homeBotList.push(BotCard.create({bot}))
        }
      })
    },
    setDiscoverList(bots: IBot[]): void {
      // use mobx replace instead of clear + push all. https://mobx.js.org/refguide/array.html
      self.discoverList.replace(bots.map(bot => BotCard.create({bot})))
      self.discoverIndex = 0
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
