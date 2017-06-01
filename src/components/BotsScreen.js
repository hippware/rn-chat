// @flow

import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-native';
import {k} from './Global';
import Screen from './Screen';
import BotButton from './BotButton';
import Bots from './BotListView';
import location from '../store/locationStore';
import {observer} from 'mobx-react/native';
import NotificationComponent from './Notification';
import FilterBar from './FilterBar';

// prettier-ignore
const filters = [
    {key: 'all', title: 'All'},
    {key: 'own', title: 'My Bots'},
];

const VisibilityWrapper = ({filter, children}: {filter: Object, children: any}) => {
    return (
        <View style={{flex: 1}}>
            {children.map(list => {
                const z = list.key === filter ? 0 : -2;
                return (
                    <View style={[styles.absolute, {zIndex: z}]} key={list.key}>
                        {list}
                    </View>
                );
            })}
            <View style={[styles.absolute, {zIndex: -1, backgroundColor: 'white'}]} />
        </View>
    );
};

type Props = {
    filter: string
};

const BotsScreen = (props: Props) => {
    const {filter = 'all'} = props;
    const isDay = location.isDay;
    return (
        <Screen isDay={isDay} style={{paddingTop: 70 * k}}>
            <FilterBar
                style={{paddingLeft: 15 * k, paddingRight: 15 * k}}
                isDay={location.isDay}
                onSelect={data => Actions.refresh({filter: data.key})}
                selected={filter}
            >
                {filters.map(f => <Text key={f.key}>{f.title}</Text>)}
            </FilterBar>
            <VisibilityWrapper filter={filter}>
                {filters.map(f => <Bots key={f.key} filter={f.key} />)}
            </VisibilityWrapper>
            <NotificationComponent style={{position: 'absolute', top: 0}} />
            <BotButton />
        </Screen>
    );
};

export default observer(BotsScreen);

const styles = StyleSheet.create({
    absolute: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
    },
});
