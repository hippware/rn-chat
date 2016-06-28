import Kefir from 'kefir';
import SunCalc from 'suncalc';
import autobind from 'autobind-decorator';
import {reaction, action, observable, computed, autorunAsync} from 'mobx';
import Model from '../model/Model';
import Location from '../model/Location';


@autobind
export default class LocationStore {
  date;
  static constitute() { return [Model]};
  model: Model;
  watch = Kefir.constant({coords: {longitude:1, latitude:1}});

  constructor(model: Model){
    this.model = model;
  }

  @action determineIsDay = (date) => {
    if (this.model.profile && this.model.profile.location){
      const location = this.model.profile.location;
      const times = SunCalc.getTimes(date, location.latitude, location.longitude);
      this.model.isDay = (date < times.night && date > times.nightEnd);
      console.log("IS DAY:", this.date, location.latitude, location.longitude, this.model.isDay);
    }
  };
  
  observe(){
    if (!this.date){
      this.date  = Kefir.withInterval(1000*60, emitter => {emitter.emit(new Date())});
    }
    if (typeof navigator !== 'undefined'){
      //console.log("WATCH POSITION");
      this.watch = Kefir.stream(emitter => navigator.geolocation.watchPosition(position=>emitter.emit(position),()=>{},
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      ));
    }
  }

  @action updatePosition = (position) => {
    //console.log("POSITION:", position);
    if (this.model.profile){
      this.model.profile.location = new Location(position.coords);
    }
  };

  stop(){
    if (this.watch){
      navigator.geolocation.clearWatch(this.watch);
      this.watch = null;
    }
  }
}
