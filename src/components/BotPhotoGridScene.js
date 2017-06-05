import React from 'react';
import PhotoGrid from './PhotoGrid';
import autobind from 'autobind-decorator';
import Screen from './Screen';
import botStore from '../store/botStore';
import Bot from '../model/Bot';
import statem from '../../gen/state';
import {observer} from 'mobx-react/native';
import ScrollViewWithImages from './ScrollViewWithImages';

@autobind
@observer
export default class extends React.Component {
  render() {
    const bot: Bot = botStore.bot;
    return (
      <Screen>
        <ScrollViewWithImages>
          <PhotoGrid isOwn images={bot.thumbnails} onAdd={statem.botPhotos.addPhoto} onView={index => statem.botPhotos.editPhotos({index})} />
        </ScrollViewWithImages>
      </Screen>
    );
  }
}
