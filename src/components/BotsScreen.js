import React from 'react';
import {Text} from 'react-native';
import {Actions} from 'react-native-router-native';
import {k} from './Global';
import Screen from './Screen';
import BotButton from './BotButton';
import Bots from './BotListView';
import location from '../store/locationStore';
import {observer} from 'mobx-react/native';
import NotificationComponent from './Notification';
import FilterBar from './FilterBar';

type Props = {
    filter: string
};

const BotsScreen = ({filter = 'all'}:Props) => {
    const isDay = location.isDay;
    return (
        <Screen isDay={isDay} style={{paddingTop: 70 * k}}>
            <FilterBar
                style={{paddingLeft: 15 * k, paddingRight: 15 * k}}
                isDay={location.isDay}
                onSelect={data => Actions.refresh({filter: data.key})}
                selected={filter}
            >
                <Text key='all'>All</Text>
                <Text key='own'>My Bots</Text>

            </FilterBar>
            <Bots ref='list' filter={filter} />
            <NotificationComponent style={{position: 'absolute', top: 0}} />
            <BotButton />
        </Screen>
    );
};

export default observer(BotsScreen);
