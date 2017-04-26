import React from 'react';
import styles from './styles';

import { View, Image } from 'react-native';

export default class extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={{ width: 320, height: 568 }}
                    source={require('../../images/LaunchScreen.png')}
                />
            </View>
        );
    }
}
