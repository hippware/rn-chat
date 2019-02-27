/* tslint:disable:max-classes-per-file */
import {types, getType, getParent, applySnapshot, getRoot, Instance} from 'mobx-state-tree'
import {IObservableArray, reaction} from 'mobx'
import {Bot, IBot, Profile, IProfile, Location, ILocation, IWocky} from 'wocky-client'
import {IStore} from './index'

export class Card {
  get location(): ILocation | undefined {
    return undefined
  }
  get name(): string {
    throw new Error('It is abstract class')
  }
}

export class BotCard extends Card {
  bot: IBot

  constructor(bot: IBot) {
    super()
    this.bot = bot
  }

  get location() {
    return this.bot.location || undefined
  }

  get name() {
    return 'BotCard'
  }
}

export class TutorialCard extends Card {
  get name() {
    return 'TutorialCard'
  }
}
export class YouCard extends Card {
  get name() {
    return 'YouCard'
  }
}
export class LocationSharerCard extends Card {
  profile: IProfile
  constructor(profile: IProfile) {
    super()
    this.profile = profile
  }
  get location() {
    return this.profile.location
  }
  get name() {
    return 'LocationSharerCard'
  }
}

const HomeStore = types
  .model('HomeStore', {
    fullScreenMode: false,
    focusedLocation: types.maybeNull(Location),
    mapCenterLocation: types.maybeNull(Location),
  })
  .views(self => {
    const {navStore, wocky} = getRoot<IStore>(self)
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
      get cards() {
        const sharers =
          wocky && wocky.profile
            ? wocky.profile!.locationSharers.list.map(
                sharer => new LocationSharerCard(sharer.sharedWith)
              )
            : []
        return [new TutorialCard(), new YouCard(), ...sharers]
      },
    }
  })
  .views(self => ({
    // return the list for current mode
    get list(): Card[] {
      return self.creationMode ? [] : self.cards
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
  .actions(self => {
    return {
      logout() {
        applySnapshot(self, {})
      },
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

export default HomeStore
type HomeStoreType = typeof HomeStore.Type
export interface IHomeStore extends HomeStoreType {}
