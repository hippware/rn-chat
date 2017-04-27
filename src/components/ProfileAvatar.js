import React, { Component } from 'react';
import { View } from 'react-native';
import Avatar from './Avatar';
export default class ProfileAvatar extends Component {
    render() {
        return (
            <View style={{ alignItems: 'center', height: 80 }}>
                <Avatar
                    size={65}
                    isDay={this.props.isDay}
                    source={!!this.props.profile.avatar && this.props.profile.avatar.source}
                    profile={this.props.profile}
                    title={this.props.profile.displayName}
                    tappable={this.props.tappable}
                />
            </View>
        );
    }
}

ProfileAvatar.propTypes = {
    isDay: React.PropTypes.bool.isRequired,
    profile: React.PropTypes.any.isRequired,
    tappable: React.PropTypes.bool
};

ProfileAvatar.defaultProps = {
    tappable: true
};
