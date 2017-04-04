import React, {Component} from "react";
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
    TouchableOpacity
} from "react-native";
import {k} from './Global';
import {Actions} from 'react-native-router-native';
import statem from '../../gen/state';
import {LOCATION} from '../model/Bot';

export default class BotButton extends Component {

    render() {
        return <TouchableOpacity style={[{
            position: 'absolute',
            bottom: 20 * k,
            right: 20 * k,
            width: 54,
            height: 54,
            backgroundColor: 'rgb(254,92,108)',
            borderRadius: 27,
            shadowOffset: {height: 0, width: 2},
            shadowRadius: 4,
            shadowOpacity: 0.18
        }, this.props.style] }
                                 onPress={() => statem.logged.createBotContainer({botType: LOCATION})}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image style={this.props.style}
                       source={require('../../images/iconCreateBot.png')}/>
            </View>
        </TouchableOpacity>;

    }
}
