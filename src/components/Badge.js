import {Text, View, StyleSheet} from 'react-native';
import React from 'react';

export default class IconBadge extends React.Component {
    render() {
        return (
            <View
                style={[styles.MainView, this.props.MainViewStyle ? this.props.MainViewStyle : {}]}
            >
                {
                    // main element
                    this.props.MainElement
                }
                {!!this.props.children &&
                    <View
                        style={[
                            styles.IconBadge,
                            this.props.IconBadgeStyle ? this.props.IconBadgeStyle : {},
                        ]}
                    >
                        {
                            // badge element
                            <Text
                                style={{
                                    fontSize: 13,
                                    color: 'white',
                                    fontFamily: 'Roboto-Medium',
                                }}
                            >
                                {this.props.children}
                            </Text>
                        }
                    </View>}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    IconBadge: {
        position: 'absolute',
        top: 1,
        right: 1,
        width: 20,
        height: 20,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(254,92,108)',
    },
});
