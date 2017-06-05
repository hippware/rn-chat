import {createModelSchema, ref, list, child} from 'serializr';
import {observable, computed} from 'mobx';
import Message from './Message';
import File from './File';
import Event from './Event';
import Profile from './Profile';
import moment from 'moment';
import Bot from './Bot';
import autobind from 'autobind-decorator';
import {settings} from '../globals';

@autobind
export default class EventWelcome extends Event {
  // don't show card if it is hidden or profile is not followed or no message from that profile
  id: string = 'welcome';
  profile = {
    isOwn: true,
    user: 'welcome',
    avatar: {source: settings.isTesting ? null : require('../../images/avatarNoPic.png')},
  };
  time: Date = new Date();

  get target(): Profile {
    return this.profile;
  }

  get date(): Date {
    return this.time;
  }

  get dateAsString(): string {
    return moment(this.date).calendar();
  }

  height() {
    return require('react-native').Dimensions.get('window').height - 192;
  }

  asMap() {
    return {welcome: this};
  }

  presenterClass() {
    return require('../components/EventWelcomeCard').default;
  }
}

createModelSchema(EventWelcome, {
  id: true,
});
