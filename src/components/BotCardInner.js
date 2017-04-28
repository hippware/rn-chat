import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Card from './Card';
import CardText from './CardText';
import BotAvatar from './BotAvatar';
import {k, defaultCover} from './Global';
import ResizedImage from './ResizedImage';
import {Actions} from 'react-native-router-native';
import Profile from '../model/Profile';
import Bot from '../model/Bot';
import {observer} from 'mobx-react/native';
import location from '../store/locationStore';
import LinearGradient from 'react-native-linear-gradient';
import Avatar from './Avatar';
import statem from '../../gen/state';

@observer
export default class BotCardInner extends React.Component {
    render() {
        const isDay = location.isDay;
        const bot: Bot = this.props.item;
        const profile = bot.owner;
        const source = bot.thumbnail && bot.thumbnail.source;
        const distance = location.location
            ? location.distanceToString(
                  location.distance(
                      location.location.latitude,
                      location.location.longitude,
                      bot.location.latitude,
                      bot.location.longitude
                  )
              )
            : null;
        return (
            <View style={[{flexDirection: 'row', flex: 1}, this.props.style]}>
                <View style={{width: 120 * k, height: 120 * k}}>
                    <View style={{position: 'absolute'}}>
                        <Image
                            style={{width: 120 * k, height: 120 * k}}
                            source={source || defaultCover[bot.coverColor % 4]}
                        />
                        <View
                            style={{
                                position: 'absolute',
                                top: 70 * k,
                                right: 0,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            {bot.image &&
                                bot.image.loaded &&
                                <LinearGradient
                                    colors={['rgba(255,255,255,0)', 'rgba(0,0,0,0.75)']}
                                    style={{height: 50 * k, top: 0}}
                                    pointerEvents='none'
                                />}
                            {bot.imagesCount > 0 &&
                                <View
                                    style={{
                                        position: 'absolute',
                                        flexDirection: 'row',
                                        height: 13 * k,
                                        width: 36 * k,
                                        right: 2 * k,
                                        bottom: 7 * k,
                                    }}
                                >
                                    <Image source={require('../../images/iconPhotoSmall.png')} />
                                    <View style={{bottom: 2 * k, left: 2 * k}}>
                                        <Text
                                            style={{
                                                fontSize: 11,
                                                color: 'white',
                                                backgroundColor: 'transparent',
                                                fontFamily: 'Roboto-Regular',
                                            }}
                                        >
                                            {bot.imagesCount}
                                        </Text>
                                    </View>
                                </View>}
                        </View>

                    </View>
                </View>
                <View style={{flex: 1, padding: 15 * k}}>
                    <Text
                        numberOfLines={1}
                        style={{
                            fontFamily: 'Roboto-Regular',
                            color: isDay ? 'rgb(63,50,77)' : 'white',
                            fontSize: 15,
                        }}
                    >
                        {bot.title}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1, height: 75 * k}}>
                            <Text numberOfLines={0} style={styles.smallText}>{bot.address}</Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    paddingTop: 10 * k,
                                    alignItems: 'center',
                                }}
                            >
                                <Image
                                    style={{width: 15 * k, height: 16 * k}}
                                    source={require('../../images/iconSubSmall.png')}
                                />
                                <Text
                                    style={{
                                        paddingLeft: 5 * k,
                                        paddingRight: 10 * k,
                                        fontSize: 12,
                                        color: 'rgb(155,155,155)',
                                        fontFamily: 'Roboto-Regular',
                                    }}
                                >
                                    {bot.followersSize}
                                </Text>
                                <View
                                    style={{
                                        width: 1 * k,
                                        height: 10 * k,
                                        backgroundColor: 'rgb(155,155,155)',
                                    }}
                                />
                                <View style={{paddingLeft: 10 * k}}>
                                    <Image
                                        style={{width: 14 * k, height: 17 * k}}
                                        source={require('../../images/iconBotLocation2.png')}
                                    />
                                </View>
                                <Text
                                    style={{
                                        paddingLeft: 10 * k,
                                        paddingRight: 10 * k,
                                        fontSize: 12,
                                        color: 'rgb(155,155,155)',
                                        fontFamily: 'Roboto-Regular',
                                    }}
                                >
                                    {distance}
                                </Text>
                            </View>
                        </View>
                        <View style={{width: 60 * k}}>
                            <View style={{flex: 1}} />
                            <View style={{alignItems: 'flex-end'}}>
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
                            <TouchableOpacity
                                onPress={() =>
                                    statem.logged.profileDetailsContainer({
                                        parent: '_home',
                                        item: profile.user,
                                    })}
                            >
                                <Text
                                    style={{
                                        textAlign: 'right',
                                        fontFamily: 'Roboto-Regular',
                                        fontSize: 13 * k,
                                        color: 'rgb(68,157,225)',
                                    }}
                                >
                                    @{profile.handle}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    smallText: {
        flex: 1,
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        color: 'rgb(155,155,155)',
    },
});
