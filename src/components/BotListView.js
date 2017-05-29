// @flow

import React from 'react';
import BotCard from './BotCard';
import Bots from '../model/Bots';
import {observer} from 'mobx-react/native';
import statem from '../../gen/state';
import model from '../model/model';
import botStore from '../store/botStore';
import DataListView from './DataListView';
import {compose, withHandlers} from 'recompose';

type Props = {
    filter: string,
    user: ?string,
    list: ?any,
    loadMore: Function
};

const BotListView = ({filter, list, loadMore}: Props) => {
    const bots: Bots = filter === 'all' ? model.followingBots : filter === 'own' ? model.ownBots : list;
    return (
        <DataListView
            list={bots.list}
            finished={bots.finished}
            loadMore={loadMore}
            footerImage={require('../../images/graphicEndBots.png')}
            renderRow={row => <BotCard key={row.id} item={row} onPress={item => statem.botsScene.botDetails({item: item.id})} />}
        />
    );
};

const enhance = compose(
    observer,
    withHandlers({
        loadMore: ({filter, list}) => async () => {
            if (filter === 'all') {
                await botStore.following(model.followingBots.earliestId);
            } else if (filter === 'own') {
                await botStore.list(model.ownBots.earliestId);
            } else {
                await botStore.botForUser(user, list);
            }
        },
    })
);

export default enhance(BotListView);
