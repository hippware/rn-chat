// @flow

import {BotStore} from './botStoreV2';
import xmpp from './xmpp/xmpp';

// Inject all stores with xmpp services for use in components in the app
// Our unit tests won't import from here, but import the individual store JS files and inject mocked XMPP services

module.exports = {
  botStore: BotStore.create(
    {},
    {
      service: xmpp,
    },
  ),
};
