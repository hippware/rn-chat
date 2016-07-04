import {autorunAsync, when, action, observable} from 'mobx';
import assert from 'assert';
import autobind from 'autobind-decorator';
import file from '../store/file';

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
  
  constructor(id: string) {
    this.id = id;

    if (id) {
      file.downloadFile(id).then(this.load).catch(e=>this.load(null, e));
    }
  }

  toJSON(){
    return {id: this.id, source: this.source, loaded: this.loaded};
  }

  @action load = (source, error) => {
    this.source = source;
    if (error){
      this.error = error;
    }
    if (source && source.uri && typeof getImageSize !== 'undefined') {
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