import React from 'react';
import { StyleSheet, PixelRatio, Dimensions } from 'react-native';
export const { width, height } = Dimensions.get('window');
export const k = height / 667;

export const defaultCover = [
    require('../../images/defaultCover0.png'),
    require('../../images/defaultCover1.png'),
    require('../../images/defaultCover2.png'),
    require('../../images/defaultCover3.png')
];
