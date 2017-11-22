import {createModelSchema, ref, child} from 'serializr';
import {observable, computed} from 'mobx';
import Bot from './Bot';
import Message from './Message';
import Profile from './Profile';
import autobind from 'autobind-decorator';
import EventBot from './EventBot';

@autobind
export default class EventBotShare extends EventBot {
  @computed
  get target(): Profile {
    return this.message.from;
  }

  @observable message: Message;

  constructor(id, bot, time, message) {
    super(id, bot, time);
    this.message = message;
  }

  presenterClass() {
    return require('../components/event-cards/EventBotShareCard').default;
  }

  asMap() {
    return {botShare: this};
  }
}

createModelSchema(EventBotShare, {
  _id: true,
  time: true,
  bot: ref('fullId', (fullId, cb) => cb(null, Bot.serializeInfo.factory({json: {fullId}}))),
  loaded: true,
  message: ref('id', (id, cb) => cb(null, Message.serializeInfo.factory({json: {id}}))),
  _isHidden: true,
  isPendingDelete: true,
});
