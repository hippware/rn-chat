import React from 'react';
import {navBarBackgroundColorNight} from '../globals';
import {k, width} from './Global';
import {
    View,
    Image,
    Animated,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Text,
    Dimensions,
} from 'react-native';
import location from '../store/locationStore';
import {observer} from 'mobx-react/native';

@observer
export default class NavBar extends React.Component {
    render() {
        return (
            <Animated.View
                {...this.props}
                style={[
                    {
                        position: 'absolute',
                        top: 0,
                        height: 70,
                        right: 0,
                        left: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: location.isDay ? 'white' : navBarBackgroundColorNight,
                    },
                    this.props.style,
                ]}
            />
        );
    }
}
