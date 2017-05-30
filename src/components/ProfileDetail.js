import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Alert, Image, View, Text} from 'react-native';
import Screen from './Screen';
import ProfileAvatar from './ProfileAvatar';
import Card from './Card';
import Profile from '../model/Profile';
import location from '../store/locationStore';
import profileStore from '../store/profileStore';
import friendStore from '../store/friendStore';
import {observer} from 'mobx-react/native';
import {observable} from 'mobx';
import Bots from '../model/Bots';
import {k} from './Global';
import {navBarTextColorDay, DARK_GREY, SILVER, PINK} from '../constants/colors';
import botStore from '../store/botStore';
import NavBar from './NavBar';
import NavTitle from './NavTitle';
import NavBarRightButton from './NavBarRightButton';
import BotListView from './BotListView';
import autobind from 'autobind-decorator';
import BotButton from './BotButton';
import statem from '../../gen/state';
import messageStore from '../store/messageStore';

const Separator = () => <View style={{width: 1 * k, top: 7 * k, height: 34 * k, backgroundColor: SILVER}} />;
@autobind
@observer
export default class ProfileDetail extends Component {
    @observable bots = new Bots();
    // static onRight({item, title}) {
    //   Actions.profileOptions({item, title});
    // }
    static title({item}) {
        return <Text>{item.firstName} {item.lastName}</Text>;
    }

    async unfollow() {
        const profile: Profile = profileStore.create(this.props.item);
        Alert.alert(null, `Are you sure you want to unfollow ${profile.handle}?`, [
            {text: 'Cancel', style: 'cancel'},
            {
                text: 'Unfollow',
                style: 'destructive',
                onPress: () => friendStore.unfollow(profile),
            },
        ]);
    }

    async componentDidMount() {
        if (this.props.item) {
            await botStore.list(this.bots, this.props.item);
        }
    }

    render() {
        const isDay = location.isDay;
        const profile: Profile = profileStore.create(this.props.item);
        return (
            <Screen isDay={isDay}>
                <View style={{paddingTop: 70 * k}}>
                    <BotListView
                        ref='list'
                        list={this.bots}
                        user={this.props.item}
                        hideAvatar
                        header={() => (
                            <View>
                                <Card style={styles.container}>
                                    <ProfileAvatar size={100} isDay={isDay} profile={profile} tappable={false} />
                                    <Text style={styles.displayName}>{profile.displayName}</Text>
                                    <Text style={styles.tagline}>{profile.tagline}</Text>
                                    <View style={styles.metabar}>
                                        <View style={{flex: 1}}>
                                            <Text style={styles.number}>123</Text>
                                            <Text style={styles.word}>BOTS</Text>
                                        </View>
                                        <Separator />
                                        <View style={{flex: 1}}>
                                            <Text style={styles.number}>123</Text>
                                            <Text style={styles.word}>FOLLOWERS</Text>
                                        </View>
                                        <Separator />
                                        <View style={{flex: 1}}>
                                            <Text style={styles.number}>123</Text>
                                            <Text style={styles.word}>FOLLOWING</Text>
                                        </View>
                                    </View>
                                </Card>
                                {profile.isFollowed &&
                                    <View style={{height: 15 * k}}>
                                        <TouchableOpacity onPress={this.unfollow} style={{position: 'absolute', left: 120 * k, bottom: 10 * k}}>
                                            <Image source={require('../../images/buttonFollowing.png')} />
                                        </TouchableOpacity>
                                    </View>}
                            </View>
                        )}
                    />
                </View>
                <NavBar>
                    <NavTitle onPress={() => this.refs.list.scrollToTop()}>@{profile.handle}</NavTitle>
                    {profile.isOwn && <NavBarRightButton active><Image source={require('../../images/settings.png')} /></NavBarRightButton>}
                    {profile.isMutual &&
                        <NavBarRightButton onPress={() => statem.profileDetails.openPrivateChat({item: messageStore.createChat(profile).id})} active>
                            <Image source={require('../../images/createmessage.png')} />
                        </NavBarRightButton>}
                    {!profile.isFollowed &&
                        <NavBarRightButton onPress={() => friendStore.follow(profile)} active>
                            <Text style={styles.follow}>Follow</Text>
                        </NavBarRightButton>}
                </NavBar>
                <BotButton />
            </Screen>
        );
    }
}

ProfileDetail.propTypes = {
    item: React.PropTypes.any.isRequired,
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
    },
    displayName: {
        paddingTop: 10 * k,
        fontFamily: 'Roboto-Regular',
        fontSize: 16 * k,
        color: navBarTextColorDay,
        textAlign: 'center',
    },
    tagline: {
        paddingBottom: 23 * k,
        fontFamily: 'Roboto-Regular',
        fontSize: 13 * k,
        color: navBarTextColorDay,
        textAlign: 'center',
    },
    metabar: {
        flexDirection: 'row',
        paddingBottom: 30 * k,
    },
    number: {
        fontFamily: 'Roboto-Regular',
        fontSize: 22 * k,
        color: navBarTextColorDay,
        textAlign: 'center',
    },
    follow: {
        color: PINK,
        fontFamily: 'Roboto-Regular',
        fontSize: 15 * k,
    },
    word: {
        fontFamily: 'Roboto-Light',
        fontSize: 11 * k,
        color: DARK_GREY,
        textAlign: 'center',
    },
});
