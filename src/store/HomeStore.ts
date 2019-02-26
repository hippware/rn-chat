import {types, getType, getParent, applySnapshot, getRoot, Instance} from 'mobx-state-tree'
import {IObservableArray, reaction} from 'mobx'
import {Bot, IBot, Profile, IProfile, Location, ILocation, IWocky} from 'wocky-client'
import {IStore} from './index'

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
    // return location for this card, null if there is no location (like for TutorialCard)
    get location(): ILocation | null {
      return null
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
  .views(self => ({
    get location() {
      return self.bot.location
    },
  }))
  .named('BotCard')

type BotCardType = typeof BotCard.Type
export interface IBotCard extends BotCardType {}

const YouCard = SelectableCard.props({
  you: types.boolean,
}).named('YouCard')

const TutorialCard = SelectableCard.props({
  tutorial: types.boolean,
}).named('TutorialCard')

const LocationSharerCard = SelectableCard.props({
  profile: types.reference(Profile),
})
  .views(self => ({
    get location() {
      return self.profile.location
    },
  }))
  .named('LocationSharerCard')

export interface ILocationSharerCard extends Instance<typeof LocationSharerCard.Type> {}

const Card = types.union(BotCard, YouCard, TutorialCard, LocationSharerCard)
export type ICard = typeof Card.Type

const HomeStore = types
  .model('HomeStore', {
    fullScreenMode: false,
    cards: types.optional(types.array(Card), [{tutorial: true}, {you: true}]), // pre-populate with 'you', tutorial card
    index: 0,
    focusedLocation: types.maybeNull(Location),
    mapCenterLocation: types.maybeNull(Location),
  })
  .views(self => {
    const {navStore} = getRoot<IStore>(self)
    return {
      get creationMode() {
        return (
          navStore && ['createBot', 'botCompose', 'botEdit', 'editNote'].includes(navStore.scene)
        )
      },
      get detailsMode() {
        return navStore && navStore.scene === 'botDetails'
      },
      get isIconEditable() {
        return ['botCompose', 'botEdit'].includes(navStore.scene)
      },
    }
  })
  .views(self => ({
    // return the list for current mode
    get list(): ICard[] {
      return self.creationMode ? [] : self.cards
    },
  }))
  .views(self => ({
    get isBotSelected(): boolean {
      return getType(self.list[self.index]) === BotCard
    },
  }))
  .actions(self => ({
    setFocusedLocation(location) {
      if (!location) {
        self.focusedLocation = null
      } else {
        const {latitude, longitude, accuracy} = location
        // change center only if location is changed
        if (
          !self.focusedLocation ||
          self.focusedLocation.longitude !== longitude ||
          self.focusedLocation.latitude !== latitude
        ) {
          self.focusedLocation = Location.create({latitude, longitude, accuracy})
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
      if (self.index < self.cards.length) {
        self.cards[self.index].setSelected(false)
      }
      if (index < self.cards.length) {
        self.index = index
        if (self.list.length) {
          // select card
          self.list[self.index].setSelected(true)
          // change map center if card has location
          if (self.list[self.index].location) {
            self.setFocusedLocation(self.list[self.index].location)
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
        const list = self.cards
        bots.forEach(bot => {
          if (!list.find((item: any) => item.bot && item.bot.id === bot.id)) {
            list.push(BotCard.create({bot: bot.id}))
          }
        })
      },
      addProfilesToList(profiles: IProfile[]): void {
        const list = self.cards
        profiles.forEach(profile => {
          if (!list.find((item: any) => item.profile && item.profile.id === profile.id)) {
            // insert into 3-rd position after TutorialCard and YouCard
            list.splice(2, 0, LocationSharerCard.create({profile: profile.id}))
          }
        })
      },
      removeBot(bot: IBot): void {
        const index = self.cards.findIndex((item: any) => item.bot && item.bot.id === bot.id)
        if (index !== -1) {
          self.cards.splice(index, 1)
        }
        if (index <= self.index) {
          self.setIndex(self.index - 1) // TODO set index within visible area
        }
      },
      removeProfile(profile: IProfile): void {
        const index = self.cards.findIndex(
          (item: any) => item.profile && item.profile.id === profile.id
        )
        if (index !== -1) {
          self.cards.splice(index, 1)
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
    afterAttach: () => {
      const mainStore: any = getParent(self)
      const wocky: IWocky = mainStore.wocky
      reaction(
        () => wocky && wocky.profile && wocky.profile.locationSharers.list,
        () => {
          // const selected = self.cards[self.index] TODO: preserve index
          // TODO remove expired sharers
          if (wocky.profile) {
            const profiles = wocky.profile!.locationSharers.list.map(sharer => sharer.sharedWith)
            self.addProfilesToList(profiles)
          }
        }
      )
    },
    selectBot(bot: IBot) {
      const index = self.list.findIndex((b: any) => b.bot && b.bot.id === bot.id)
      if (index >= 0) {
        self.setIndex(index)
      } else {
        self.addBotsToList([bot])
        self.setIndex(self.list.length - 1)
      }
    },
    selectProfile(profile: IProfile) {
      const index = self.list.findIndex((b: any) => b.profile && b.profile.id === profile.id)
      if (index >= 0) {
        self.setIndex(index)
      } else {
        self.addProfilesToList([profile])
        self.setIndex(self.list.length - 1)
      }
    },
  }))

export default HomeStore
type HomeStoreType = typeof HomeStore.Type
export interface IHomeStore extends HomeStoreType {}
