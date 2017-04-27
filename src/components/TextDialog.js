import React from 'react';
const { View, TextInput, Text } = React;
import styles from './styles';
import Cell from './Cell';
import Button from 'react-native-button';

export default class TextDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.categoryLabel}>Please enter username</Text>
                <View style={styles.row}>
                    <TextInput
                        style={styles.rowInput}
                        autoCorrect={false}
                        autoCapitalize="none"
                        autoFocus={true}
                        placeholder="Username"
                        value={this.state.username}
                        onChangeText={username => this.setState({ username })}
                    />
                </View>
                <View style={styles.button}>
                    <Button onPress={() => this.props.onAdd(this.state.username)}>
                        Add
                    </Button>
                </View>

            </View>
        );
    }
}
