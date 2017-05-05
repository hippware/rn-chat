import React, {Component} from 'react';
import {TouchableOpacity, Alert, StyleSheet, ListView, View, Text} from 'react-native';
import Screen from './Screen';
import Avatar from './Avatar';
import Card from './Card';
import Cell from './Cell';
import Header from './Header';
import Separator from './Separator';
import ProfileAvatar from './ProfileAvatar';
import Profile from '../model/Profile';
import friendStore from '../store/friendStore';

const ProfileOptions = props => {
    const isDay = location.isDay;
    const profile: Profile = props.item;

    return (
        <Screen isDay={isDay}>
            <ProfileAvatar profile={profile} isDay={isDay} />
            <Card isDay={isDay} style={{opacity: 0.95}}>
                <Header>Options</Header>
                <Separator width={1} />
                {profile.isFollower &&
                    <TouchableOpacity
                        onPress={() =>
                            Alert.alert('Are you sure?', null, [{text: 'Yes', onPress: () => friendStore.remove(profile.user)}, {text: 'No'}])}
                    >
                        <Cell isDay={isDay} textStyle={{color: 'red'}}>Remove from friends</Cell>
                    </TouchableOpacity>}
                {!profile.isFollower &&
                    <TouchableOpacity onPress={() => friendStore.add(profile)}>
                        <Cell isDay={isDay}>Add to friends</Cell>
                    </TouchableOpacity>}
                <Separator width={1} />
                <Cell isDay={isDay} textStyle={{color: 'red'}}>Block User</Cell>
            </Card>
        </Screen>
    );
};

export default ProfileOptions;

ProfileOptions.propTypes = {
    item: React.PropTypes.any.isRequired,
};
