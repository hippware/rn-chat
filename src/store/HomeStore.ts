import {types} from 'mobx-state-tree'
import {Bot, IBot} from 'wocky-client'

export const LocationCardData = types.model('LocationCardData', {
  bot: types.reference(Bot),
})
type LocationCardDataType = typeof LocationCardData.Type
export interface ILocationCardData extends LocationCardDataType {}

const YouCardData = types.model('YouCardData', {})

const TutorialCardData = types.model('TutorialCardData', {
  title: types.string,
  text: types.string,
  icon: types.string,
})

const CardType = types.union(LocationCardData, YouCardData, TutorialCardData)
export type ICard = typeof CardType.Type

const HomeStore = types
  .model('HomeStore', {
    listMode: 'home',
    fullScreenMode: false,
    ignoreZoom: false,
    discoverList: types.optional(types.array(CardType), []), // maintain separate list for each mode
    homeList: types.optional(types.map(CardType), {
      you: YouCardData.create({}),
      tutorial1: TutorialCardData.create({
        title: 'Map Your Favorite Spots',
        text: 'Show friends the places you love!',
        icon: 'create',
      }),
    }),
    index: 0, // if we need to maintain separate index, add discoverIndex and homeIndex
  })
  .views(self => ({
    // return the list for current mode
    get list(): any[] {
      // ICard[]
      return self.listMode === 'home' ? Array.from(self.homeList.values()) : self.discoverList
    },
  }))
  .views(self => ({
    get mapData(): IBot[] {
      return self.list.filter((d: any) => d.bot).map((d: ILocationCardData) => d.bot)
    },
  }))
  .actions(self => ({
    // list here is array of LocationCard, should be set by Home.tsx that will call appropriate wocky methods
    setDiscoverList(list): void {
      self.discoverList = list
      self.index = 0
    },
    // setHomeList(cardMap: Map<string, ILocationCardData>) {
    setHomeList(bots: IBot[]): void {
      const cardMap: Map<string, ILocationCardData> = new Map(bots.map(bot => {
        return [bot.id, LocationCardData.create({bot})]
      }) as any)
      // console.log('& cardMap', cardMap)
      self.homeList.merge(cardMap)
      self.index = 0
      // console.log('& home list now', self.homeList.toJSON())
    },
    toggleListMode: (): void => {
      if (self.listMode === 'discover') {
        self.listMode = 'home'
      } else {
        self.listMode = 'discover'
      }
      self.fullScreenMode = false
      self.index = 0 // should we reset index here?
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
