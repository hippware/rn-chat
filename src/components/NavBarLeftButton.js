import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {k} from './Global';

export default class NavBarLeftButton extends React.Component {
    render() {
        return this.props.active ? <TouchableOpacity onPress={this.props.onPress}
                                                     style={{
                                                         position: 'absolute',
                                                         left: 0,
                                                         top: 7,
                                                         width: 40 * k,
                                                         height: 70 * k,
                                                         justifyContent: 'center',
                                                         alignItems: 'center'
                                                     }}>
            {this.props.children}</TouchableOpacity> :
            <View style={{
                position: 'absolute', left: 0, top: 7, width: 40 * k, height: 70 * k,
                justifyContent: 'center', alignItems: 'center'
            }}>{this.props.children}</View>

    }
}

NavBarLeftButton.defaultProps = {
    active: true
};