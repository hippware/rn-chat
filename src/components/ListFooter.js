// @flow

import React from 'react';
import {ActivityIndicator, View, Image} from 'react-native';

type Props = {
    footerImage: any,
    finished: boolean
};

export default ({footerImage, finished}: Props) => {
    return (
        <View style={{paddingTop: 10, alignItems: 'center', paddingBottom: 21}}>
            {finished ? <Image source={footerImage} /> : <ActivityIndicator />}
        </View>
    );
};
