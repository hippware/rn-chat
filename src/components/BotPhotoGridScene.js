import React from 'react';
import PhotoGrid from './PhotoGrid';
import autobind from 'autobind-decorator';
import Screen from './Screen';
import botFactory from '../factory/botFactory';
import Bot from '../model/Bot';
import statem from '../../gen/state';
import {observer} from 'mobx-react/native';
import ScrollViewWithImages from './ScrollViewWithImages';

@autobind
@observer
export default class extends React.Component {
  render() {
    const bot: Bot = botFactory.create({id: this.props.item});
    return (
      <Screen>
        <ScrollViewWithImages bot={bot}>
          <PhotoGrid
              isOwn
              images={bot.thumbnails}
              onAdd={() => statem.botPhotos.addPhoto({item: bot.id})}
              onView={index => statem.botPhotos.editPhotos({item: bot.id, index})}
          />
        </ScrollViewWithImages>
      </Screen>
    );
  }
}
