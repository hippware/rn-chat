import autobind from 'autobind-decorator';
import assert from 'assert';
import push from './xmpp/pushService';
import model from '../model/model';
import {settings} from '../globals';
import {when} from 'mobx';
import * as log from '../utils/log';

@autobind class PushService {
  start = () => {
    when(
      () => model.connected,
      () => {
        if (settings.token) {
          push.enable(settings.token);
        }
      }
    );
  };
  disable() {
    push.disable();
  }

  finish() {}
}

export default new PushService();
