import React from 'react'
import {
    View,
    TouchableWithoutFeedback,
    Text,
    ScrollView,
    Animated,
    Alert,
    TouchableOpacity,
    Image
} from 'react-native'
import { Actions } from 'react-native-router-native'
import Screen from './Screen'
import botFactory from '../factory/botFactory'
import Map from './Map'
import { Annotation } from 'react-native-mapbox-gl'
import GradientHeader from './GradientHeader'
import { k, width, height, defaultCover } from './Global'
import BotAvatar from './BotAvatar'
import Avatar from './Avatar'
import { observer } from 'mobx-react/native'
import { observable } from 'mobx'
import botStore from '../store/botStore'
import location from '../store/locationStore'
import Bot, { VISIBILITY_PUBLIC, VISIBILITY_OWNER, LOCATION, NOTE, IMAGE } from '../model/Bot'
import autobind from 'autobind-decorator'
import statem from '../../gen/state'
import PhotoGrid from './PhotoGrid'
import model from '../model/model'
import { when } from 'mobx'
import BotNavBar from './BotNavBar'

const DOUBLE_PRESS_DELAY = 300
function Header (props) {
    return <View style={{
        backgroundColor: 'rgba(255,255,255,0.85)',
        flexDirection: 'row',
        height: 41 * k,
        shadowOffset: {height: 1, width: 0},
        shadowRadius: 2,
        shadowOpacity: 0.12,
    }}>
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Text numberOfLines={1} style={{
                paddingLeft: 26 * k,
                fontSize: 14 * k,
                color: 'rgb(63,50,77)',
                fontFamily: 'Roboto-Regular'
            }}>{props.children}</Text>
        </View>
    </View>
}

@autobind
@observer
export default class extends React.Component {

    constructor (props) {
        super(props)
        this.loading = false
        this.state = {
            top: new Animated.Value(this.props.fullMap ? height : 0),
            fullMap: !!this.props.fullMap,
            fadeAnim: new Animated.Value(0),
            showNavBar: true,
            navBarHeight: new Animated.Value(70),
        }
    }

    async loadMoreImages () {
        if (botStore.bot && botStore.bot.imagesCount && botStore.bot.images.length && botStore.bot.imagesCount > botStore.bot.images.length) {
            if (!this.loading) {
                this.loading = true
                console.log('LOAD MORE IMAGES', botStore.bot.images[botStore.bot.images.length - 1].item)
                await botStore.loadImages(botStore.bot.images[botStore.bot.images.length - 1].item)
                this.loading = false
            }
        }
    }

    onScrollStart () {
        // display 'no more images'
        if (botStore.bot.imagesCount > 0 && botStore.bot.imagesCount === botStore.bot.images.length) {
            this.setState({showNoMoreImages: true})
        }
    }

    onScrollEnd (event) {
        // load more images
        if (!this.state.showNavBar) {
            console.log('SCROLL END!', botStore.bot.imagesCount, botStore.bot.images.length)
            // this.setState({showNavBar: true})
            // Animated.timing(
            //   this.state.navBarHeight,
            //   {toValue: 70}
            // ).start();
        }
        this.setState({showNoMoreImages: false})

    }

    onScroll (event) {
        if (event.nativeEvent.contentOffset.y + height + 200 >= event.nativeEvent.contentSize.height) {
            this.loadMoreImages()
        }
        // if (this.state.showNavBar){
        //   this.setState({showNavBar: false})
        //   Animated.timing(
        //     this.state.navBarHeight,
        //     {toValue: 0}
        //   ).start();
        // }
        // switch nav bar is scroll position is below threshold
        // const y = event.nativeEvent.contentOffset.y;
        // const limit = 50 * k;
        // const upper = 240*k;
        // if (y > limit) {
        //   Animated.timing(          // Uses easing functions
        //     this.state.fadeAnim,    // The value to drive
        //     {toValue: Math.max(0, 1 - y/upper)}            // Configuration
        //   ).start();
        //   if (!this.state.showNavBar) {
        //     this.setState({showNavBar: true});
        //   }
        // } else {
        //   Animated.timing(          // Uses easing functions
        //     this.state.fadeAnim,    // The value to drive
        //     {toValue: Math.min(1, 1 - y/upper)}            // Configuration
        //   ).start();
        //   if (this.state.showNavBar) {
        //     this.setState({showNavBar: false});
        //   }
        // }
    }

