import SunCalc from 'suncalc';
import autobind from 'autobind-decorator';
import {reaction, action, observable, computed, autorunAsync} from 'mobx';
import location from './xmpp/location';
import profileStore from './profile';
import Location from '../model/Location';

@autobind
class LocationStore {
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
      this.watch = navigator.geolocation.watchPosition(position => {
        console.log("LOCATION:", position.coords);
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