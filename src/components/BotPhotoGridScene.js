import React from 'react';
import PhotoGrid from './PhotoGrid';
import autobind from 'autobind-decorator';
import Screen from './Screen';
import botStore from '../store/botStore';
import Bot from '../model/Bot';
import statem from '../../gen/state';
import { observer } from 'mobx-react/native';
import { k } from '../globals';

@autobind
@observer
export default class extends React.Component {
    render() {
        const bot: Bot = botStore.bot;
        return (
            <Screen>
                <PhotoGrid
                    style={{ paddingTop: 70 * k }}
                    isOwn
                    images={bot.thumbnails}
                    onAdd={statem.botPhotos.addPhoto}
                    onView={index => statem.botPhotos.editPhotos({ index })}
                />
            </Screen>
        );
    }
}
