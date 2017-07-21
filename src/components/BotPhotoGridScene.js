import React from 'react';
import {Actions} from 'react-native-router-flux';
import {observer} from 'mobx-react/native';
import PhotoGrid from './PhotoGrid';
import Screen from './Screen';
import botFactory from '../factory/botFactory';
import Bot from '../model/Bot';
import ScrollViewWithImages from './ScrollViewWithImages';
import {k} from '../globals';

const BotPhotoGridScene = ({item}) => {
  const bot: Bot = botFactory.create({id: item});
  return (
    <Screen>
      <ScrollViewWithImages bot={bot}>
        <PhotoGrid isOwn images={bot.thumbnails} onAdd={() => Actions.botPhoto({item: bot.id})} onView={index => Actions.botPhotoSwiper({item: bot.id, index})} />
      </ScrollViewWithImages>
    </Screen>
  );
};

export default observer(BotPhotoGridScene);
