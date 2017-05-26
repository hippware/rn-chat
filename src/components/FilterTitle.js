// @flow

import React from 'react';
import {k} from '../globals';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import location from '../store/locationStore';
import NavBar from './NavBar';

type Props = {
    onPress: Function
};

export default ({onPress}: Props) => (
    <NavBar>
        <TouchableOpacity onPress={onPress}>
            <Text style={[styles.selectedText, {color: location.isDay ? 'rgba(63,50,77,1)' : 'white'}]}>
                Home
            </Text>
        </TouchableOpacity>
    </NavBar>
);

const styles = StyleSheet.create({
    selectedText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16 * k,
        letterSpacing: 0.5,
        paddingTop: 10 * k,
    },
});
