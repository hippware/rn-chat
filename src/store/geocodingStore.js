import autobind from 'autobind-decorator';
import location from './locationStore';
import {reaction, autorun, map, action, observable, computed, autorunAsync} from 'mobx';
const googleApiUrl = 'https://maps.google.com/maps/api/geocode/json';
const apiKey = 'AIzaSyDwMqs1HqgdqtrrPkiBYu93XoYIgvIhKko';
const googlePlacesKey = 'AIzaSyDR-PmhtZJDV90UgaRvlSycDXOGHvcKRVY';
const googlePlacesAutocompleteUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${googlePlacesKey}&input=`;
const googlePlacesDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?key=${googlePlacesKey}&placeid=`;

@autobind
class GeocodingStore {

    async queryGoogleMaps(text, {latitude, longitude}) {
        try {
            const url = `${googleApiUrl}?key=${apiKey}&address=${encodeURI(text)}&bounds=${latitude},${longitude}|${latitude},${longitude}`;

            console.log("URL:", url);
            const response = await fetch(url).catch(
                error => {
                    return Promise.reject(new Error("Error fetching data"));
                }
            );

            const json = await response.json().catch(
                error => {
                    return Promise.reject(new Error("Error parsing server response"));
                }
            );
            if (json.status === 'ZERO_RESULTS') {
                return [];
            } else if (json.status === 'OK') {
                const result = [];
                for (let item of json.results) {
                    const {lat, lng} = item.geometry.location;
                    const distance = location.distance(latitude, longitude, lat, lng);
                    result.push({
                        center: [lng, lat],
                        place_name: item.formatted_address,
                        distanceMeters: distance,
                        distance: latitude ? location.distanceToString(distance) : 0
                    });
                }
                result.sort((a, b) => a.distanceMeters - b.distanceMeters);
                return result;
            }
            else {
                console.log(`Server returned status code ${json.status}`);
                return [];
            }
        } catch (e) {
            console.error(e)
        }
    }

    async details(placeId) {
        try {
            const url = `${googlePlacesDetailsUrl}${placeId}`;
            const response = await fetch(url).catch(
                error => {
                    return Promise.reject(new Error("Error fetching data"));
                }
            );
            const json = await response.json().catch(
                error => {
                    return Promise.reject(new Error("Error parsing server response"));
                }
            );
            if (json.status === 'ZERO_RESULTS') {
                return [];
            } else if (json.status === 'OK') {
                return {
                    name: json.result.name,
                    formatted_address: json.result.formatted_address,
                    latitude: json.result.geometry.location.lat,
                    longitude: json.result.geometry.location.lng
                };
            }
        } catch (e) {
            console.log("FETCH ERROR:" + e);
            return Promise.reject(new Error("Error fetching data" + e));
        }
    }

    async query(text, {latitude, longitude}) {
        try {
            const url = `${googlePlacesAutocompleteUrl}${encodeURI(text)}&location=${latitude},${longitude}`;

            console.log("URL:", url);
            const response = await fetch(url).catch(
                error => {
                    return Promise.reject(new Error("Error fetching data"));
                }
            );

            const json = await response.json().catch(
                error => {
                    return Promise.reject(new Error("Error parsing server response"));
                }
            );
            if (json.status === 'ZERO_RESULTS') {
                return [];
            } else if (json.status === 'OK') {
                const result = [];
                for (let item of json.predictions) {
                    result.push({
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
            }
            else {
                console.log(`Server returned status code ${json.status}`);
                return [];
            }
        } catch (e) {
            console.log("FETCH ERROR:" + e);
            return [];
        }
    }

    async reverse({latitude, longitude}) {
        try {
            const url = `${googleApiUrl}?key=${apiKey}&latlng=${latitude},${longitude}`;
            const response = await fetch(url).catch(
                error => {
                    return Promise.reject(new Error("Error fetching data"));
                }
            );

            const json = await response.json().catch(
                error => {
                    return Promise.reject(new Error("Error parsing server response"));
                }
            );

            if (json.status === 'OK') {
                const result = [];
                for (let item of json.results) {
                    const {lat, lng} = item.geometry.location;
                    const distance = location.distance(latitude, longitude, lat, lng);
                    result.push({
                        center: [lng, lat],
                        place_name: item.formatted_address,
                        distanceMeters: distance,
                        distance: latitude ? location.distanceToString(distance) : 0
                    });
                }
                result.sort((a, b) => a.distanceMeters - b.distanceMeters);
                return result;
            }
            else {
                console.log(`Server returned status code ${json.status}`);
                return [];
//        return Promise.reject(new Error(`Server returned status code ${json.status}`));
            }
        } catch (e) {
            console.error(e)
        }
    }


}

export default new GeocodingStore();