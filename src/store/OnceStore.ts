import {types, Instance} from 'mobx-state-tree'

/**
 * OnceStore is meant to hold all of the switches that should only ever meant to be flipped to true once
 */
const OnceStore = types
  .model('OnceStore', {
    locationPrimed: false,
    sharePresencePrimed: false,
    guestOnce: false,
    onboarded: false, // user has gone through all the slides in OnboardingSwiper
  })
  .actions(self => ({
    flip: (property: 'locationPrimed' | 'sharePresencePrimed' | 'guestOnce' | 'onboarded') => {
      self[property] = true
    },
  }))

export default OnceStore

export interface IOnceStore extends Instance<typeof OnceStore> {}
