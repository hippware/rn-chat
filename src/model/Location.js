import autobind from 'autobind-decorator';
import {observable, action, computed, autorunAsync} from 'mobx';

@autobind
export default class Location {
  @observable longitude;
  @observable latitude;
  @observable accuracy;
  
  constructor({latitude, longitude, accuracy}){
    this.longitude = longitude;
    this.latitude = latitude;
    this.accuracy = accuracy;
  }
  
  toJSON(){
    return {
      longitude: this.longitude,
      latitude: this.latitude,
      accuracy: this.accuracy
    }
  }
  
}
