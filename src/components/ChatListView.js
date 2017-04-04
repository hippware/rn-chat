import React, {Component} from "react";
import {View, InteractionManager, Image, StyleSheet, Text, ListView} from "react-native";
import PostOptionsMenu from './PostOptionsMenu';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
import ChatCard from './ChatCard';
import {observer} from "mobx-react/native";
import statem from '../../gen/state';
import autobind from 'autobind-decorator';
import DataListView from './DataListView';

@observer
@autobind
export default class ChatsListView extends Component {

    render() {
        const dataSource = ds.cloneWithRows(this.props.chats);
        return <DataListView list={this.props.chats}
                             finished={true}
                             footerImage={require('../../images/graphicEndMsgs.png')}
                             renderRow={row => <ChatCard key={row.id} item={row}
                                                         onPress={item => statem.chats.chat({item: item.id})}/> }/>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
