import {autorunAsync, when, action, observable} from 'mobx';
import assert from 'assert';
import autobind from 'autobind-decorator';

@autobind
export default class File {
  @observable id: string;
  file;
  model;
  @observable source;
  @observable width;
  @observable height;
  @observable error: string;
  @observable loaded: boolean = false;
  
  constructor(model, file, id: string) {
    this.model = model;
    this.file = file;
    this.id = id;

    if (id) {
      when(()=>model.connected, ()=>this.file.downloadFile(id).then(this.load).catch(e=>this.error = e));
    }
  }

  toJSON(){
    return {id: this.id, source: this.source, loaded: this.loaded};
  }

  @action load(source){
    this.source = source;
    if (typeof getImageSize !== 'undefined') {
      getImageSize(source.uri, (width, height)=>{
        this.width = width;
        this.height = height;
        this.loaded = true;
      })
    } else {
      this.loaded = true;
    }
  }

}