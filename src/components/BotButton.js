import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {k} from './Global';
import statem from '../../gen/state';

export default props => (
    <TouchableOpacity
        style={[
            {
                position: 'absolute',
                bottom: 20 * k,
                right: 20 * k,
                width: 54,
                height: 54,
                backgroundColor: 'rgb(254,92,108)',
                borderRadius: 27,
                shadowOffset: {height: 0, width: 2},
                shadowRadius: 4,
                shadowOpacity: 0.18,
            },
            props.style,
        ]}
        onPress={statem.logged.createBot}
    >
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Image style={props.style} source={require('../../images/iconCreateBot.png')} />
        </View>
    </TouchableOpacity>
);
