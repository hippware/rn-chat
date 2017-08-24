import assert from 'assert';
import {createModelSchema, ref, list, child} from 'serializr';
import {computed, observable} from 'mobx';
import File from './File';
import Profile from './Profile';
import moment from 'moment';

export default class BotPost {
  id: string;
  @observable content: string = '';
  @observable title: string = '';
  @observable image: File;
  @observable profile: Profile;
  @observable time: number = new Date().getTime();

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
}

createModelSchema(BotPost, {
  id: true,
  content: true,
  title: true,
  _time: true,
});
