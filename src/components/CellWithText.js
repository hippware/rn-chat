import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity, TouchableHighlight, Text } from 'react-native';
import styles from './styles';
import { k, navBarTextColorDay, navBarTextColorNight } from '../globals';
import location from '../store/locationStore';
import { observer } from 'mobx-react/native';

@observer
export default class Cell extends React.Component {
    render() {
        const cell = (
            <View
                style={[
                    {
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 15 * k
                    },
                    this.props.style
                ]}
            >
                {this.props.image &&
                    <View
                        style={[
                            {
                                width: 15 * k,
                                paddingLeft: 5 * k,
                                paddingRight: 15 * k,
                                alignItems: 'center'
                            },
                            this.props.imageStyle
                        ]}
                    >
                        <Image source={this.props.image} />
                    </View>}
                <Text
                    numberOfLines={1}
                    style={[
                        {
                            flex: 1,
                            fontFamily: 'Roboto-Regular',
                            fontSize: 15,
                            color: location.isDay ? navBarTextColorDay : navBarTextColorNight
                        },
                        this.props.textStyle
                    ]}
                >
                    {this.props.children}
                </Text>
                {this.props.onRemove &&
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onPress={this.props.onRemove}
                    >
                        <Image source={require('../../images/iconClose.png')} />
                    </TouchableOpacity>}

            </View>
        );

        if (this.props.onPress) {
            return <TouchableOpacity {...this.props}>{cell}</TouchableOpacity>;
        } else {
            return cell;
        }
    }
}
