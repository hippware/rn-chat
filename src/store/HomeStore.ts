import {types} from 'mobx-state-tree'
import {Bot, IBot} from 'wocky-client'
import {TutorialCardData} from './tutorialData'

export const LocationCardData = types.model('LocationCardData', {
  bot: types.reference(Bot),
})
type LocationCardDataType = typeof LocationCardData.Type
export interface ILocationCardData extends LocationCardDataType {}

const YouCardData = types.model('YouCardData', {
  type: 'you',
})

const CardType = types.union(LocationCardData, YouCardData, TutorialCardData)
export type ICard = typeof CardType.Type

type PinData = {
  bot: IBot
  scrollIndex: number
  isSelected: boolean
}

const HomeStore = types
  .model('HomeStore', {
    listMode: 'home',
    fullScreenMode: false,
    discoverList: types.optional(types.array(CardType), []), // maintain separate list for each mode
    homeBotList: types.optional(types.map(LocationCardData), {}),
    you: types.optional(YouCardData, {}),
    tutorial: types.optional(TutorialCardData, {
      title: 'Map Your Favorite Spots',
      text: 'Show friends the places you love!',
      icon: 'create',
    }),
    index: 0, // if we need to maintain separate index, add discoverIndex and homeIndex
    scrolledToBot: types.maybe(types.reference(Bot)),
  })
  .views(self => ({
    // return the list for current mode
    get list(): any[] {
      // ICard[]
      if (self.listMode === 'home') {
        const botArray = Array.from(self.homeBotList.values())
        return [self.you, self.tutorial, ...botArray]
      } else {
        return Array.from(self.discoverList.values())
      }
    },
  }))
  .views(self => ({
    get mapData(): PinData[] {
      return self.list.filter((d: any) => d.bot).map((d: ILocationCardData, i: number) => ({
        bot: d.bot,
        scrollIndex: i + 2, // HACK: offset by YouCard + TutorialCard
        isSelected: self.index === i + 2,
      }))
    },
  }))
  .views(self => ({
    get selectedBot(): IBot {
      const data = self.mapData[self.index - 2]
      return data && data.bot
    },
  }))
  .actions(self => ({
    setHomeList(bots: IBot[]): void {
      const cardMap: Map<string, ILocationCardData> = new Map(bots.map(bot => {
        return [bot.id, LocationCardData.create({bot})]
      }) as any)
      self.homeBotList.merge(cardMap)
    },
    setDiscoverList(bots: IBot[]): void {
      self.discoverList.clear()
      bots.forEach(bot => self.discoverList.push(LocationCardData.create({bot})))
    },
    toggleListMode: (): void => {
      if (self.listMode === 'discover') {
        self.listMode = 'home'
      } else {
        self.listMode = 'discover'
      }
      self.fullScreenMode = false
      // self.index = 0 // should we reset index here?
    },
    toggleFullscreen: () => {
      self.fullScreenMode = !self.fullScreenMode
    },
    onListShown: () => {
      // console.log('& todo: sync list after reappearing')
    },
    setScrollIndex: (index: number): void => {
      self.index = index
    },
    selectPin: (pin: PinData) => {
      self.index = pin.scrollIndex
    },
    postProcessSnapshot(snapshot: any) {
      // No need to persist this store
      return {}
    },
  }))

export default HomeStore
type HomeStoreType = typeof HomeStore.Type
export interface IHomeStore extends HomeStoreType {}
