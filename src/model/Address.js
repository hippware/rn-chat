import {reaction, autorun, map, action, observable, computed, autorunAsync} from 'mobx';
import geocoding from '../store/geocodingStore';
import assert from 'assert';

export default class Address {
  @observable text: string = '';
  @observable suggestions = [];
  @observable location;
  
  
  constructor(location){
    //console.log("CREATE ADDRESS", JSON.stringify(location));
    this.handler = reaction(()=>({text: this.text, location: this.location}), ({text, location}) => {
      if (!text) {
        this.suggestions.splice(0);
      } else {
        //console.log("GQUERY :", text, JSON.stringify(location));
        return geocoding.query(text, location).then(data => {
          this.suggestions.replace(data);
        });
      }
    }, true);
  
    this.location = location;
    if (location){
      geocoding.reverse(location).then(data => {
        if (data && data.length) {
          this.text = data[0].place_name;
        }
      });
    }
    this.handler2 = reaction(()=>this.location, (location)=>{
      console.log("handler2", location);
      if (location){
        geocoding.reverse(location).then(data => {
          if (data.length) {
            this.text = data[0].place_name;
          }
        });
      }
    });
  
  }
  
  clear(){
    if (this.handler){
      this.handler();
    }
    if (this.handler2){
      this.handler2();
    }
  }
  
}