import Kefir from 'kefir';
import SunCalc from 'suncalc';
import autobind from 'autobind-decorator';
import {reaction, action, observable, computed, autorunAsync} from 'mobx';
import Model from '../model/Model';
import Location from '../model/Location';

const date = Kefir.withInterval(1000*60, emitter => {emitter.emit(new Date())});//.log('date');

@autobind
export default class LocationStore {
  static constitute() { return [Model]};
  model: Model;
  watch = null;
  @observable date = new Date();

  constructor(model: Model){
    this.model = model;

    autorunAsync(()=>{
      if (this.model.connected){
        this.observe();
        if (this.model.profile && this.model.profile.location && this.date) {
          this.setIsDay();
        }
      } else {
        this.stop();
      }
    });

    //observe date
    date.onValue(this.setDate);
  }

  @action setDate = (date) => {
    this.date = date;
  };

  @action setIsDay = () => {
    const location = this.model.profile.location;
    const times = SunCalc.getTimes(this.date, location.latitude, location.longitude);
    this.model.isDay = (this.date < times.night && this.date > times.nightEnd);
    //console.log("IS DAY:", this.date, location.latitude, location.longitude, this.model.isDay);
  };
  
  observe(){
    this.stop();
    if (typeof navigator !== 'undefined'){
      //console.log("WATCH POSITION");
      this.watch = navigator.geolocation.watchPosition(this.updatePosition,()=>{},
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
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
