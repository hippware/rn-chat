import model from '../../model/model';
import autobind from 'autobind-decorator';

@autobind
export default class TestStorage {

  save(data){
    Object.assign(model, data);
    return data
  }

  load(){console.log("MOCK LOAD")};setItem(x,d){console.log("setItem:", x, d)} getItem(){}

}