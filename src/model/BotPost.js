import assert from 'assert';
import {createModelSchema, ref, list, child} from 'serializr';
import {observable} from 'mobx';
import File from './File';

export default class BotPost {
  id: string;
  @observable content: string = '';
  @observable title: string = '';
  @observable image: File;

  constructor(id, content, image) {
    this.id = id;
    this.content = content;
    this.image = image;
  }
}

createModelSchema(BotPost, {
  id: true,
  content: true,
  title: true,
});
