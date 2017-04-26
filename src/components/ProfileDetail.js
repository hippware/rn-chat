import React, {Component} from "react";
import {TouchableOpacity, Alert, View, Text} from "react-native";
import Screen from './Screen';
import ProfileInfo from './ProfileInfo';
import ProfileAvatar from './ProfileAvatar';
import Card from './Card';
import CellWithText from './CellWithText';
import Separator from './Separator';
import friendStore from '../store/friendStore';
import Profile from '../model/Profile';
import model from '../model/model';
import message from '../store/messageStore';
import location from '../store/locationStore';
import statem, {ProfileDetailsState} from '../../gen/state';
import profileStore from '../store/profileStore';
import {observer} from "mobx-react/native";
import {k} from './Global';
import {navBarTextColorDay, navBarTextColorNight} from '../globals';

@observer
export default class ProfileDetail extends Component {
    // static onRight({item, title}) {
    //   Actions.profileOptions({item, title});
    // }
    static title({item}) {
        return <Text>{item.firstName} {item.lastName}</Text>
    }

    isCurrentUser = (profile) => model.profile && profile.user === model.profile.user

    render() {
        const isDay = location.isDay;
        const profile: Profile = profileStore.create(this.props.item);
        const state: ProfileDetailsState = statem.profileDetails;
        return (
            <Screen isDay={isDay} style={{paddingTop: 70 * k}}>
                <View>
                    <ProfileAvatar isDay={isDay} profile={profile} tappable={false}/>
                    <ProfileInfo isDay={isDay} profile={profile} message={message}/>
                    {!this.isCurrentUser(profile) &&
                        <Card isDay={isDay} style={{opacity: 0.95}}>
                            <View style={{padding: 15 * k}}>
                                <Text style={{
                                    fontFamily: 'Roboto-Medium',
                                    fontSize: 16,
                                    color: isDay ? navBarTextColorDay : navBarTextColorNight
                                }}>Options</Text>
                            </View>
                            <Separator width={1}/>
                            {profile.isFollowed && profile.isFollower &&
                                <View>
                                    <TouchableOpacity onPress={() => setTimeout(() => state.openPrivateChat(profile))}>
                                        <CellWithText isDay={isDay}>Send a message</CellWithText>
                                    </TouchableOpacity><Separator width={1}/>
                                </View>
                            }
                            {profile.isFollowed &&
                                <View>
                                    <TouchableOpacity
                                        onPress={() => Alert.alert("Are you sure?", null, [
                                        {text: 'Yes', onPress: () => friendStore.unfollow(profile)},
                                        {text: 'No'}
                                    ])}>
                                <CellWithText isDay={isDay}>Unfollow {profile.displayName}</CellWithText>
                            </TouchableOpacity><Separator width={1}/></View>}
                            {!profile.isFollowed && <View><TouchableOpacity onPress={() => friendStore.add(profile)}>
                                <CellWithText isDay={isDay}>Follow {profile.displayName}</CellWithText>
                            </TouchableOpacity><Separator width={1}/></View>}

                            {profile.hidePosts && <View><TouchableOpacity onPress={() => state.showPosts(profile)}>
                                <CellWithText image={require('../../images/show.png')} isDay={isDay}>Show {profile.displayName}'s
                                    Posts
                                </CellWithText>
                            </TouchableOpacity><Separator width={1}/></View>}
                            {!profile.isFollowed && !profile.hidePosts &&
                            <View><TouchableOpacity onPress={() => state.hidePosts(profile)}>
                                <CellWithText image={require('../../images/hide.png')} isDay={isDay}>Hide {profile.displayName}'s
                                    Posts
                                </CellWithText>
                            </TouchableOpacity><Separator width={1}/></View>}


                            {!profile.isFollower && !profile.isFollowed && !profile.isBlocked &&
                            <TouchableOpacity onPress={() => Alert.alert("Are you sure?", null, [
                                {text: 'Yes', onPress: () => friendStore.block(profile)},
                                {text: 'No'}
                            ])}>
                                <CellWithText isDay={isDay}
                                              textStyle={{color: 'red'}}>Block {profile.firstName || profile.displayName}</CellWithText>
                            </TouchableOpacity>}

                            {profile.isBlocked && <TouchableOpacity onPress={() => friendStore.unblock(profile)}>
                                <CellWithText isDay={isDay}
                                              textStyle={{color: 'red'}}>Unblock {profile.firstName || profile.displayName}</CellWithText>
                            </TouchableOpacity>}
                        </Card>
                    }
                </View>
            </Screen>
        );
    }
}

ProfileDetail.propTypes = {
    item: React.PropTypes.any.isRequired
};
