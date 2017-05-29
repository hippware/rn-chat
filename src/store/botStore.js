import autobind from 'autobind-decorator';
import {when, autorun, observable, reaction} from 'mobx';
import Address from '../model/Address';
import botFactory from '../factory/botFactory';
import profileFactory from '../factory/profileFactory';
import profileStore from '../store/profileStore';
import fileStore from '../store/fileStore';
import location, {METRIC, IMPERIAL} from './locationStore';
import Location from '../model/Location';
import xmpp from './xmpp/botService';
import model from '../model/model';
import Utils from './xmpp/utils';
import Bot, {LOCATION, NOTE, IMAGE, SHARE_FOLLOWERS, SHARE_FRIENDS, SHARE_SELECT} from '../model/Bot';
import assert from 'assert';
import File from '../model/File';
import FileSource from '../model/FileSource';

@autobind class BotStore {
    @observable bot: Bot;
    @observable address: Address = null;

    create(data) {
        this.bot = botFactory.create(data);
        if (!this.bot.owner) {
            when(
                'bot.create: fill owner',
                () => model.profile,
                () => {
                    this.bot.owner = model.profile;
                }
            );
        }
        if (!this.address) {
            when(
                'bot.create: set address',
                () => this.bot.location,
                () => {
                    this.address = new Address(this.bot.location);
                }
            );
        }
        if (!this.bot.location) {
            when(
                'bot.create: set location',
                () => location.location,
                () => {
                    this.bot.location = new Location(location.location);
                    this.bot.isCurrent = true;
                }
            );
        }
        when(() => model.connected, this.generateId);
    }

    generateId() {
        xmpp.generateId().then(id => {
            this.bot.id = id;
            this.bot.server = model.server;
        });
    }

    createLocation(data) {
        this.create({...data, type: LOCATION});
    }

    createImage(data) {
        this.create({...data, type: IMAGE});
    }

    createNote(data) {
        this.create({...data, type: NOTE});
    }

    async save() {
        const isNew = this.bot.isNew;
        this.bot.isSubscribed = true;
        const params = {...this.bot, isNew};
        if (this.bot.image) {
            params.image = this.bot.image.id;
        }
        const data = await xmpp.create(params);

        // publish note if description is changed
        if (!isNew && this.bot.descriptionChanged) {
            xmpp.publishContent(this.bot, Utils.generateID(), this.bot.description);
        }

        botFactory.remove(this.bot);
        this.bot.id = data.id;
        this.bot.server = data.server;
        this.bot.isNew = false;
        this.bot.owner = model.profile;

        botFactory.add(this.bot);
        model.followingBots.add(this.bot);
        model.ownBots.add(this.bot);
    }

    async remove(id, server) {
        assert(id, 'id is required');
        assert(server, 'server is required');
        try {
            await xmpp.remove({id, server});
        } catch (e) {
            if (e.indexOf('not found') === -1) {
                throw e;
            }
        }
        model.followingBots.remove(id);
        model.ownBots.remove(id);
    }

    async following(before) {
        const data = await xmpp.following(model.user, model.server, before);
        if (!before) {
            model.followingBots.clear();
            model.ownBots.clear();
        }
        for (let item of data.bots) {
            const bot: Bot = botFactory.create(item);
            bot.isSubscribed = true;
            model.followingBots.add(bot);
            model.followingBots.earliestId = bot.id;
            if (model.followingBots.list.length === data.count) {
                model.followingBots.finished = true;
            }

            if (!before && bot.owner.isOwn) {
                model.ownBots.add(bot);
            }
        }
    }

    async list(before) {
        const data = await xmpp.list(model.user, model.server, before);
        for (let item of data.bots) {
            const bot: Bot = botFactory.create(item);
            bot.isSubscribed = true;
            model.ownBots.add(bot);
            model.ownBots.earliestId = bot.id;
            if (model.ownBots.list.length === data.count) {
                model.ownBots.finished = true;
            }
        }
    }

    async botForUser(user, before) {
        const data = await xmpp.list(user, model.server, before);
        return data;
    }

    async load() {
        if (this.bot) {
            this.bot.clearImages();
            if (this.bot.image) {
                this.bot.image.download();
            }
            if (!this.bot.isNew) {
                if (this.bot.image_items) {
                    await this.loadImages();
                }
            }
        }
    }

