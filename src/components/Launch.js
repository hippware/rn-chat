import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { width, height, k } from './Global';

export default class Launch extends React.Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    backgroundColor: 'transparent'
                }}
            >
                <View style={styles.container}>
                    <Image
                        style={styles.backgroundImage}
                        source={require('../../images/EmptyBackground.png')}
                    />
                </View>
                <View style={styles.container}>
                    <Image
                        style={{ width: 117, height: 117 }}
                        source={require('../../images/loading.gif')}
                    />
                </View>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backgroundImage: { width, height }
});
