import React, { Component } from 'react';
import { Text } from 'react-native';

export default class extends Component {
    render() {
        return (
            <Text
                style={{
                    fontFamily: 'Roboto-Medium',
                    color: this.props.isDay ? 'rgb(63,50,77)' : 'white',
                    fontSize: 15
                }}
            >
                {this.props.children}
            </Text>
        );
    }
}
