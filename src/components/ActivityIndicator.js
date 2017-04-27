'use strict';

var React = require('react-native');
var { View, Modal, ActivityIndicator, StyleSheet } = React;
var styles = require('./styles');

class MyActivityIndicator extends React.Component {
    render() {
        if (this.props.active) {
            return (
                <View style={styles.loadingContainer}>
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" />
                    </View>
                </View>
            );
        } else {
            return <View />;
        }
    }
}

module.exports = MyActivityIndicator;
