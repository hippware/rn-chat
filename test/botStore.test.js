// @flow

import {EXPLORE_NEARBY, BotStore} from '../src/store/botStoreV2';
import Kefir from 'kefir';

describe('botStore', () => {
  step('geo message stream', async (done) => {
    const stream = Kefir.sequentially(1000, [
      {
        [EXPLORE_NEARBY]: {
          bot: {
            id: '123',
          },
        },
      },
      {
        [EXPLORE_NEARBY]: {
          bot: {
            id: '456',
          },
        },
      },
      {
        [EXPLORE_NEARBY]: {
          bot: {
            id: '789',
          },
        },
      },
    ]);

    stream.onEnd(done);

    const mockXmpp = {
      message: stream,
    };

    BotStore.create(
      {},
      {
        service: mockXmpp,
      },
    );
  });
});
