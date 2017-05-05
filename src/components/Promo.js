import React from 'react';
import {View, Image, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-native';
import Swiper from 'react-native-swiper';
import PhoneVerify from './PhoneVerify';
import Logo from './Logo';
import Launch from './Launch';
import assert from 'assert';
import BackgroundImage from './BackgroundImage';
import statem from '../../gen/state';
import {width, height, k} from './Global';

export default function Promo(props) {
    const state = statem.promoScene;
    return (
        <BackgroundImage source={require('../../images/LaunchScreen.png')}>
            <PhoneVerify {...{state}} />
            {!!props.error && <Text numberOfLines={1} style={styles.error}>{JSON.stringify(props.error)}</Text>}
        </BackgroundImage>
    );
    //   <Swiper style={{flex:1}}
    // autoplay={false}
    // loop={true}
    // showsButtons={false}
    // paginationStyle={styles.paginationStyle}
    // dot={<View style={styles.dot} />}
    // activeDot={<View style={styles.activeDot} />}
    // showsPagination={true}>
    //   <View key="first" style={styles.center}>
    //       <Text style={styles.tabHeader}>Welcome!</Text>
    //       <Text style={styles.tabContent}>
    //           TinyRobot is location messaging app that brings friends together for pub crawls or alerts you if your fav food truck is close.</Text>
    //   </View>
    //   <View key="second" style={styles.center}>
    // <Text style={styles.tabHeader}>Cras  Quis Nulla</Text>
    // <Text style={styles.tabContent}>
    // Donec facilisis tortor ut augue lacinia, at viverra est semper. Sed sapien metus, scelerisque nec pharetra id, tempor a tortor.
    // </Text>
    // </View>
    // <View key="third" style={styles.center}>
    //     <Text style={styles.tabHeader}>Rhoncus Nec Lacus</Text>
    //     <Text style={styles.tabContent}>
    //         Ut porta viverra est, ut dignissim elit elementum ut. Nunc vel rhoncus nibh, ut tincidunt turpis. Integer ac enim pellentesque,
    //     </Text>
    // </View>
    // </Swiper>
}

const styles = StyleSheet.create({
    error: {
        position: 'absolute',
        bottom: 70 * k,
        left: 30 * k,
        right: 30 * k,
        height: 40 * k,
        color: 'red',
    },
});
