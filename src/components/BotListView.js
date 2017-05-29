// @flow

import React, {Component} from 'react';
import {FlatList} from 'react-native';
import BotCard from './BotCard';
import Bots from '../model/Bots';
import {observer} from 'mobx-react/native';
import statem from '../../gen/state';
import model from '../model/model';
import botStore from '../store/botStore';
import ListFooter from './ListFooter';
import autobind from 'autobind-decorator';

type Props = {
    filter: string,
    user: ?string,
    list: ?Bots,
    header: ?Component,
    loadMore: Function
};

@autobind
@observer
export default class BotListView extends Component {
    props: Props;

    scrollToTop() {
        this.refs.list.scrollToOffset({x: 0, y: 0});
    }

    async loadMore() {
        const {filter, user, list} = this.props;
        if (filter === 'all') {
            await botStore.following(model.followingBots.earliestId);
        } else if (filter === 'own') {
            await botStore.list(model.ownBots);
        } else {
            await botStore.list(list, user);
        }
    }
    render() {
        const {filter, list, header} = this.props;
        const bots: Bots = filter === 'all' ? model.followingBots : filter === 'own' ? model.ownBots : list;
        return (
            <FlatList
                data={bots.list}
                ref='list'
                onEndReachedThreshold={0.5}
                onEndReached={this.loadMore}
                initialNumToRender={6}
                ListHeaderComponent={header}
                ListFooterComponent={() => <ListFooter footerImage={require('../../images/graphicEndBots.png')} finished={bots.finished} />}
                renderItem={({item}) => <BotCard item={item} onPress={i => statem.logged.botDetails({item: i.id})} />}
                keyExtractor={item => `${item.id}`}
            />
        );
    }
}
