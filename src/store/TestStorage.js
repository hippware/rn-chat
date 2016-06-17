import Model from '../model/Model';
import autobind from 'autobind-decorator';

@autobind
export default class TestStorage {
  model: Model;
  static constitute() { return [Model]};

  constructor(model){
    this.model = model;
  }

  save(data){
    Object.assign(this.model, data);
    return data
  }

  load(){console.log("MOCK LOAD")};setItem(x,d){console.log("setItem:", x, d)} getItem(){}

}