import React from 'react';
import {FlatList} from 'react-native';
import ChatCard from './ChatCard';
import {observer} from 'mobx-react/native';
import statem from '../../gen/state';
import ListFooter from './ListFooter';

// @TODO: add paging
export default observer(({chats}: {chats: Array<any>}) => (
    <FlatList
        data={chats}
        initialNumToRender={6}
        ListFooterComponent={() => <ListFooter footerImage={require('../../images/graphicEndMsgs.png')} finished />}
        renderItem={({item}) => <ChatCard item={item} onPress={i => statem.chats.chat({item: i.id})} />}
        keyExtractor={item => `${item.id}`}
    />
));
