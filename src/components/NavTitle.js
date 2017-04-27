import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import location from '../store/locationStore';
import { navBarTextColorDay, navBarTextColorNight } from '../globals';
import { observer } from 'mobx-react/native';

@observer
export default class extends React.Component {
    render() {
        const isDay = this.props.isDay || location.isDay;
        return (
            <View
                style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    left: 0,
                    height: 70,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Text
                    style={{
                        paddingTop: 14,
                        fontFamily: 'Roboto-Regular',
                        fontSize: 18,
                        backgroundColor: 'transparent',
                        color: isDay ? navBarTextColorDay : navBarTextColorNight
                    }}
                >
                    {this.props.children}
                </Text>
            </View>
        );
    }
}
