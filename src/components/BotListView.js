// @flow

import React from 'react';
import {FlatList} from 'react-native';
import BotCard from './BotCard';
import Bots from '../model/Bots';
import {observer} from 'mobx-react/native';
import statem from '../../gen/state';
import model from '../model/model';
import botStore from '../store/botStore';
import {compose, withHandlers} from 'recompose';
import ListFooter from './ListFooter';

type Props = {
    filter: string,
    loadMore: Function
};

// @TODO: add paging
const BotListView = ({filter, loadMore}: Props) => {
    const bots: Bots = filter === 'all' ? model.followingBots : model.ownBots;
    return (
        <FlatList
            data={bots.list}
            onEndReachedThreshold={0.5}
            onEndReached={loadMore}
            initialNumToRender={6}
            ListFooterComponent={() => <ListFooter footerImage={require('../../images/graphicEndBots.png')} finished />}
            renderItem={({item}) => <BotCard item={item} onPress={i => statem.botsScene.botDetails({item: i.id})} />}
            keyExtractor={item => `${item.id}`}
        />
    );
};

const enhance = compose(
    observer,
    withHandlers({
        loadMore: ({filter}) => async () => {
            if (filter === 'all') {
                await botStore.following(model.followingBots.earliestId);
            } else {
                await botStore.list(model.ownBots.earliestId);
            }
        },
    })
);

export default enhance(BotListView);
