import {types, getParent} from 'mobx-state-tree'
import {IBot} from './Bot'

function getParentAsBot(self) {
  return getParent(self) as IBot
}
export const Address = types
  .model('Address', {
    city: '',
    country: '',
    state: '',
    county: '',
  })
  .views(self => ({
    get locationShort(): string {
      const {city, state, country, county} = self
      if (country) {
        return country === 'US' || country === 'United States'
          ? `${city || county}, ${state}`
          : city || county || state
          ? `${city || county || state}, ${country}`
          : country
      } else {
        if (getParent(self) && getParentAsBot(self).address) {
          const arr = getParentAsBot(self).address.split(', ')
          const parsedCity =
            arr.length > 2 ? `${arr[arr.length - 3].replace(/\d+/g, '').trim()}, ` : ''
          const parsedState = arr.length > 1 ? arr[arr.length - 2].replace(/\d+/g, '').trim() : ''
          const parsedCountry = arr[arr.length - 1]
          if (parsedCountry === 'USA') {
            return parsedCity + parsedState
          } else {
            if (parsedState && parsedState !== '-') {
              return `${parsedState}, ${parsedCountry}`
            }
            return parsedCountry
          }
        }
        return ''
      }
    },
  }))