    async componentWillMount () {
        if (this.props.item) {
            botStore.bot = botFactory.create({id: this.props.item})
            when(() => model.connected, botStore.load)
        }
    }

    hideFullMap () {
        this.setState({fullMap: true})
        Animated.timing(
            this.state.top,
            {toValue: 0}
        ).start()
        Actions.refresh({})
    }

    showFullMap () {
        this.setState({fullMap: true})
        Animated.timing(
            this.state.top,
            {toValue: height}
        ).start()
        Actions.refresh({leftButton: {icon: require('../../images/iconClose.png'), onPress: this.hideFullMap}})
    }

    onLayout (event) {
        var layout = event.nativeEvent.layout
        this.setState({currentScreenWidth: layout.width, currentScreenHeight: layout.height})
    }

    unsubscribe () {
        Alert.alert(null, 'Are you sure you want to unsubscribe?', [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Unsubscribe', style: 'destructive', onPress: () => botStore.unsubscribe()}
        ])
    }

    subscribe () {
        botStore.subscribe()
        // do animation
        this.setState({fadeAnim: new Animated.Value(1)})
        setTimeout(() => {
            Animated.timing(
                this.state.fadeAnim,
                {toValue: 0}
            ).start()

        }, 500)
    }

// ...

    /**
     * Double Press recognition
     * @param  {Event} e
     */
    handleImagePress (e) {
        const now = new Date().getTime()

        if (this.lastImagePress && (now - this.lastImagePress) < DOUBLE_PRESS_DELAY) {
            delete this.lastImagePress
            this.handleImageDoublePress(e)
        }
        else {
            this.lastImagePress = now
        }
    }

    handleImageDoublePress (e) {
        const bot = botStore.bot
        if (!bot.isSubscribed) {
            this.subscribe()
        }
    }

