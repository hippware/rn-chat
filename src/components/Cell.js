import React from 'react-native';
const {StyleSheet,View,TouchableHighlight,Text} = React;
import styles from './styles';

export default class Cell extends React.Component {
    render() {
        return (
            <View style={styles.rowBorder}>
                <View style={styles.row}>
                    <Text style={this.props.rowTextStyle || styles.rowText}>{this.props.label}</Text>
                    <View style={styles.rowValue}>
                        {this.props.children}
                    </View>
                </View>
            </View>
        );
    }
}
