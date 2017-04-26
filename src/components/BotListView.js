import React, { Component } from 'react';
import {
    View,
    InteractionManager,
    StyleSheet,
    Image,
    Text,
    ListView
} from 'react-native';
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
import BotCard from './BotCard';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx';
import statem from '../../gen/state';
import model from '../model/model';
import autobind from 'autobind-decorator';
import { k, width, height } from './Global';
import botStore from '../store/botStore';
import DataListView from './DataListView';

@autobind
@observer
export default class BotListView extends Component {
    async loadMore() {
        if (this.props.filter == 'all') {
            await botStore.following(model.followingBots.earliestId);
        } else {
            await botStore.list(model.ownBots.earliestId);
        }
    }

    render() {
        this.bots = this.props.filter === 'all'
            ? model.followingBots
            : model.ownBots;
        const bots = this.bots;
        console.log('Bots render', this.props.filter, bots.finished);
        return (
            <DataListView
                list={bots.list}
                finished={bots.finished}
                loadMore={this.loadMore}
                footerImage={require('../../images/graphicEndBots.png')}
                renderRow={row => (
                    <BotCard
                        key={row.id}
                        item={row}
                        onPress={item =>
                            statem.botsScene.botDetails({ item: item.id })}
                    />
                )}
            />
        );
    }
}
