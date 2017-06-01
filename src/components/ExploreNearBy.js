import React from 'react';
import {View} from 'react-native';
import Map from './Map';
import location from '../store/locationStore';
import {observer} from 'mobx-react/native';
import BotButton from './BotButton';

type Props = {
    style: any
};

const FullMap = (props: Props) => {
    return (
        <View style={{flex: 1}}>
            <Map ref='map' fullMap followUser location={location.location} isDay={location.isDay}>
                <BotButton />
            </Map>
        </View>
    );
};

export default observer(FullMap);
