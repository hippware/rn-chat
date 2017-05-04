import React from 'react';
import {StyleSheet, ListView, TouchableOpacity, Image, View} from 'react-native';
import {k, backgroundColorCardDay, backgroundColorCardNight} from '../globals';

export default class CardList extends React.Component {
    render() {
        const {style, children, ...props} = this.props;
        const backgroundColor = this.props.isDay ? backgroundColorCardDay : backgroundColorCardNight;
        return <ListView {...this.props} contentContainerStyle={[styles.inner, {backgroundColor}, this.props.innerStyle]} />;
    }
}

const styles = StyleSheet.create({
    inner: {
        borderWidth: 0,
        borderColor: 'white',
        borderRadius: 2,
        shadowOffset: {height: 1, width: 0},
        shadowRadius: 2,
        shadowOpacity: 0.12,
    },
});

CardList.propTypes = {
    isDay: React.PropTypes.bool.isRequired,
};
