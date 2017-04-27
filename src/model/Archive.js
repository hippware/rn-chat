const MAM = 'urn:xmpp:mam:1';

import { ArchiveState } from '../../gen/state';
import { action } from 'mobx';
import autobind from 'autobind-decorator';

@autobind
export default class Archive {
    user: string;
    queryid: string;
    first: string;
    last: string;
    completed: boolean = false;
    archive = {};
    count: number = 0;

    addMessage(message) {
        this.count++;
        const chatId = message.from.isOwn ? message.to : message.from.user;
        if (!this.archive[chatId]) {
            this.archive[chatId] = [];
        }
        this.archive[chatId].push(message);
        console.log(
            `Add message ${message.body} to chatId:${chatId}, length: ${this.archive[chatId].length}`
        );
    }
}
