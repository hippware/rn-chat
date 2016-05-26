import {autorunAsync, action, observable} from 'mobx';
import assert from 'assert';

export default class File {
  id: string;
  @observable source;
  loaded: boolean = false;

  constructor(id: string){
    assert(id, "file id is not defined");
    this.id = id;
    assert(id, "File id cannot be null");
  }
  
  @action load(source){
    this.source = source;
    this.loaded = true;
  }
  
}