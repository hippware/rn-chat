import React from 'react';
import {ScrollView, Image, View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-native';
import {k, width, height} from './Global';

export default class extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View
                    style={{
                        position: 'absolute',
                        right: 15 * k,
                        left: 15 * k,
                        top: 40 * k,
                        bottom: 40 * k,
                    }}
                >
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            right: 0,
                            left: 0,
                            borderRadius: 2 * k,
                            opacity: 0.90,
                            backgroundColor: 'white',
                        }}
                    >
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.title}>{this.props.title}</Text>
                            <TouchableOpacity
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 40 * k,
                                    height: 50 * k,
                                }}
                                onPress={() => Actions.pop()}
                            >
                                <Image style={{}} source={require('../../images/iconClose.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={{height: 1 * k, backgroundColor: 'rgba(155,155,155,0.15)'}} />
                        <ScrollView style={{paddingLeft: 21 * k, paddingRight: 21 * k}}>
                            {this.props.children}
                        </ScrollView>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        flex: 1,
        paddingTop: 10,
        paddingLeft: 21 * k,
        backgroundColor: 'transparent',
        paddingTop: 14 * k,
        paddingBottom: 14 * k,
        color: 'rgb(38,30,47)',
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
    },
});
