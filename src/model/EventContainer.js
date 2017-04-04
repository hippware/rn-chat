import {createModelSchema, ref, list, child} from 'serializr';
import Event from './Event';
import EventChat from './EventChat';
import EventFriend from './EventFriend';
import EventMessage from './EventMessage';
import EventBot from './EventBot';
import EventBotShare from './EventBotShare';
import EventBotImage from './EventBotImage';
import EventBotNote from './EventBotNote';
import EventBotGeofence from './EventBotGeofence';
import EventWelcome from './EventWelcome';
import {action, computed, observable} from 'mobx';

export default class EventContainer {
    @observable chat: EventChat;
    @observable bot: EventBot;
    @observable friend: EventFriend;
    @observable message: EventMessage;
    @observable botImage: EventBotImage;
    @observable unread: boolean = true;
    @observable botNote: EventBotNote;
    @observable botShare: EventBotShare;
    @observable botGeofence: EventBotGeofence;
    welcome: EventWelcome;

    @computed get event(): Event {
        return this.chat || this.friend || this.message || this.bot || this.botImage || this.botNote || this.botGeofence || this.botShare || this.welcome;
    }

    @computed get date(): Date {
        return this.event.dateAsString;
    }

    @computed get time(): Date {
        return this.event.date;
    }

    isEqual(container: EventContainer) {
        return this.event.isEqual(container.event);
    }

    constructor(data = {}) {
        //console.log("EventContainer constructor", data);
        Object.assign(this, data);
    }
}

createModelSchema(EventContainer, {
    unread: true,
    friend: child(EventFriend),
    chat: child(EventChat),
    message: child(EventMessage),
    bot: child(EventBot),
    botImage: child(EventBotImage),
    botNote: child(EventBotNote),
    botShare: child(EventBotShare),
    botGeofence: child(EventBotGeofence)
});

