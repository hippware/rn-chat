// @flow

import React from 'react';
import {View, Animated} from 'react-native';
import location from '../store/locationStore';
import {observer} from 'mobx-react/native';
import {colors} from '../constants';

type Props = {
    style: Object
};

export default observer((props: Props) => (
    <Animated.View
        {...props}
        style={[
            {
                position: 'absolute',
                top: 0,
                height: 70,
                right: 0,
                left: 0,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: location.isDay ? colors.LIGHT_GREY : colors.navBarBackgroundColorNight,
            },
            props.style,
        ]}
    />
));
