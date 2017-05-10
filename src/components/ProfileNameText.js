import React, {Component} from 'react';
import {Text} from 'react-native';
import * as colors from '../constants/colors';

export default class extends Component {
    render() {
        return (
            <Text
                style={{
                    fontFamily: 'Roboto-Medium',
                    color: this.props.isDay ? colors.DARK_PURPLE : 'white',
                    fontSize: 15,
                }}
            >
                {this.props.children}
            </Text>
        );
    }
}
