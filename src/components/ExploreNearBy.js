import React from 'react';
import {View} from 'react-native';
import Map from './Map';
import location from '../store/locationStore';
import {observer} from 'mobx-react/native';

type Props = {
    style: any
};

const FullMap = (props: Props) => {
    return (
        <View style={{flex: 1}}>
            <Map ref='map' fullMap followUser location={location.location} isDay={location.isDay} />
        </View>
    );
};

export default observer(FullMap);
