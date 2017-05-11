import React from 'react';
import {View, Image} from 'react-native';
import {width, height} from './Global';

export default ({source, children}) => (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: 'transparent'}}>
        <View
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
            }}
        >
            <Image style={{width, height}} source={source} />
        </View>
        {children}
    </View>
);
