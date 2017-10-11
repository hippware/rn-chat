// @flow

import botFactory from '../../factory/botFactory';
import profileFactory from '../../factory/profileFactory';
import {mapProps} from 'recompose';
import assert from 'assert';

const injectBot = mapProps(({botId, item}) => {
  const theId = botId || item;
  assert(theId, `injectBot: botId or item is not defined! ${botId}, ${item}`);
  return {bot: botFactory.create({id: theId})};
});

const injectProfile = mapProps(({userId, item}) => {
  const theId = userId || item;
  assert(theId, 'injectProfile: userId or item is not defined!');
  return {profile: profileFactory.create(theId)};
});

export {injectBot, injectProfile};
