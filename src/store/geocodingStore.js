import autobind from 'autobind-decorator';
import location from './locationStore';
import {reaction, autorun, map, action, observable, computed, autorunAsync} from 'mobx';

const googleApiUrl = 'https://maps.google.com/maps/api/geocode/json';
const apiKey = 'AIzaSyDwMqs1HqgdqtrrPkiBYu93XoYIgvIhKko';
const googlePlacesKey = 'AIzaSyDR-PmhtZJDV90UgaRvlSycDXOGHvcKRVY';
const googlePlacesAutocompleteUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${googlePlacesKey}&input=`;
const googlePlacesDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?key=${googlePlacesKey}&placeid=`;
import * as log from '../utils/log';

@autobind
class GeocodingStore {
  formatText(text = '', matched = [], wrap) {
    const bold = [];
    const res = [];
    matched.forEach(({offset, length}) => {
      for (let i = offset; i < offset + length; i += 1) {
        bold[i] = true;
      }
    });
    let cur = '';
    for (let i = 0; i < text.length; i += 1) {
      if (i > 0 && (bold[i] !== bold[i - 1])) {
        res.push(bold[i] ? cur : wrap(cur));
        cur = '';
      }
      cur += text[i];
    }
    if (cur) {
      res.push(bold[text.length - 1] ? wrap(cur) : cur);
    }
    return res;
  }

  async queryGoogleMaps(text, {latitude, longitude}) {
    try {
      const url = `${googleApiUrl}?key=${apiKey}&address=${encodeURI(text)}&bounds=${latitude},${longitude}|${latitude},${longitude}`;

      log.log('URL:', url);
      const response = await fetch(url).catch((error) => {
        return Promise.reject(new Error('Error fetching data'));
      });

      const json = await response.json().catch((error) => {
        return Promise.reject(new Error('Error parsing server response'));
      });
      if (json.status === 'ZERO_RESULTS') {
        return [];
      } else if (json.status === 'OK') {
        const result = [];
        for (const item of json.results) {
          const {lat, lng} = item.geometry.location;
          const distance = location.distance(latitude, longitude, lat, lng);
          result.push({
            center: [lng, lat],
            place_name: item.formatted_address,
            distanceMeters: distance,
            distance: latitude ? location.distanceToString(distance) : 0,
          });
        }
        result.sort((a, b) => a.distanceMeters - b.distanceMeters);
        return result;
      } else {
        log.log(`Server returned status code ${json.status}`);
        return [];
      }
    } catch (e) {
      console.error(e);
    }
  }

  async details(placeId) {
    try {
      const url = `${googlePlacesDetailsUrl}${placeId}`;
      const response = await fetch(url).catch((error) => {
        return Promise.reject(new Error('Error fetching data'));
      });
      const json = await response.json().catch((error) => {
        return Promise.reject(new Error('Error parsing server response'));
      });
      if (json.status === 'ZERO_RESULTS') {
        return [];
      } else if (json.status === 'OK') {
        return {
          name: json.result.name,
          isPlace: !(json.result.types.length === 1 && json.result.types[0] === 'street_address'),
          formatted_address: json.result.formatted_address,
          latitude: json.result.geometry.location.lat,
          longitude: json.result.geometry.location.lng,
        };
      }
    } catch (e) {
      log.log(`FETCH ERROR:${e}`);
      return Promise.reject(new Error(`Error fetching data${e}`));
    }
  }

  async query(text, {latitude, longitude}) {
    try {
      const url = `${googlePlacesAutocompleteUrl}${encodeURI(text)}&location=${latitude},${longitude}`;

      log.log('URL:', url);
      const response = await fetch(url).catch((error) => {
        return Promise.reject(new Error('Error fetching data'));
      });

      const json = await response.json().catch((error) => {
        return Promise.reject(new Error('Error parsing server response'));
      });
      if (json.status === 'ZERO_RESULTS') {
        return [];
      } else if (json.status === 'OK') {
        const result = [];
        for (const item of json.predictions) {
          result.push({
            ...item.structured_formatting,
            place_name: item.description,
            place_id: item.place_id,
          });
          // const {lat, lng} = item.geometry.location;
          // const distance = location.distance(latitude, longitude, lat, lng);
          // result.push({
          //   center: [lng, lat],
          //   place_name: item.formatted_address,
          //   distanceMeters: distance,
          //   distance: latitude ? location.distanceToString(distance) : 0
          // });
        }
        //            result.sort((a, b) => a.distanceMeters - b.distanceMeters);
        return result;
      } else {
        log.log(`Server returned status code ${json.status}`);
        return [];
      }
    } catch (e) {
      log.log(`FETCH ERROR:${e}`);
      return [];
    }
  }

  async reverse({latitude, longitude}) {
    try {
      const url = `${googleApiUrl}?key=${apiKey}&latlng=${latitude},${longitude}`;
      const response = await fetch(url).catch((error) => {
        return Promise.reject(new Error('Error fetching data'));
      });

      const json = await response.json().catch((error) => {
        return Promise.reject(new Error('Error parsing server response'));
      });

      if (json.status === 'OK') {
        const result = [];
        for (const item of json.results) {
          const {lat, lng} = item.geometry.location;
          const distance = location.distance(latitude, longitude, lat, lng);
          const res = {};
          item.address_components.forEach((rec) => {
            rec.types.forEach((type) => {
              res[`${type}_short`] = rec.short_name;
              res[`${type}_long`] = rec.long_name;
            });
          });
          result.push({
            center: [lng, lat],
            place_name: item.formatted_address,
            meta: {
              city: res.locality_long,
              state: res.administrative_area_level_1_short,
              country: res.country_long,
              route: res.route_short,
              street: res.street_number_short,
              neightborhood: res.neighborhood_short,
              county: res.administrative_area_level_2_short,
            },
            distanceMeters: distance,
            distance: latitude ? location.distanceToString(distance) : 0,
          });
        }
        result.sort((a, b) => a.distanceMeters - b.distanceMeters);
        return result;
      } else {
        log.log(`Server returned status code ${json.status}`);
        return [];
        //        return Promise.reject(new Error(`Server returned status code ${json.status}`));
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export default new GeocodingStore();
