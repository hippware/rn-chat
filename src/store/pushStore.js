import autobind from 'autobind-decorator';
import assert from 'assert';
import push from './xmpp/pushService';
import model from '../model/model';
import { settings } from '../globals';
import { when } from 'mobx';

@autobind class PushService {
    start = () => {
        console.log('PushService STARTED');
        when(
            () => model.connected,
            () => {
                if (settings.token) {
                    console.log('ENABLE PUSH', settings.token);
                    push.enable(settings.token);
                }
            }
        );
    };

    finish = () => {};
}

export default new PushService();
