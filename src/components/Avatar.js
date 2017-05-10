// @flow

import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {k} from './Global';
import statem from '../../gen/state';
import location from '../store/locationStore';
const onlineColor = colors.LIGHT_BLUE;
const offlineColor = 'rgb(211,211,211)';

import {observer} from 'mobx-react/native';
import {colors} from '../constants';

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
                                    borderColor: isDay ? 'white' : colors.PURPLE,
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
                        <View
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                justifyContent: 'center',
                            }}
                        >
                            <Image source={require('../../images/avatarFrame.png')} style={{width: size * k, height: size * k}} />
                        </View>}
                    {profile &&
                        !profile.isOwn &&
                        !disableStatus &&
                        <View
                            style={{
                                backgroundColor: profile.status === 'available' ? onlineColor : offlineColor,
                                height: 10 * k,
                                width: 10 * k,
                                position: 'absolute',
                                top: size * k * 3 / 4,
                                left: size * k * 3 / 4,
                                borderWidth: 1 * k,
                                borderRadius: 5 * k,
                                borderColor: 'white',
                            }}
                        />}
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
});