    async geosearch({latitude, longitude}) {
        const list = await xmpp.geosearch({latitude, longitude, server: model.server});
        const res = [];
        for (const botData of list) {
            // if we have necessary data, no need to do additional fetch for each bot
            if (botData.owner && botData.location) {
                res.push(botFactory.create({loaded: true, ...botData}));
            } else {
                res.push(botFactory.create(botData));
            }
        }
        for (const bot of res) {
            model.geoBots.add(bot);
        }
        return res;
    }

    async loadImages(before) {
        try {
            const images = await xmpp.imageItems({id: this.bot.id, server: this.bot.server}, before);
            for (const image of images) {
                this.bot.addImage(image.url, image.item);
            }
        } catch (e) {
            console.log('LOAD IMAGE ERROR:', e);
        }
    }

    async setCoverPhoto({source, fileSize, width, height}) {
        const file = new File();
        file.source = new FileSource(source);
        file.width = width;
        file.height = height;
        this.bot.image = file;
        this.bot.thumbnail = file;
        file.id = await fileStore.requestUpload({
            file: source,
            size: fileSize,
            width,
            height,
            access: this.bot.id ? `redirect:${this.bot.server}/bot/${this.bot.id}` : 'all',
        });
        if (!this.bot.isNew) {
            await this.save();
        }
    }

    async publishImage({source, fileSize, width, height}) {
        assert(source, 'source must be not null');
        const itemId = Utils.generateID();
        const file = new File();
        file.source = new FileSource(source);
        file.width = width;
        file.height = height;
        file.item = itemId;
        this.bot.insertImage(file);
        this.bot.imageSaving = true;
        try {
            const url = await fileStore.requestUpload({
                file: source,
                size: fileSize,
                width,
                height,
                access: this.bot.id ? `redirect:${this.bot.server}/bot/${this.bot.id}` : 'all',
            });
            file.id = url;
            if (this.bot.isNew) {
                when(
                    () => !this.bot.isNew,
                    () => {
                        xmpp.publishImage(this.bot, file.item, url).catch(e => (file.error = e));
                    }
                );
            } else {
                await xmpp.publishImage(this.bot, file.item, url).catch(e => (file.error = e));
            }
        } catch (e) {
            throw `PUBLISH IMAGE error: ${e} ; ${file.error}`;
        } finally {
            this.bot.imageSaving = false;
        }
    }

    async publishNote(itemId, note) {
        await xmpp.publishContent(this.bot, itemId, note);
        this.bot.addNote(note);
    }

    async removeItem(itemId) {
        if (!this.bot.isNew) {
            await xmpp.removeItem(this.bot, itemId);
        }
        this.bot.removeImage(itemId);
    }

    async removeImageWithIndex(index) {
        assert(index >= 0 && index < this.bot._images.length, `${index} is invalid, length: ${this.bot._images.length}`);
        const itemId = this.bot._images[index].item;
        await this.removeItem(itemId);
    }

    async subscribe() {
        this.bot.isSubscribed = true;
        this.bot.followersSize += 1;
        model.followingBots.add(this.bot);
        await xmpp.subscribe(this.bot);
    }

    async loadSubscribers() {
        const jids = await xmpp.subscribers(this.bot);
        await profileStore.requestBatch(jids);
        this.bot.subscribers = jids.map(rec => profileFactory.create(rec));
    }

    async unsubscribe() {
        this.bot.isSubscribed = false;
        if (this.bot.followersSize > 1) {
            this.bot.followersSize -= 1;
        }
        await xmpp.unsubscribe(this.bot);
    }

    share(message, type) {
        if (this.bot.shareMode === SHARE_FRIENDS) {
            xmpp.share(this.bot, ['friends'], message, type);
        } else if (this.bot.shareMode === SHARE_FOLLOWERS) {
            xmpp.share(this.bot, ['followers'], message, type);
        } else {
            xmpp.share(this.bot, this.bot.shareSelect.map(profile => profile.user), message, type);
        }
    }

    async start() {
        try {
            await this.following();
            await this.list();
        } catch (e) {
            console.error(e);
        }
    }

    finish = () => {};
}

export default new BotStore();
