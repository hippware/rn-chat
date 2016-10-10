import autobind from 'autobind-decorator';
import location from './location';
import {reaction, autorun, map, action, observable, computed, autorunAsync} from 'mobx';
import MapboxClient from 'mapbox/lib/services/geocoding';

@autobind
class GeocodingStore {
  geocoder;
  
  constructor(){
    this.geocoder = new MapboxClient('pk.eyJ1Ijoia2lyZTcxIiwiYSI6IjZlNGUyYmZhZGZmMDI3Mzc4MmJjMzA0MjI0MjJmYTdmIn0.xwgkCT1t-WCtY9g0pEH1qA');
  }
  
  query(text, coords){
    console.log("RUN QUERY", text, JSON.stringify(coords));
    return new Promise((resolve, reject) => {
      this.geocoder.geocodeForward(text, {proximity: coords},
        function(err, res) {
        if (err){
          reject(err)
        } else {
          console.log("RESULT:", res.features);
          const result = [];
          for (let item of res.features) {
            result.push({
              ...item,
              distance: coords ? location.distanceToString(location.distance(coords.latitude, coords.longitude, item.center[1], item.center[0])) : 0
            });
          }
          resolve(result);
        }
      });
    });
  }
  
  
  reverse(coords){
    return new Promise((resolve, reject) => {
      console.log("RUN REVERSE", JSON.stringify(coords));
      this.geocoder.geocodeReverse(coords,
        function(err, res) {
          if (err){
            reject(err)
          } else {
            resolve(res.features);
          }
        });
    });
  }
}

export default new GeocodingStore();