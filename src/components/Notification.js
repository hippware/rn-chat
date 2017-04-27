import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {k} from '../globals';
import {observer} from 'mobx-react/native';
import notification from '../store/notificationStore';

export default observer((props) => {
    console.log("CURRENT:", notification.current);
    if (!notification.current) {
        return null;
    }
    return (
        <View style={[styles.wrapper, props.style]}>
            <Text style={styles.title}>{notification.current.title}</Text>
            <Text style={styles.detail}>{notification.current.detail}</Text>
        </View>
    );
});

const styles = StyleSheet.create({
    wrapper: {
        height: 53.5 * k,
        justifyContent: 'center',
        backgroundColor: 'rgba(117,117,117,0.85)',
        right: 0,
        left: 0
    },
    title: {
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'Roboto-Regular',
        color: 'white',
        letterSpacing: 0.6
    },
    detail: {
        fontSize: 13,
        textAlign: 'center',
        fontFamily: 'Roboto-Regular',
        color: 'rgba(255,255,255,0.75)',
        letterSpacing: 0.6
    }
});
