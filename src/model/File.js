import {createModelSchema, ref, list, child} from 'serializr';
import {autorunAsync, when, action, observable} from 'mobx';
import assert from 'assert';
import autobind from 'autobind-decorator';
import file from '../store/file';
import FileSource from './FileSource';

@autobind
export default class File {
  @observable id: string;
  @observable source: FileSource;
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

File.schema = {
  name: 'File',
  primaryKey: 'id',
  properties: {
    source: {type: 'FileSource', optional: true},
    width: {type: 'int', optional: true},
    height: {type: 'int', optional: true},
    id: 'string',
  }
};

createModelSchema(File, {
  id: true,
  source: child(FileSource),
  width: true,
  height: true,
});

File.serializeInfo.factory = (context) => file.create(context.json.id, context.json);

