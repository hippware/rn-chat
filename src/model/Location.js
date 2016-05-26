import autobind from 'autobind-decorator';
import {observable, computed, autorunAsync} from 'mobx';

@autobind
export default class Location {
  @observable longitude;
  @observable latitude;
  @observable accuracy;
  
  constructor(data = {}){
    this.load(data);
  }
  
  load({latitude, longitude, accuracy}){
    this.longitude = longitude;
    this.latitude = latitude;
    this.accuracy = accuracy;
  }
  
  toMap(){
    return {
      latitude: this.latitude,
      longitude: this.longitude,
      accuracy: this.accuracy
    }
  }
}
