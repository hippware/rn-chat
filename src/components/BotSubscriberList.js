import React, {Component} from 'react';

import {View, ListView, Text} from 'react-native';
import {observer} from 'mobx-react/native';
import autobind from 'autobind-decorator';
import Screen from './Screen';
import CardList from './CardList';
import ProfileItem from './ProfileItem';
import Separator from './Separator';
import location from '../store/locationStore';
import botStore from '../store/botStore';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

@autobind
@observer
export default class extends Component {
    componentWillMount() {
        botStore.loadSubscribers();
    }

    render() {
        const bot = botStore.bot;
        const subscribers = bot.subscribers.map(x => x).filter(x => x);
        const dataSource = ds.cloneWithRows(subscribers);
        return <Screen>
            <CardList isDay={location.isDay} keyboardShouldPersistTaps="always"
                      enableEmptySections={true}
                      dataSource={dataSource}
                      renderSeparator={(s, r) => <Separator key={r} width={1}/>}
                      renderRow={row => <ProfileItem key={row.user + "row"} isDay={location.isDay} profile={row}/>}
            />
        </Screen>
    }
}