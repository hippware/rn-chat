import React, {StyleSheet, TouchableOpacity, Image, View} from 'react-native';
import {k, backgroundColorCardDay, backgroundColorCardNight } from '../globals';
import { connect } from 'react-redux';

class Card extends React.Component {
    render(){
        const {style, children, isDay, ...props } = this.props;
        const backgroundColor = isDay ? backgroundColorCardDay : backgroundColorCardNight;
        if (this.props.onPress) {
            return (
                <TouchableOpacity>
                    <View  {...this.props} style={[styles.container,this.props.style]}>
                        <View style={[styles.inner, {backgroundColor},this.props.innerStyle]}>
                                {React.Children.map(this.props.children, child=>child && props? React.cloneElement(child, props) : child )}
                        </View>
                        {this.props.footer}
                    </View>
                </TouchableOpacity>
            )
        } else {
            return <View  {...this.props} style={[styles.container,this.props.style]}>
                <View style={[styles.inner, {backgroundColor}, this.props.innerStyle]}>
                    {React.Children.map(this.props.children, child=>child && props? React.cloneElement(child, props) : child)}
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

    }
});

export default connect(state=>({isDay:state.location.isDay}))(Card)