import React from 'react';
import Tabs from 'react-native-tabs';
import { WIDTH, k } from '../globals';
import {
    View,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Text,
    Dimensions
} from 'react-native';
import assert from 'assert';

export default class FilterBar extends React.Component {
    render() {
        const isDay = this.props.isDay;
        const textProps = {
            selectedStyle: [
                styles.selectedText,
                { color: isDay ? 'rgba(63,50,77,1)' : 'white' }
            ],
            style: styles.text,
            selectedIconStyle: styles.selectedIcon
        };
        if (this.props.hidden) {
            return null;
        }
        let children = this.props.children;
        if (!Array.isArray(children)) {
            children = [children];
        }
        return (
            <Tabs
                {...this.props}
                style={[
                    styles.tabs,
                    this.props.style,
                    { backgroundColor: isDay ? 'white' : 'rgb(63,50,77)' }
                ]}
                iconStyle={styles.iconStyle}
            >
                {children.map(
                    el =>
                        (el.type.displayName === 'Text'
                            ? React.cloneElement(el, textProps)
                            : el)
                )}
            </Tabs>
        );
    }
}

const styles = StyleSheet.create({
    tabs: { height: 54 * k, position: 'relative', top: 0 },
    text: {
        color: 'rgba(155,155,155,1)',
        fontFamily: 'Roboto-Regular',
        fontSize: 16 * k
    },
    selectedText: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16 * k,
        letterSpacing: 0.5
    },
    selectedIcon: {
        borderBottomWidth: 3 * k,
        borderBottomColor: 'rgb(254,92,108)'
    },
    iconStyle: {
        height: 54 * k
    }
});
