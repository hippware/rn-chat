// @flow

import {BotStore} from './botStore';
import xmpp from '../store/xmpp/xmpp';

// Inject all stores with xmpp services for use in components in the app.
// Store unit tests shouldn't import from here.
// Instead they should import the individual store JS files and inject mocked XMPP services.

module.exports = {
  botStore: BotStore.create(
    {},
    {
      service: xmpp,
    },
  ),
};
