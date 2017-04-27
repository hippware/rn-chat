import { createModelSchema, ref, list, child } from 'serializr';
import autobind from 'autobind-decorator';
import Profile from './Profile';
import File from './File';
import { observable, computed, autorunAsync } from 'mobx';
import assert from 'assert';
import moment from 'moment';
import profileFactory from '../factory/profileFactory';
import fileFactory from '../factory/fileFactory';
import messageFactory from '../factory/messageFactory';

@autobind
export default class Message {
    id: string;
    archiveId: string;
    isArchived: boolean = false;
    @observable from: Profile;
    @observable to: string;
    @observable media: File;
    @observable unread: boolean = false;
    @observable _time = new Date().getTime();
    set time(value) {
        //console.log("SETTING DATE", value);
        this._time = new Date(value).getTime();
    }

    @computed get time() {
        return new Date(this._time);
    }

    @observable body: string;
    @observable composing: boolean;
    @observable paused: boolean;
    @observable isHidden: boolean = false;

    @computed get date() {
        return moment(this.time).calendar();
    }

    constructor({ id, ...data }) {
        this.id = id;
        this.load(data);
    }

    load(
        {
            id,
            from,
            to,
            archiveId,
            media,
            unread,
            time,
            body = '',
            composing,
            paused,
            isArchived,
            image
        } = {}
    ) {
        if (archiveId) {
            this.archiveId = archiveId;
        }
        if (from) {
            this.from = typeof from === 'string' ? profileFactory.create(from) : from;
        }
        if (to) {
            this.to = to;
        }
        if (media) {
            this.media = media;
        }
        if (image && image.url) {
            this.media = fileFactory.create(image.url);
        }
        if (unread !== undefined) {
            console.log(`SET UNREAD ${unread} for ${this.id}`);
            this.unread = unread;
        }
        //console.log("MSGTIME:", date);
        if (time) {
            this.time = time;
        }
        if (body) {
            this.body = body;
        }
        if (composing !== undefined) {
            this.composing = composing;
        }
        if (paused !== undefined) {
            this.paused = paused;
        }
        if (isArchived !== undefined) {
            this.isArchived = isArchived;
        }
    }
}
createModelSchema(Message, {
    id: true,
    archiveId: true,
    from: ref('user', (user, cb) => cb(null, Profile.serializeInfo.factory({ json: { user } }))),
    to: true,
    media: child(File),
    unread: true,
    _time: true,
    body: true,
    composing: true,
    paused: true,
    isHidden: true
});

Message.serializeInfo.factory = context => messageFactory.create(context.json);
