import SunCalc from 'suncalc';
import autobind from 'autobind-decorator';
import {reaction, action, observable, computed, autorunAsync} from 'mobx';
import location from './xmpp/location';
import profileStore from './profile';
import Location from '../model/Location';

export const METRIC = 'METRIC';
export const IMPERIAL = 'IMPERIAL';

@autobind
class LocationStore {
  @observable system = METRIC;
  @observable date: Date = new Date();
  watch;
  started = false;
  dateInterval;
  @observable location = null;
  @computed get isDay(): boolean {
    if (!this.location){
      return true;
    } else {
      const times = SunCalc.getTimes(this.date, this.location.latitude, this.location.longitude);
      const res =  this.date < times.night && this.date > times.nightEnd;
      console.log("IS DAY:", res, this.date);
      return res;
    }
  }
  
  constructor(){
    location.delegate = this;
  }
  
  share(coords){
    //return location.share(coords);
  }
  
  setMetricSystem(type){
    if (type !== METRIC && type !== IMPERIAL) {
      console.error("Unknown type", type);
    }
    this.system = type;
  }
  
  distance(lat1, lon1, lat2, lon2) {
    console.log("CALCULATE DISTANCE",lat1, lon1, lat2, lon2)
    var R = 6371000; // Radius of the earth in m
    var dLat = (lat2 - lat1) * Math.PI / 180;  // deg2rad below
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a =
      0.5 - Math.cos(dLat) / 2 +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      (1 - Math.cos(dLon)) / 2;
  
    const res = R * 2 * Math.asin(Math.sqrt(a));
    const result = this.system === METRIC ? res : res * 3.2808399;
    console.log("RESULT:", result);
    return result;
  }
  
  distanceToString(distance){
    const limit = this.system === METRIC ? 1000 : 5280;
    if (distance>limit){
      return this.system === METRIC ? `${Math.trunc(distance/10000)} km` : `${Math.trunc(distance*0.000189393939)} mi`
    } else {
      return this.system === METRIC ? `${Math.trunc(distance)} m` : `${Math.trunc(distance/0.3048)} ft`;
    }
  }
  
  
  onLocationChange(user, {lat, lon, accuracy}) {
    const profile = profileStore.create(user);
    profile.location = new Location({latitude: lat, longitude: lon, accuracy});
    console.log("OTHER USER LOCATION:", user, location);
  }
  
  start(){
    if (this.started){
      return;
    }
    this.started = true;
    console.log("LOCATION START");
    this.dateInterval = setInterval(() => this.date = new Date(), 60*1000);
    if (typeof navigator !== 'undefined'){
      console.log("START WATCHER");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("SLOCATION:", position.coords);
          this.location = position.coords
          this.share(this.location);
        },
        (error) => alert(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
      this.watch = navigator.geolocation.watchPosition(position => {
          console.log("GLOCATION:", position.coords);
          this.location = position.coords
          this.share(this.location);
        },()=>{},
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
    } else {
      console.log("NAVIGATOR IS NULL!");
    }
  }
  
  finish(){
    this.started = false;
    console.log("LOCATION FINISH");
    if (this.watch){
      navigator.geolocation.clearWatch(this.watch);
      this.watch = null;
    }
    clearInterval(this.dateInterval);
  }
}

export default new LocationStore();