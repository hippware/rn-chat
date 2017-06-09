import {createModelSchema, ref, list, child} from 'serializr';
import {observable, computed} from 'mobx';
import Chat from './Chat';
import Event from './Event';
import Profile from './Profile';
import moment from 'moment';
import autobind from 'autobind-decorator';

@autobind
export default class EventChat extends Event {
  // don't show card if it is hidden or profile is not followed or no message from that profile
  @computed get isHidden() {
    return this.target ? this._isHidden || this.target.hidePosts : null;
  }

  get id() {
    return this.chat.id + '_chatevent';
  }

  @observable chat: Chat;

  @computed get target(): Profile {
    return this.chat && this.chat.participants.length ? this.chat.participants[0] : null;
  }

  @computed get isFollowed(): Profile {
    return this.chat.followedParticipants.length > 0;
  }

  @computed get time(): Date {
    return this.chat.lastOther.time || this.chat.time;
  }

  @computed get date(): string {
    return moment(this.time).calendar();
  }

  constructor(chat) {
    super();
    this.chat = chat;
  }

  isEqual(event) {
    if (!(event instanceof EventChat)) {
      return false;
    }
    return this.chat.id === event.chat.id;
  }
}

createModelSchema(EventChat, {
  //  chat: child(Chat),
  chat: ref('id', (id, cb) => cb(null, Chat.serializeInfo.factory({json: {id}}))),
  _isHidden: true,
});
