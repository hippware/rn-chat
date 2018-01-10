// @flow

import {EXPLORE_NEARBY, BotStore} from '../../src/storeV2/botStore';
import Kefir from 'kefir';
import {expect, assert} from 'chai';
import Bot from '../../src/modelV2/Bot';

const dummyStore = {
  message: {
    filter: () => ({
      onValue: () => {},
    }),
  },
};

function generateBot() {
  const bot = Bot.create({
    fullId: 'testFullId',
    id: `testId${Math.floor(Math.random() * 1000)}`,
    jid: 'testJid',
    server: 'testServer',
  });
  return bot;
}

describe('botStore', () => {
  it("doesn't fail on creation", async (done) => {
    try {
      BotStore.create({service: dummyStore});
      done();
    } catch (err) {
      console.log(err);
      done(err);
    }
  });

  it('creates a bot with default properties', (done) => {
    const bot = generateBot();
    expect(bot.image).to.be.null;
    expect(bot.loading).to.be.false;
    expect(bot.shortName).to.be.empty;
    done();
  });

  it('geo message stream', async (done) => {
    const stream = Kefir.sequentially(10, [
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
