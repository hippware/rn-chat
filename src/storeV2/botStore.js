// @flow

import {types, getEnv, applySnapshot, getRoot, flow} from 'mobx-state-tree';
import {when, reaction} from 'mobx';
import assert from 'assert';

// import Utils from '../store/xmpp/utils';
// import botFactory from '../factory/botFactory';
// import model from '../model/model';
import Persistable from './compose/Persistable';
import Bot, {LOCATION, IMAGE, NOTE} from '../modelV2/Bot';

export const EXPLORE_NEARBY = 'explore-nearby-result';

type BotCreateData = {
  id: string,
  type?: string,
  fullId?: string,
  server?: string,
  // TODO: fill in other fields
};

export const BotStore = Persistable.named('BotStore')
  .props({
    bot: types.maybe(types.reference(Bot)),
    list: types.optional(types.map(Bot), {}),
    subscribedBots: types.optional(types.map(types.reference(Bot)), {}),
    ownBots: types.optional(types.map(types.reference(Bot)), {}),
    geoBots: types.optional(types.map(types.reference(Bot)), {}),
  })
  .actions((self) => {
    const {service, botService, logger} = getEnv(self);
    const {profileStore, fileStore} = getRoot(self);

    function afterCreate(): void {
      service && service.message.filter(msg => msg[EXPLORE_NEARBY]).onValue(val => processGeoResult(val[EXPLORE_NEARBY]));
    }

    function processGeoResult(result) {
      // logger.log('processGeoResult', result);
    }

    // botStore.create
    function createNew(data: Object): boolean {
      // TODO: validate data
      self.bot = Bot.create(data);
      if (!self.bot.owner) {
        when(
          'botStore.create: fill owner',
          () => profileStore.profile,
          () => {
            self.bot.owner = profileStore.profile;
          },
        );
      }
      when(() => service.connected, generateId);
      return true;
    }

    function generateId() {
      botService.generateId().then((id) => {
        self.bot.id = id;
        self.bot.server = service.server;
        self.list.put(self.bot);
      });
    }

    function createLocation(data) {
      createNew({...data, type: LOCATION});
    }

    function createImage(data) {
      createNew({...data, type: IMAGE});
    }

    function createNote(data) {
      createNew({...data, type: NOTE});
    }

    // botFactory.create
    function create({id, type, ...data}: BotCreateData = {}): ?Bot {
      if (data.fullId) {
        // id = data.fullId.split('/')[0];
        [id] = data.fullId.split('/');
      }
      if (!id) {
        return Bot.create({type, ...data});
      }
      if (!self.list.has(id)) {
        if (!Object.keys(data).length) {
          logger.warn('CANNOT CREATE EMPTY BOT', id);
          return null;
        }
        // this.bots[id] = new Bot({id, type, ...data});
        self.list.put(Bot.create({id, type, ...data}));
      } else {
        this.bots[id].load(data);
      }
      return this.bots[id];
    }

    // Bot.load
    function loadBot(data: Object = {}) {
      // Object.assign(this, data);
      const {jid, fullId, server, owner, location, thumbnail, image, images, address_data, ...rest} = data;
      applySnapshot(self, {fullId, jid, server, thumbnail, ...rest});
      // id shouldn't change
      // if (id) {
      //   this.id = id;
      // }
      if (fullId) {
        // this.id = fullId.split('/')[0];
        self.server = fullId.split('/')[1];
      }
      if (jid) {
        self.server = jid.split('/')[0];
        // this.id = jid.split('/')[2];
        self.fullId = `${this.id}/${this.server}`;
      }
      if (owner) {
        self.owner = typeof owner === 'string' ? profileStore.create(owner) : owner;
      }
      if (image) {
        if (typeof image === 'string') {
          self.thumbnail = fileStore.create(`${image}-thumbnail`);
          // temporarily disable lazy load for cover image
          self.image = fileStore.create(image, {}, false);
          // this.image = fileFactory.create(image, {}, true);
        } else {
          self.image = image;
        }
      }
      if (location) {
        // TODO: location
        // self.location = new Location({...location});
      }
      // eslint-disable-next-line
      if (address_data) {
        try {
          self.addressData.load(JSON.parse(address_data));
        } catch (err) {
          logger.log('Address data parse error', err, data);
        }
      } else if (data.address) {
        this.addressData.address = data.address;
      }
    }

    const remove = flow(function* remove(id, server) {
      assert(id, 'id is required');
      assert(server, 'server is required');
      try {
        yield service.remove({id, server});
      } catch (e) {
        if (e.indexOf('not found') === -1) {
          throw e;
        }
      }
      // model.subscribedBots.remove(id);
      // model.ownBots.remove(id);
      // model.geoBots.remove(id);
    });

    async function geosearch({latitude, longitude, latitudeDelta, longitudeDelta}): Promise<void> {
      try {
        // log.log('botStore.geosearch:', latitude, longitude, latitudeDelta, longitudeDelta);
        // service.geosearch({latitude, longitude, server: model.server, latitudeDelta, longitudeDelta});
        this.isGeoSearching = true;
      } catch (err) {
        // TODO: how do we handle errors here?
        this.isGeoSearching = false;
      }
    }

    return {afterCreate, remove, geosearch, create, loadBot};
  });
