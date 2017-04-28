import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    NativeEventEmitter,
    NativeModules,
    Animated,
    StyleSheet,
    InteractionManager,
    TouchableOpacity,
} from 'react-native';
import {k} from './Global';
import {Actions} from 'react-native-router-native';
import statem from '../../gen/state';

export default class MessageButton extends Component {
    render() {
        return (
            <TouchableOpacity
                style={[
                    {
                        position: 'absolute',
                        bottom: 20 * k,
                        right: 20 * k,
                        width: 54,
                        height: 54,
                        backgroundColor: 'rgb(148,94,135)',
                        borderRadius: 27,
                    },
                    this.props.style,
                ]}
                onPress={statem.logged.selectFriends}
            >
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Image
                        style={this.props.style}
                        source={require('../../images/iconNewMsg.png')}
                    />
                </View>
            </TouchableOpacity>
        );
    }
}
