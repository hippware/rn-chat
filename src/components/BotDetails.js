// @flow

import React from 'react';
import {View, Clipboard, Text, Animated, Alert, TouchableOpacity, TouchableWithoutFeedback, Image, StyleSheet} from 'react-native';
import Screen from './Screen';
import botFactory from '../factory/botFactory';
import {k, height, defaultCover} from './Global';
import Avatar from './Avatar';
import {observer} from 'mobx-react/native';
import botStore from '../store/botStore';
import location from '../store/locationStore';
import autobind from 'autobind-decorator';
import statem from '../../gen/state';
import PhotoGrid from './PhotoGrid';
import model from '../model/model';
import {when} from 'mobx';
import BotNavBar from './BotNavBar';
import Popover from 'react-native-popover';
import ScrollViewWithImages from './ScrollViewWithImages';
const DOUBLE_PRESS_DELAY = 300;
import * as colors from '../constants/colors';

type Props = {
    fullMap: boolean,
    item: string,
    isNew: boolean
};

type State = {
    top: any,
    fullMap: boolean,
    fadeAnim: any,
    showNavBar: true,
    navBarHeight: any,
    currentScreenWidth?: number,
    currentScreenHeight?: number,
    isVisible?: boolean,
    buttonRect?: Object
};

const EditButton = ({isOwn, bot}) => {
    return (
        isOwn &&
        <TouchableOpacity
            onPress={() =>
                statem.logged.botEdit({
                    item: bot.id,
                })}
            style={styles.editButton}
        >
            <Text style={styles.editButtonText}>
                EDIT
            </Text>

        </TouchableOpacity>
    );
};

const MainImage = ({source, bot, handleImagePress}) => (
    <TouchableWithoutFeedback onPress={handleImagePress}>
        {source
            ? <Image
                resizeMode='contain'
                style={{
                    width: 375 * k,
                    height: 275 * k,
                }}
                source={source}
            />
            : <Image
                style={{
                    width: 375 * k,
                    height: 275 * k,
                }}
                source={defaultCover[bot.coverColor % 4]}
            />}
    </TouchableWithoutFeedback>
);

@autobind
@observer
export default class extends React.Component {
    props: Props;
    state: State;
    loading: boolean;
    lastImagePress: ?number;

    constructor(props: Props) {
        super(props);
        this.loading = false;
        this.state = {
            top: new Animated.Value(this.props.fullMap ? height : 0),
            fullMap: !!this.props.fullMap,
            fadeAnim: new Animated.Value(0),
            showNavBar: true,
            navBarHeight: new Animated.Value(70),
        };
    }

    async loadMoreImages() {
        if (botStore.bot && botStore.bot.imagesCount && botStore.bot._images.length && botStore.bot.imagesCount > botStore.bot._images.length) {
            if (!this.loading) {
                this.loading = true;
                await botStore.loadImages(botStore.bot._images[botStore.bot._images.length - 1].item);
                this.loading = false;
            }
        }
    }

    componentWillMount() {
        if (this.props.item && !this.props.isNew) {
            botStore.bot = botFactory.create({id: this.props.item});
            when(() => model.connected, botStore.load);
        }
    }

    onLayout(event: Object) {
        var layout = event.nativeEvent.layout;
        this.setState({
            currentScreenWidth: layout.width,
            currentScreenHeight: layout.height,
        });
    }

    unsubscribe() {
        Alert.alert(null, 'Are you sure you want to unsubscribe?', [
            {text: 'Cancel', style: 'cancel'},
            {
                text: 'Unsubscribe',
                style: 'destructive',
                onPress: () => botStore.unsubscribe(),
            },
        ]);
    }

    subscribe() {
        botStore.subscribe();
        // do animation
        this.setState({fadeAnim: new Animated.Value(1)});
        setTimeout(() => {
            Animated.timing(this.state.fadeAnim, {toValue: 0}).start();
        }, 500);
    }

    handleImagePress(e: Object) {
        const now = new Date().getTime();

        if (this.lastImagePress && now - this.lastImagePress < DOUBLE_PRESS_DELAY) {
            delete this.lastImagePress;
            this.handleImageDoublePress(e);
        } else {
            this.lastImagePress = now;
        }
    }

    handleImageDoublePress() {
        const bot = botStore.bot;
        if (!bot.isSubscribed) {
            this.subscribe();
        }
    }

