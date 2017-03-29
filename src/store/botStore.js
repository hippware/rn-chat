import autobind from 'autobind-decorator';
import {when, autorun, observable, reaction} from 'mobx';
import Address from '../model/Address';
import botFactory from '../factory/botFactory';
import profileFactory from '../factory/profileFactory';
import fileStore from '../store/fileStore';
import location, {METRIC, IMPERIAL} from './locationStore';
import Location from '../model/Location';
import xmpp from './xmpp/botService';
import model from '../model/model';
import Utils from './xmpp/utils';
import Bot, {LOCATION, NOTE, IMAGE, SHARE_FOLLOWERS, SHARE_FRIENDS, SHARE_SELECT} from '../model/Bot';
import assert from 'assert';
import File from '../model/File';
@autobind
class BotStore {
  @observable bot: Bot;
  @observable address: Address = null;
  
  create(data) {
    this.bot = botFactory.create(data);
    if (!this.bot.owner) {
      when("bot.create: fill owner", () => model.profile, () => {
        this.bot.owner = model.profile
      });
    }
    if (!this.address) {
      when("bot.create: set address", () => this.bot.location, () => {
        this.address = new Address(this.bot.location);
      });
//      this.address.clear();
    }
    console.log("BOT LOCATION:", this.bot.location);
    if (!this.bot.location) {
      when("bot.create: set location", () => location.location, () => {
        this.bot.location = new Location(location.location);
        this.bot.isCurrent = true;
      })
    }

    when(()=>model.connected, ()=>{
        xmpp.generateId().then(id => {
            console.log("GENERATED ID, SERVER:", id, model.server);
            this.bot.id = id;
            this.bot.server = model.server;
        });
    });
//    this.address = new Address(this.bot.location);
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
      console.log("SAVE BOT", this.bot.isNew);
      this.bot.isSubscribed = true;
      const params = {...this.bot, isNew};
      if (this.bot.image) {
          console.log("ADD BOT IMAGE:", this.bot.image.id);
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

      botFactory.add(this.bot);
      model.followingBots.add(this.bot);
      model.ownBots.add(this.bot);
      console.log("ADDED BOT2:", data, model.followingBots.list.length);
  }
  
  async remove(id, server) {
    assert(id, "id is required");
    assert(server, "server is required");
    try {
      await xmpp.remove({id, server});
    } catch (e) {
      if (e.indexOf('not found') === -1) {
        throw e;
      }
    }
    model.followingBots.remove(id);
  }
  
  async following(before) {
    const data = await xmpp.following(model.user, model.server, before);
    console.log("GETTING FOLLOWING BOTS", before, data.count);
    if (!before) {
      model.followingBots.clear();
      model.ownBots.clear();
    }
    for (let item of data.bots) {
      const bot: Bot = botFactory.create(item);
      bot.isSubscribed = true;
      model.followingBots.add(bot);
      model.followingBots.earliestId = bot.id;
      console.log("FOLLOWING BOTS", model.followingBots.list.length, data.count);
      if (model.followingBots.list.length === data.count){
        console.log("FOLLOWING BOTS FINISHED");
        model.followingBots.finished = true;
      }
      
      if (!before && bot.owner.isOwn) {
        model.ownBots.add(bot);
      }
    }
  }
  
  async list(before) {
    console.log("GETTING OWN BOTS", before);
    const data = await xmpp.list(model.user, model.server, before);
    for (let item of data.bots) {
      const bot: Bot = botFactory.create(item);
      bot.isSubscribed = true;
      model.ownBots.add(bot);
      model.ownBots.earliestId = bot.id;
      console.log("OWN BOTS", model.ownBots.list.length, data.count);
      if (model.ownBots.list.length === data.count){
        console.log("OWN BOTS FINISHED");
        model.ownBots.finished = true;
      }
    }
  }
  
  async load() {
    this.bot.clearImages();
    if (!this.bot.isNew){
      if (this.bot.image_items) {
        await this.loadImages();
      }
      if (this.bot.owner && this.bot.owner.isOwn) {
        await this.loadAffiliations();
      }
    }
  }
  async geosearch({latitude, longitude}){
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
    for (const bot of res){
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
      console.log("LOAD IMAGES2:", this.bot.images.length);
    } catch (e) {
      console.log("LOAD IMAGE ERROR:", e);
    }
  }
  
  async loadAffiliations() {
    const affiliations = await xmpp.retrieveAffiliates({id: this.bot.id, server: this.bot.server});
    console.log("LOAD AFFILIATES:", affiliations);
    this.bot.affiliates.splice(0);
    for (const af of affiliations) {
      this.bot.affiliates.push(profileFactory.create(af));
    }
  }
  
  async publishImage({source, fileSize, width, height}) {
    const itemId = Utils.generateID();
    const file = new File();
    file.source = source;
    file.width = width;
    file.height = height;
    file.item = itemId;
    this.bot.insertImage(file);
    const url = await fileStore.requestUpload({
      file: source,
      size: fileSize,
      width,
      height,
      access: this.bot.id ? `redirect:${this.bot.server}/bot/${this.bot.id}` : 'all'
    });
    file.id = url;
    if (this.bot.isNew) {
      when(() => !this.bot.isNew, () => {
        xmpp.publishImage(this.bot, file.item, url).catch(e => file.error = e);
      });
    } else {
      await xmpp.publishImage(this.bot, file.item, url).catch(e => file.error = e);
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
    assert(index >= 0 && index < this.bot.images.length, `${index} is invalid, length: ${this.bot.images.length}`);
    const itemId = this.bot.images[index].item;
    await this.removeItem(itemId);
  }
  
  async subscribe() {
    this.bot.isSubscribed = true;
    this.bot.followersSize += 1;
    model.followingBots.add(this.bot);
    xmpp.subscribe(this.bot);
  }
  
  async unsubscribe() {
    this.bot.isSubscribed = false;
    if (this.bot.followersSize > 1) {
      this.bot.followersSize -= 1;
    }
    xmpp.unsubscribe(this.bot);
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
    console.log("BOTSTORE START", model.user);
    try {
      await this.following();
      await this.list();
    } catch (e) {
      console.error(e);
    }
  };
  
  finish = () => {
    
  };
  
}

export default new BotStore()
