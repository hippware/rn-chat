import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {k, width, height} from './Global';
import {Actions} from 'react-native-router-native';
import Avatar from './Avatar';
import profileFactory from '../factory/profileFactory';
import * as colors from '../constants/colors';

type Props = {
    number: number,
    user: any
};

export default class extends React.Component {
    props: Props;

    componentDidMount() {
        // setTimeout(Actions.pop, 3000);
    }

    render() {
        const {number, user} = this.props;
        const profile = profileFactory.create(user);
        const friendString = number > 1 ? 'friends' : 'friend';
        return (
            <View style={styles.container}>
                <View style={styles.inner}>
                    <Avatar size={40 * k} profile={profile} />
                    {number > 1 &&
                        <View style={styles.numberBubble}>
                            <Avatar size={40 * k} text={`+${number - 1}`} smallFont={number > 9} />
                        </View>}
                    <View style={styles.textContainer}>
                        <Text style={styles.botSharedText}>
                            {'Bot Shared '}
                        </Text>
                        <Text style={styles.botSharedText}>
                            <Text style={{fontFamily: 'Roboto-Regular'}}>with </Text>
                            {`${number} ${friendString}!`}
                        </Text>
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
        backgroundColor: 'transparent',
        paddingTop: 175 * k,
        alignItems: 'center',
    },
    inner: {
        backgroundColor: colors.hexToRgba(colors.WHITE, 0.9),
        height: 80 * k,
        borderRadius: 74 * k,
        flexDirection: 'row',
        padding: 20 * k,
        paddingRight: 30 * k,
    },
    numberBubble: {
        marginLeft: -10 * k,
        zIndex: -1,
    },
    textContainer: {
        marginLeft: 7 * k,
    },
    botSharedText: {
        color: colors.PURPLE,
        fontSize: 14 * k,
        fontFamily: 'Roboto-Medium',
    },
});
