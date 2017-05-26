import React, {Component} from 'react';
import {View} from 'react-native';
import Avatar from './Avatar';
export default class ProfileAvatar extends Component {
    render() {
        const size = this.props.size || 65;
        return (
            <View style={{alignItems: 'center', height: size}}>
                <Avatar
                    size={size}
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
    tappable: React.PropTypes.bool,
};

ProfileAvatar.defaultProps = {
    tappable: true,
};
