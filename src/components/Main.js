var React = require('react-native');
var {View, Text, TextInput} = React;
var styles = require('./styles');

export default class Main extends React.Component {
    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.categoryLabel}>Success</Text>
            </View>
        )
    }
}
