import Kefir from 'kefir';
import SunCalc from 'suncalc';
import xmpp from './xmpp/xmpp';
import autobind from 'autobind-decorator';
import {reaction, observable, computed, autorunAsync} from 'mobx';
import Model from '../model/Model';
import Location from '../model/Location';

const date = Kefir.withInterval(1000*60, emitter => {emitter.emit(new Date())}).toProperty(()=>new Date()).log('date');

@autobind
export default class LocationStore {
  model: Model;
  @observable date: Date = new Date();
  watch = null;

  constructor(model: Model){
    this.model = model;
    reaction(()=>this.model.connected, ()=> this.observe());
    reaction(()=>!this.model.connected, ()=> this.stop());
    date.onValue(x=>this.date = x);
  }

  @computed get isDay(){
    console.log("DETERMINE DAY:", this.date, this.position);
    const times = SunCalc.getTimes(this.date, this.position.latitude, this.position.longitude);
    const res = (this.date < times.night && this.date > times.nightEnd);
    console.log(res);
    return res;
  }

  observe(){
    this.stop();
    if (typeof navigator !== 'undefined'){
      this.watch = navigator.geolocation.watchPosition((position) => {
        if (this.model.profile)
          this.model.profile.location = new Location(position.coords);
        },()=>{}, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
    }
  }

  stop(){
    if (this.watch){
      navigator.geolocation.clearWatch(this.watch);
      this.watch = null;
    }
  }
}
