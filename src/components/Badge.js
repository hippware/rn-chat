// @flow

import {Text, View, StyleSheet} from 'react-native';
import React from 'react';

export default ({MainViewStyle, MainElement, children, IconBadgeStyle}) => (
    <View style={[styles.MainView, MainViewStyle ? MainViewStyle : {}]}>
        {MainElement}
        {!!children &&
            <View style={[styles.IconBadge, IconBadgeStyle ? IconBadgeStyle : {}]}>
                {
                    // badge element
                    <Text
                        style={{
                            fontSize: 13,
                            color: 'white',
                            fontFamily: 'Roboto-Medium',
                        }}
                    >
                        {children}
                    </Text>
                }
            </View>}
    </View>
);

const styles = StyleSheet.create({
    IconBadge: {
        position: 'absolute',
        top: 1,
        right: 1,
        width: 20,
        height: 20,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(254,92,108)',
    },
});
