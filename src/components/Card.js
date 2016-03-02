import React, {StyleSheet, TouchableOpacity, Image, View} from 'react-native';
import {k} from '../globals';

export default class extends React.Component {
    render(){
        if (this.props.onPress) {
            return (
                <TouchableOpacity>
                    <View  {...this.props} style={[styles.container,this.props.style]}>
                        <View style={[styles.inner,this.props.innerStyle]}>
                                {this.props.children}
                        </View>
                        {this.props.footer}
                    </View>
                </TouchableOpacity>
            )
        } else {
            return <View  {...this.props} style={[styles.container,this.props.style]}>
                <View style={[styles.inner,this.props.innerStyle]}>
                        {this.props.children}
                </View>
                {this.props.footer}
            </View>
        }
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
        borderWidth: 0,
        borderColor: 'white',
        borderRadius: 2,
        shadowOffset: {height:1, width:0}, shadowRadius:2, shadowOpacity:0.12,
        backgroundColor: 'rgba(255,255,255,1)',
    }
});