    showPopover() {
        Clipboard.setString(botStore.bot.address);
        this.refs.button.measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: {x: px, y: py, width, height},
            });
        });
        setTimeout(this.closePopover, 2000);
    }

    closePopover() {
        this.setState({isVisible: false});
    }

    render() {
        const {bot} = botStore;
        if (!bot) {
            console.warn('ERROR: No bot defined', this.props.item);
            return <Screen />;
        }
        const isOwn = !bot.owner || bot.owner.isOwn;
        const profile = bot.owner;
        if (!profile) {
            console.warn('ERROR: NO BOT PROFILE!');
            return <Screen />;
        }
        const source = bot.image && bot.image.source;
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: location.isDay ? 'white' : 'rgba(49,37,62,0.90)',
                }}
            >
                <ScrollViewWithImages style={{paddingTop: 70 * k}}>
                    <View style={{width: 375 * k, height: 275 * k}}>
                        <MainImage source={source} bot={bot} handleImagePress={this.handleImagePress} />
                        <EditButton isOwn={isOwn} bot={bot} />
                        <Animated.View
                            pointerEvents='none'
                            style={{
                                width: 375 * k,
                                height: 275 * k,
                                opacity: this.state.fadeAnim,
                                position: 'absolute',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Image source={require('../../images/iconBotAdded.png')} />
                        </Animated.View>
                    </View>
                    <View style={styles.addBotContainer}>
                        {!isOwn &&
                            !bot.isSubscribed &&
                            <TouchableOpacity onPress={this.subscribe} style={styles.addBotButton}>
                                <Text style={styles.addBotText}>
                                    ADD BOT
                                </Text>
                            </TouchableOpacity>}
                        {!isOwn &&
                            !!bot.isSubscribed &&
                            <TouchableOpacity onPress={this.unsubscribe} style={styles.unsubButton}>
                                <View style={{padding: 10 * k}}>
                                    <Image source={require('../../images/iconCheckBotAdded.png')} />
                                </View>
                                <Text style={styles.botAddedText}>
                                    BOT ADDED
                                </Text>
                            </TouchableOpacity>}
                    </View>
                    <View style={styles.userInfoRow}>
                        <View style={{paddingRight: 11 * k}}>
                            <Avatar
                                size={36}
                                profile={profile}
                                source={profile.avatar && profile.avatar.source}
                                title={profile.displayName}
                                isDay={location.isDay}
                                disableStatus
                                borderWidth={0}
                            />
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={styles.handleText}>
                                @{profile.handle}
                            </Text>
                        </View>
                        {location.location &&
                            bot.location &&
                            <View>
                                <Image source={require('../../images/buttonViewMapBG.png')} />
                                <TouchableOpacity
                                    onLongPress={this.showPopover}
                                    ref='button'
                                    onPress={statem.botDetails.map}
                                    style={styles.botLocationButton}
                                >
                                    <View style={{paddingRight: 5}}>
                                        <Image source={require('../../images/iconBotLocation.png')} />
                                    </View>
                                    <Text style={styles.distanceText}>
                                        {location.distanceToString(
                                            location.distance(
                                                location.location.latitude,
                                                location.location.longitude,
                                                bot.location.latitude,
                                                bot.location.longitude
                                            )
                                        )}
                                    </Text>
                                </TouchableOpacity>
                            </View>}
                    </View>
                    {!!bot.description &&
                        <View style={styles.descriptionContainer}>
                            <Text
                                numberOfLines={0}
                                style={{
                                    fontFamily: 'Roboto-Light',
                                    fontSize: 15,
                                    color: location.isDay ? 'rgb(63,50,77)' : 'white',
                                }}
                            >
                                {bot.description}
                            </Text>
                        </View>}
                    {!isOwn &&
                        !bot.imagesCount &&
                        <View style={styles.attachPhoto}>
                            <Image source={require('../../images/attachPhotoGray.png')} />
                            <Text style={styles.noPhotosAdded}>
                                No photos added
                            </Text>
                        </View>}
                    <PhotoGrid
                        isOwn={isOwn}
                        images={bot.thumbnails}
                        onAdd={statem.botDetails.addPhoto}
                        onView={index => statem.botDetails.editPhotos({index})}
                    />
                    {this.state.showNoMoreImages &&
                        <View style={styles.showNoMore}>
                            <Image source={require('../../images/graphicEndPhotos.png')} />
                        </View>}
                </ScrollViewWithImages>
                <Popover
                    isVisible={this.state.isVisible}
                    fromRect={this.state.buttonRect}
                    contentStyle={{backgroundColor: 'rgb(63,50,77)'}}
                    placement='bottom'
                    onClose={this.closePopover}
                >
                    <Text style={styles.popoverText}>
                        Address copied to clipboard
                    </Text>
                </Popover>
                {this.state.showNavBar && <BotNavBar bot={bot} />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    editButton: {
        borderRadius: 2,
        backgroundColor: 'rgba(255,255,255,0.75)',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 20 * k,
        width: 62 * k,
        right: 20 * k,
        height: 30 * k,
    },
    editButtonText: {
        fontFamily: 'Roboto-Medium',
        fontSize: 11 * k,
        color: colors.PURPLE,
        letterSpacing: 0.5,
    },
    addBotContainer: {
        paddingTop: 15 * k,
        paddingLeft: 20 * k,
        paddingRight: 20 * k,
    },
    addBotButton: {
        height: 40 * k,
        borderWidth: 0,
        backgroundColor: colors.PINK,
        borderRadius: 2 * k,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addBotText: {
        fontSize: 11 * k,
        letterSpacing: 0.5,
        fontFamily: 'Roboto-Medium',
        color: 'white',
    },
    popoverText: {
        fontFamily: 'Roboto-Regular',
        color: 'white',
        fontSize: 14 * k,
    },
    showNoMore: {
        paddingTop: 10,
        alignItems: 'center',
        paddingBottom: 21,
    },
    noPhotosAdded: {
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        color: 'rgb(186,186,186)',
    },
    attachPhoto: {
        height: 201 * k,
        backgroundColor: colors.LIGHT_GREY,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botLocationButton: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    unsubButton: {
        height: 40 * k,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        // @TODO: standardize. this is between GREY and LIGHT_GREY
        backgroundColor: 'rgb(228,228,228)',
        borderRadius: 2 * k,
    },
    descriptionContainer: {
        paddingLeft: 20 * k,
        paddingRight: 20 * k,
        paddingBottom: 15 * k,
    },
    botAddedText: {
        fontSize: 11 * k,
        letterSpacing: 0.5,
        fontFamily: 'Roboto-Medium',
        color: 'rgb(99,62,90)',
    },
    distanceText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 13,
        color: 'rgb(63,50,77)',
    },
    handleText: {
        fontFamily: 'Roboto-Italic',
        fontSize: 13,
        letterSpacing: -0.1,
        color: 'rgb(114,100,109)',
    },
    userInfoRow: {
        paddingTop: 15 * k,
        paddingBottom: 15 * k,
        paddingLeft: 20 * k,
        paddingRight: 20 * k,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
