// @flow

import assert from 'assert';
import {createModelSchema} from 'serializr';
import {computed, observable} from 'mobx';
import File from './File';
import Profile from './Profile';
import moment from 'moment';
import Utils from '../store/xmpp/utils';
import FileSource from './FileSource';
import fileStore from '../store/fileStore';
import Bot from './Bot';

export default class BotPost {
  id: string;
  @observable content: string = '';
  @observable title: string = '';
  @observable image: File;
  @observable profile: Profile;
  @observable time: number = new Date().getTime();
  @observable imageSaving: boolean = false;

  @computed
  get date(): Date {
    return new Date(this.time);
  }

  @computed
  get dateAsString(): string {
    return moment(this.date).calendar();
  }

  @computed
  get relativeDateAsString(): string {
    return moment(this.date).fromNow(true);
  }

  constructor(id, content: string, image: File, time: number, profile: Profile) {
    this.id = id;
    this.content = content;
    this.image = image;
    this.time = time;
    this.profile = profile;
  }

  addImage = async (imageObj: Object, bot: Bot): Promise<void> => {
    const {source, size, width, height} = imageObj;
    const imageId = Utils.generateID();
    const file = new File();
    file.source = new FileSource(source);
    file.width = width;
    file.height = height;
    file.item = imageId;
    file.loaded = true;
    this.image = file;
    this.imageSaving = true;
    let imageUrl;
    try {
      imageUrl = await fileStore.requestUpload({
        file: source,
        size,
        width,
        height,
        access: bot.id ? `redirect:${bot.server}/bot/${bot.id}` : 'all',
      });
      file.id = imageUrl;
    } catch (e) {
      throw new Error(`PUBLISH IMAGE error: ${e} ; ${file.error}`);
    } finally {
      this.imageSaving = false;
    }
    return imageUrl;
  };
}

createModelSchema(BotPost, {
  id: true,
  content: true,
  title: true,
  _time: true,
});
