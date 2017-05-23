// @flow

import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {k} from './Global';
import statem from '../../gen/state';
import location from '../store/locationStore';
import {observer} from 'mobx-react/native';
import {colors} from '../constants';

const onlineColor = colors.LIGHT_BLUE;
const offlineColor = 'rgb(211,211,211)';
const imgAnon = require('../../images/follower.png');

type Props = {
    source: string,
    title: string,
    text: string,
    size: number,
    disableStatus: boolean,
    style: Object,
    borderWidth: number,
    showFrame: boolean,
    profile: Object,
    tappable: boolean,
    smallFont?: boolean
};

const PresenceDot = ({profile, size, disableStatus}) => {
    const backgroundColor = profile && profile.status === 'available' ? onlineColor : offlineColor;
    const shift = size * k * 3 / 4;
    return profile && !profile.isOwn && profile.isMutual && !disableStatus
        ? <View style={[styles.dot, {backgroundColor, top: shift, left: shift}]} />
        : <Image source={imgAnon} style={[styles.dot, {top: shift, left: shift}]} />;
};

@observer
export default class Avatar extends Component {
    props: Props;

    static defaultProps = {
        tappable: true,
    };

    setNativeProps(nativeProps) {
        if (this._root) {
            this._root.setNativeProps(nativeProps);
        }
    }

    render() {
        const {text, size = 50, disableStatus, style, borderWidth, showFrame, profile, tappable, smallFont} = this.props;
        let {source, title = ' '} = this.props;
        if (profile) {
            source = !!profile.avatar && profile.avatar.source;
            title = profile.displayName || ' ';
        }
        if (title.length > 1) {
            title = title[0];
        }
        if (text) {
            title = text;
        }
        const isDay = location.isDay;
        const Clazz = tappable ? TouchableOpacity : View;
        return (
            <Clazz
                style={{justifyContent: 'flex-end'}}
                onPress={
                    profile && !profile.isOwn
                        ? () =>
                              statem.logged.profileDetailsContainer({
                                  parent: '_home',
                                  item: profile.user,
                              })
                        : null
                }
            >
                <View ref={component => (this._root = component)} style={[style, {height: size * k, width: size * k}]}>
                    {!!source &&
                        <Image
                            source={source}
                            style={[
                                {
                                    borderWidth: (borderWidth !== undefined ? borderWidth : 2) * k,
                                    borderColor: isDay ? colors.WHITE : colors.PURPLE,
                                },
                                style,
                                {width: size * k, height: size * k, borderRadius: size * k / 2},
                            ]}
                        />}
                    {!source &&
                        <View
                            style={{
                                width: size * k,
                                height: size * k,
                                borderRadius: size * k / 2,
                                justifyContent: 'center',
                                borderWidth: (borderWidth !== undefined ? borderWidth : 2) * k,
                                borderColor: isDay ? 'white' : colors.PURPLE,
                                alignItems: 'center',
                                backgroundColor: 'rgb(228,228,228)',
                            }}
                        >
                            <Text style={[styles.title, {fontSize: smallFont ? 12 * k : 18 * k}]}>
                                {title.toUpperCase()}
                            </Text>
                        </View>}
                    {showFrame &&
                        <View style={styles.frameOuter}>
                            <Image source={require('../../images/avatarFrame.png')} style={{width: size * k, height: size * k}} />
                        </View>}
                    <PresenceDot profile={profile} size={size} disableStatus={disableStatus} />
                </View>
            </Clazz>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: colors.DARK_PURPLE,
        fontFamily: 'Roboto-Regular',
    },
    dot: {
        height: 10 * k,
        width: 10 * k,
        position: 'absolute',
        borderWidth: 1 * k,
        borderRadius: 5 * k,
        borderColor: 'white',
    },
    frameOuter: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
    },
});