    render () {
        const bot = botStore.bot
        if (!bot) {
            console.log('ERROR: No bot defined', this.props.item)
            return <Screen/>
        }
        const isDay = location.isDay
        const isOwn = !bot.owner || bot.owner.isOwn
        const coef = bot.image && bot.image.width ? (width - 34 * k) / bot.image.width : 0
        const profile = bot.owner
        if (!profile) {
            console.log('ERROR: NO BOT PROFILE!')
            return <Screen/>
        }
        const source = bot.image && bot.image.source
        return <View style={{flex: 1, backgroundColor: location.isDay ? 'white' : 'rgba(49,37,62,0.90)'}}>
            <ScrollView style={{paddingTop: 70 * k}} onScrollEndDrag={this.onScrollEnd}
                        onScrollBeginDrag={this.onScrollStart} onScroll={this.onScroll} scrollEventThrottle={1}>
                <View style={{width: 375 * k, height: 275 * k}}>
                    <TouchableWithoutFeedback onPress={this.handleImagePress}>
                        <Image style={{width: 375 * k, height: 275 * k}}
                               source={source || defaultCover[bot.coverColor % 4]}/>
                    </TouchableWithoutFeedback>
                    {isOwn && <TouchableOpacity onPress={() => statem.logged.botEdit({item: bot.id})}
                                                style={{
                                                    borderRadius: 2,
                                                    backgroundColor: 'rgba(255,255,255,0.75)',
                                                    position: 'absolute',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    bottom: 20 * k,
                                                    right: 20 * k,
                                                    height: 30 * k,
                                                    width: 36 * k
                                                }}>
                        <Image source={require('../../images/iconEditBot.png')}/>
                    </TouchableOpacity>}
                    <Animated.View pointerEvents="none" style={{
                        width: 375 * k, height: 275 * k, opacity: this.state.fadeAnim,
                        position: 'absolute', justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Image source={require('../../images/iconBotAdded.png')}/>
                    </Animated.View>
                </View>
                <View style={{paddingTop: 15 * k, paddingLeft: 20 * k, paddingRight: 20 * k}}>
                    {!isOwn && !bot.isSubscribed && <TouchableOpacity onPress={this.subscribe} style={{
                        height: 40 * k,
                        borderWidth: 0,
                        backgroundColor: 'rgb(254,92,108)',
                        borderRadius: 2 * k,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text
                            style={{fontSize: 11 * k, letterSpacing: 0.5, fontFamily: 'Roboto-Medium', color: 'white'}}>ADD
                            BOT</Text>
                    </TouchableOpacity>}
                    {!isOwn && !!bot.isSubscribed && <TouchableOpacity onPress={this.unsubscribe} style={{
                        height: 40 * k,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 0,
                        backgroundColor: 'rgb(228,228,228)',
                        borderRadius: 2 * k
                    }}>
                        <View style={{padding: 10 * k}}><Image source={require('../../images/iconCheckBotAdded.png')}/></View>
                        <Text style={{
                            fontSize: 11 * k,
                            letterSpacing: 0.5,
                            fontFamily: 'Roboto-Medium',
                            color: 'rgb(99,62,90)'
                        }}>BOT ADDED</Text>
                    </TouchableOpacity>}
                </View>
                <View style={{
                    paddingTop: 15 * k,
                    paddingBottom: 15 * k,
                    paddingLeft: 20 * k,
                    paddingRight: 20 * k,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style={{paddingRight: 11 * k}}><Avatar size={36} profile={profile}
                                                                 source={profile.avatar && profile.avatar.source}
                                                                 title={profile.displayName} isDay={location.isDay}
                                                                 disableStatus borderWidth={0}/></View>
                    <View style={{flex: 1}}><Text style={{
                        fontFamily: 'Roboto-Italic',
                        fontSize: 13,
                        letterSpacing: -0.1,
                        color: 'rgb(114,100,109)'
                    }}>@{profile.handle}</Text></View>
                    {location.location && bot.location && <View>
                        <Image source={require('../../images/buttonViewMapBG.png')}/>
                        <TouchableOpacity onPress={statem.botDetails.map} style={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            right: 0,
                            left: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            backgroundColor: 'transparent'
                        }}>
                            <View style={{paddingRight: 5}}><Image
                                source={require('../../images/iconBotLocation.png')}/></View>
                            <Text style={{fontFamily: 'Roboto-Regular', fontSize: 13, color: 'rgb(63,50,77)'}}>
                                {location.distanceToString(
                                    location.distance(location.location.latitude, location.location.longitude, bot.location.latitude, bot.location.longitude)
                                )}
                            </Text>
                        </TouchableOpacity>
                    </View>}
                </View>
                {!!bot.description && <View style={{paddingLeft: 20 * k, paddingRight: 20 * k, paddingBottom: 15 * k}}>
                    <Text numberOfLines={0} style={{
                        fontFamily: 'Roboto-Light',
                        fontSize: 15,
                        color: location.isDay ? 'rgb(63,50,77)' : 'white'
                    }}>{bot.description}</Text>
                </View>
                }
                {!isOwn && !bot.imagesCount && <View style={{
                    height: 201 * k,
                    backgroundColor: 'rgb(242,243,245)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image source={require('../../images/attachPhotoGray.png')}/>
                    <Text style={{fontFamily: 'Roboto-Regular', fontSize: 15, color: 'rgb(186,186,186)'}}>No photos
                        added</Text>
                </View>}
                <PhotoGrid isOwn={isOwn} images={bot.images} onAdd={statem.botDetails.addPhoto}
                           onView={index => statem.botDetails.editPhotos({index})}/>
                {this.state.showNoMoreImages &&
                <View style={{paddingTop: 10, alignItems: 'center', paddingBottom: 21}}><Image
                    source={require('../../images/graphicEndPhotos.png')}/></View>}
            </ScrollView>
            {this.state.showNavBar && <BotNavBar bot={bot}/>}
        </View>
    }
}