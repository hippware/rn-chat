import autobind from 'autobind-decorator';
import profile from './profileStore';
import location from './locationStore';
import bot from './botStore';
import friend from './friendStore';
import message from './messageStore';
import push from './pushStore';
import model from '../model/model';
import event from './eventStore';
import {autorunAsync} from 'mobx';

@autobind class GlobalStore {
    started = false;
    constructor() {
        autorunAsync(() => {
            try {
                console.log(`GlobalStore autorun: ${this.started}, ${model.connected} ${model.registered} ${model.user}`);
                if (!this.started && model.connected && model.registered && model.user) {
                    this.start();
                }
            } catch (e) {
                console.error(e);
            }
        });
    }
    start() {
        console.log('GlobalStore start');
        this.started = true;
        event.start();
        profile.request(model.user, true);
        bot.start();
        location.start();
        friend.start();
        message.start();
        push.start();
    }

    finish() {
        console.log('GlobalStore finish');
        this.started = false;
        event.finish();
        bot.finish();
        location.finish();
        friend.finish();
        message.finish();
        push.finish();
    }
}

export default new GlobalStore();
