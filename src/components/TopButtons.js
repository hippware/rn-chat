import React, {Image, View, TouchableOpacity} from 'react-native';
import {k} from '../globals';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import {isDay} from '../globals';

class TopButtonsNight extends React.Component {
    render(){
        return <LinearGradient colors={['rgba(47,35,59,0)','rgba(47,35,59,1)']}
                               style={{height:80*k, flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>this.context.drawer.toggle()} style={{width:60*k,justifyContent:'center',alignItems:'center'}}>
                <Image source={require('../../images/iconMenuNight.png')}/>
            </TouchableOpacity>
            <View style={{flex:1}}/>
            <TouchableOpacity onPress={Actions.messages} style={{width:60*k,justifyContent:'center',alignItems:'center'}}>
                <Image source={require('../../images/iconMessageNight.png')}/>
            </TouchableOpacity>

        </LinearGradient>
    }
}
class TopButtonsDay extends React.Component {
    render(){
        console.log("DRAWER!!:"+this.context.drawer);
        return <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)']}
                               style={[{height:80*k, flexDirection:'row'},this.props.style]}
                               onStartShouldSetResponder={()=>false}>
            <TouchableOpacity onPress={()=>this.context.drawer.toggle()} style={{width:60*k,justifyContent:'center',alignItems:'center'}}>
                <Image source={require('../../images/iconMenu.png')}/>
            </TouchableOpacity>
            <View style={{flex:1}}/>
            <TouchableOpacity onPress={Actions.messages} style={{width:60*k,justifyContent:'center',alignItems:'center'}}>
                <Image source={require('../../images/iconMessage.png')}/>
            </TouchableOpacity>

        </LinearGradient>
    }
}

export default class TopButtons extends React.Component {
    render(){
        return isDay() ? <TopButtonsDay {...this.props}/> : <TopButtonsNight {...this.props}/>;
    }
}

TopButtonsNight.contextTypes = {drawer: React.PropTypes.object};
TopButtonsDay.contextTypes = {drawer: React.PropTypes.object};
TopButtons.contextTypes = {drawer: React.PropTypes.object};

