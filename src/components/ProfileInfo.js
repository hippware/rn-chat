import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { format, getRegionCode } from '../store/phoneStore';
import { k } from './Global';
import Card from './Card';
import Cell from './Cell';
import Separator from './Separator';
import MyAccountTextInput from './MyAccountTextInput';
import { Actions } from 'react-native-router-native';
import location from '../store/locationStore';
import MessageStore from '../store/messageStore';
import { navBarTextColorDay, navBarTextColorNight } from '../globals';
import Header from './Header';

export default class ProfileInfo extends Component {
    render() {
        const isDay = this.props.isDay;
        const profile = this.props.profile;
        const message: MessageStore = this.props.message;

        if (this.props.editMode) {
            return (
                <Card {...this.props} style={{ opacity: 0.95 }}>
                    <View style={{ padding: 15 * k }}>
                        <Text
                            style={{
                                fontFamily: 'Roboto-Medium',
                                flex: 1,
                                fontSize: 16,
                                color: isDay
                                    ? navBarTextColorDay
                                    : navBarTextColorNight
                            }}
                        >
                            Profile Info
                        </Text>
                    </View>
                    <Separator width={1} />
                    <MyAccountTextInput
                        isDay={isDay}
                        autoFocus={true}
                        name="firstName"
                        placeholder="First Name"
                    />
                    <MyAccountTextInput
                        isDay={isDay}
                        name="lastName"
                        placeholder="Last Name"
                    />
                    <MyAccountTextInput
                        isDay={isDay}
                        name="handle"
                        image={require('../../images/iconUsernameSmall.png')}
                        placeholder="Handle"
                    />
                    <Cell image={require('../../images/iconPhoneSmall.png')}>
                        {format(this.props.profile.phoneNumber)}
                    </Cell>
                    <Separator width={1} />
                    <MyAccountTextInput
                        isDay={isDay}
                        name="email"
                        image={require('../../images/iconEmail.png')}
                        placeholder="Email"
                    />
                </Card>
            );
        } else {
            return (
                <Card isDay={isDay} style={{ opacity: 0.95 }}>
                    <View style={{ padding: 15 * k }}>
                        <Text
                            style={{
                                fontFamily: 'Roboto-Medium',
                                fontSize: 16,
                                color: isDay
                                    ? navBarTextColorDay
                                    : navBarTextColorNight
                            }}
                        >
                            Profile Info
                        </Text>
                    </View>
                    <Separator width={1} />
                    <Cell image={require('../../images/iconMembersXs.png')}>
                        {profile.displayName}
                    </Cell>
                    <Separator width={1} />
                    <Cell image={require('../../images/iconUsernameSmall.png')}>
                        {profile.handle}
                    </Cell>
                    <Separator width={1} />
                    {!!profile.phoneNumber &&
                        <Cell
                            image={require('../../images/iconPhoneSmall.png')}
                        >
                            {format(profile.phoneNumber)}
                        </Cell>}
                    {!!profile.phoneNumber && <Separator width={1} />}
                    {!!profile.email &&
                        <Cell image={require('../../images/iconEmail.png')}>
                            {profile.email}
                        </Cell>}
                </Card>
            );
        }
    }
}

ProfileInfo.propTypes = {
    profile: React.PropTypes.any.isRequired,
    message: React.PropTypes.any,
    isDay: React.PropTypes.bool.isRequired
};
