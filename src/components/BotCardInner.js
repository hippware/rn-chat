import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {k, defaultCover} from './Global';
import Bot from '../model/Bot';
import {observer} from 'mobx-react/native';
import location from '../store/locationStore';
import LinearGradient from 'react-native-linear-gradient';
import Avatar from './Avatar';
import statem from '../../gen/state';
import * as colors from '../constants/colors.js';

const MainImage = ({item, source}: {item: Bot, source: any}) => (
    <View style={{width: 120 * k, height: 120 * k}}>
        <View style={{position: 'absolute'}}>
            <Image style={{width: 120 * k, height: 120 * k}} source={source || defaultCover[item.coverColor % 4]} />
            <View style={styles.innerWrapper}>
                {item.image &&
                    item.image.loaded &&
                    <LinearGradient colors={['rgba(255,255,255,0)', 'rgba(0,0,0,0.75)']} style={{height: 50 * k, top: 0}} pointerEvents='none' />}
                {item.imagesCount > 0 &&
                    <View style={styles.image}>
                        <Image source={require('../../images/iconPhotoSmall.png')} />
                        <View style={{bottom: 2 * k, left: 2 * k}}>
                            <Text style={styles.imagesCount}>
                                {item.imagesCount}
                            </Text>
                        </View>
                    </View>}
            </View>

        </View>
    </View>
);

const TheAvatar = ({profile, isDay}: {profile: Object, isDay: boolean}) => (
    <View style={styles.avatar}>
        <Avatar
            size={30}
            profile={profile}
            source={profile.avatar && profile.avatar.source}
            tappable
            title={profile.displayName}
            isDay={isDay}
            disableStatus
            borderWidth={0}
        />
    </View>
);

const UserName = ({profile}: {profile: Object}) => (
    <TouchableOpacity
        onPress={() =>
            statem.logged.profileDetailsContainer({
                parent: '_home',
                item: profile.user,
            })}
        style={styles.userNameButton}
    >
        <Text numberOfLines={2} style={styles.userName}>
            @{profile && profile.handle}
        </Text>
    </TouchableOpacity>
);

const BottomLine = props => (
    <View
        style={{
            flexDirection: 'row',
            alignItems: 'center',
        }}
    >
        <Image style={{width: 15 * k, height: 16 * k}} source={require('../../images/iconSubSmall.png')} />
        <Text style={styles.followersSize}>
            {props.item.followersSize}
        </Text>
        <View style={{paddingLeft: 10 * k}}>
            <Image style={{width: 14 * k, height: 17 * k}} source={require('../../images/iconBotLocation2.png')} />
        </View>
        <Text style={styles.distance}>
            {props.distance}
        </Text>
        <UserName profile={props.profile} />
    </View>
);

type Props = {
    style: any,
    item: Bot
};

const BotCardInner = (props: Props) => {
    const {item, style} = props;
    const isDay = location.isDay;
    const profile = item.owner;
    const source = item.thumbnail && item.thumbnail.source;
    const distance = location.location
        ? location.distanceToString(
              location.distance(location.location.latitude, location.location.longitude, item.location.latitude, item.location.longitude)
          )
        : null;
    return (
        <View style={[styles.container, style]}>
            <MainImage {...props} source={source} />
            <View style={styles.rightSide}>
                <Text numberOfLines={1} style={styles.botTitle}>
                    {item.title}
                </Text>
                <View style={{flexDirection: 'row', flex: 1}}>
                    <Text numberOfLines={2} style={styles.smallText}>{item.address}</Text>
                    <TheAvatar location={location} isDay={isDay} profile={profile} />
                </View>
                <BottomLine {...props} distance={distance} profile={profile} />
            </View>
        </View>
    );
};

export default observer(BotCardInner);

const styles = StyleSheet.create({
    avatar: {
        width: 60 * k,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    rightSide: {
        flex: 1,
        padding: 15 * k,
    },
    container: {
        flexDirection: 'row',
        flex: 1,
    },
    smallText: {
        flex: 1,
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: colors.DARK_GREY,
        marginBottom: 10 * k,
    },
    distance: {
        paddingLeft: 10 * k,
        paddingRight: 10 * k,
        fontSize: 12,
        color: colors.DARK_GREY,
        fontFamily: 'Roboto-Regular',
    },
    followersSize: {
        paddingLeft: 5 * k,
        paddingRight: 10 * k,
        fontSize: 12,
        color: colors.DARK_GREY,
        fontFamily: 'Roboto-Regular',
    },
    imagesCount: {
        fontSize: 11,
        color: colors.WHITE,
        backgroundColor: 'transparent',
        fontFamily: 'Roboto-Regular',
    },
    image: {
        position: 'absolute',
        flexDirection: 'row',
        height: 13 * k,
        width: 36 * k,
        right: 2 * k,
        bottom: 7 * k,
    },
    innerWrapper: {
        position: 'absolute',
        top: 70 * k,
        right: 0,
        left: 0,
        bottom: 0,
    },
    botTitle: {
        fontFamily: 'Roboto-Regular',
        color: location.isDay ? colors.PURPLE : 'white',
        fontSize: 15,
    },
    bottomLine: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        borderWidth: 1,
        borderColor: 'blue',
    },
    userName: {
        textAlign: 'right',
        fontFamily: 'Roboto-Regular',
        fontSize: 10 * k,
        color: colors.BLUE,
    },
    userNameButton: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
});
