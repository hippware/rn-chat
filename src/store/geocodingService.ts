import {types, flow} from 'mobx-state-tree'
import {log, error} from '../utils/logger'

const googleApiUrl = 'https://maps.google.com/maps/api/geocode/json'
const apiKey = 'AIzaSyDwMqs1HqgdqtrrPkiBYu93XoYIgvIhKko'
const googlePlacesKey = 'AIzaSyDR-PmhtZJDV90UgaRvlSycDXOGHvcKRVY'
const googlePlacesAutocompleteUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${googlePlacesKey}&input=`
const googlePlacesDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?key=${googlePlacesKey}&placeid=`

const GeocodingStore = types.model('GeocodingStore', {}).actions(self => {
  const details = flow(function*(placeId: string) {
    try {
      const url = `${googlePlacesDetailsUrl}${placeId}`
      const response = yield fetch(url).catch(() => {
        return Promise.reject(new Error('Error fetching data'))
      })
      const json = yield response.json().catch(() => {
        return Promise.reject(new Error('Error parsing server response'))
      })
      if (json.status === 'ZERO_RESULTS') {
        return []
      } else if (json.status === 'OK') {
        return {
          ...convert(json.result),
          isPlace: !(json.result.types.length === 1 && json.result.types[0] === 'street_address'),
          placeName: json.result.name,
        }
      }
    } catch (e) {
      error(`FETCH ERROR:${e}`)
      return Promise.reject(new Error(`Error fetching data${e}`))
    }
  })

  const query = flow(function*(text: string, location: {latitude: number; longitude: number}) {
    try {
      if (!location) return []
      const {latitude, longitude} = location
      const url = `${googlePlacesAutocompleteUrl}${encodeURI(
        text
      )}&location=${latitude},${longitude}`
      // log.log('URL:', url);
      const response = yield fetch(url).catch(() => {
        return Promise.reject(new Error('Error fetching data'))
      })

      const json = yield response.json().catch(() => {
        return Promise.reject(new Error('Error parsing server response'))
      })
      if (json.status === 'ZERO_RESULTS') {
        return []
      } else if (json.status === 'OK') {
        return json.predictions
          ? json.predictions.map(p => ({
              ...p.structured_formatting,
              place_name: p.description,
              place_id: p.place_id,
            }))
          : []
      } else {
        log(`geoquery: Server returned status code ${json.status}`)
        return []
      }
    } catch (e) {
      error(`FETCH ERROR:${e}`)
      return []
    }
  })

  function convert(item) {
    const res: any = {}
    const {lat, lng} = item.geometry.location
    item.address_components.forEach(rec => {
      rec.types.forEach(type => {
        res[`${type}_short`] = rec.short_name
        res[`${type}_long`] = rec.long_name
      })
    })
    return {
      location: {longitude: lng, latitude: lat},
      address: item.formatted_address,
      meta: {
        city: res.locality_long,
        state: res.administrative_area_level_1_short,
        country: res.country_long,
        route: res.route_short,
        street: res.street_number_short,
        neightborhood: res.neighborhood_short,
        county: res.administrative_area_level_2_short,
      },
    }
  }

  const reverse = flow(function*({latitude, longitude}) {
    try {
      const url = `${googleApiUrl}?key=${apiKey}&latlng=${latitude},${longitude}`
      const response = yield fetch(url).catch(() => {
        return Promise.reject(new Error('Error fetching data'))
      })

      const json = yield response.json().catch(() => {
        return Promise.reject(new Error('Error parsing server response'))
      })

      if (json.status === 'OK') {
        return json.results && json.results.length ? convert(json.results[0]) : null
      } else if (json.status === 'ZERO_RESULTS') {
        return {
          address: `GPS: ${latitude}, ${longitude}`,
          meta: {city: '', country: '', state: ''},
        }
      } else {
        log(`Server returned status code ${json.status}`)
        return null
        //        return Promise.reject(new Error(`Server returned status code ${json.status}`));
      }
    } catch (e) {
      console.error(e) //tslint:disable-line
    }
  })

  return {reverse, details, query}
})

export default GeocodingStore.create({})
