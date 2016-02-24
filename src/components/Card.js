import React, {StyleSheet, TouchableOpacity, Image, View} from 'react-native';
import {k} from '../globals';

export default class extends React.Component {
    render(){
        return (
            <TouchableOpacity>
                <View style={[styles.container,this.props.style]}>
                    <View style={styles.inner}>
                        <View style={[{padding:15*k}, this.props.innerStyle]}>
                            {this.props.children}
                        </View>
                    </View>
                    {this.props.footer}
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingRight: 15*k,
        paddingLeft: 15*k,
        paddingTop: 13*k,
        paddingBottom: 12*k,
    },
    inner: {
        borderWidth: 1.5*k,
        borderColor: 'white',
        borderRadius: 2,
        shadowOffset: {height:1, width:0}, shadowRadius:5, shadowOpacity:0.12,
        backgroundColor: 'rgba(255,255,255,1)',
    }
});