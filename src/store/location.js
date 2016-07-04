import SunCalc from 'suncalc';
import autobind from 'autobind-decorator';
import {reaction, action, observable, computed, autorunAsync} from 'mobx';


@autobind
class LocationStore {
  @observable date: Date = new Date();
  watch;
  dateInterval;
  @observable location = null;
  @computed get isDay(): boolean {
    if (!this.location){
      return true;
    } else {
      const times = SunCalc.getTimes(this.date, this.location.latitude, this.location.longitude);
      return this.date < times.night && this.date > times.nightEnd;
    }
  }
  
  start(){
    this.dateInterval = setInterval(() => this.date = new Date(), 60*1000);
    if (typeof navigator !== 'undefined'){
      this.watch = navigator.geolocation.watchPosition(position => this.location = position.coords,()=>{},
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
    }
  }
  
  finish(){
    if (this.watch){
      navigator.geolocation.clearWatch(this.watch);
      this.watch = null;
    }
    clearInterval(this.dateInterval);
  }
}

export default new LocationStore();