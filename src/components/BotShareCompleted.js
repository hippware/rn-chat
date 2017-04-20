import React from 'react';
import {View, Text} from 'react-native';
import {k, width, height} from './Global';
import {Actions} from 'react-native-router-native';
import Avatar from "./Avatar";
import profileFactory from '../factory/profileFactory';

export default class extends React.Component {
    componentDidMount() {
        setTimeout(Actions.pop, 3000);
    }

    render() {
        const profile = profileFactory.create(this.props.user);
        return <View style={{
            width,
            height,
            backgroundColor: 'transparent',
            paddingTop: 175 * k,
            paddingRight: 82 * k,
            paddingLeft: 82 * k,
        }}>
            <View style={{
                backgroundColor: 'rgba(255,255,255,0.9)',
                height: 80 * k,
                borderRadius: 74 * k,
                flexDirection: 'row'
            }}>
                {this.props.number > 1 &&
                <View style={{position: 'absolute', top: 20 * k, left: 50 * k}}><Avatar size={40 * k}
                                                                                        text={"+" + (this.props.number - 1)}/></View>}
                <View style={{position: 'absolute', top: 20 * k, left: 20 * k}}><Avatar size={40 * k}
                                                                                        profile={profile}/></View>
                <View style={{position: 'absolute', top: 20 * k, left: 110 * k, width: 95 * k}}>
                    <Text style={{color: 'rgb(63,50,77)', fontSize: 14 * k, fontFamily: 'Roboto-Medium'}}>
                        Bot Shared <Text style={{fontFamily: 'Roboto-Regular'}}>with </Text>{this.props.number}
                        friend{this.props.number > 1 ? 's' : ''}
                    </Text>
                </View>

            </View>
        </View>
    }
}
