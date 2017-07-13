import React from 'react';
import PhotoGrid from './PhotoGrid';
import autobind from 'autobind-decorator';
import Screen from './Screen';
import botFactory from '../factory/botFactory';
import Bot from '../model/Bot';
import {Actions} from 'react-native-router-flux';
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
              onAdd={() => Actions.addPhoto({item: bot.id})}
              onView={index => Actions.editPhotos({item: bot.id, index})}
          />
        </ScrollViewWithImages>
      </Screen>
    );
  }
}
