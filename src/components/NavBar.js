import React, {Image, View, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import {isDay} from '../globals';
import NavigationBar from './NavigationBar';

class NavBarGradientDay extends React.Component {
    render(){
        return <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)']}
                               style={{height:100}}/>
    }
}
class NavBarGradientNight extends React.Component {
    render(){
        return <LinearGradient colors={['rgba(47,35,59,0)','rgba(47,35,59,1)']}
                               style={{height:100}}/>
    }
}
export default class TopButtons extends React.Component {
    render(){
        const renderTitle = this.props.renderTitle;

        return <NavigationBar style={renderTitle ? {backgroundColor:'rgba(255,255,255,0.83)'} : {backgroundColor:'transparent'}}
                              header={!renderTitle && <NavBarGradientDay/>}
                              footer={renderTitle && <View style={{height:1, backgroundColor:'white', shadowOffset: {height:1, width:0}, shadowRadius:5, shadowOpacity:0.12}}/>}
                              renderTitle={renderTitle}
                              renderLeftButton={()=>
                                <TouchableOpacity onPress={()=>this.context.drawer.toggle()} style={{width:60,justifyContent:'center',alignItems:'center'}}>
                                    <Image source={require('../../images/iconMenu.png')}/>
                                </TouchableOpacity>}
                              renderRightButton={()=>
                                <TouchableOpacity onPress={Actions.messages} style={{width:60,justifyContent:'center',alignItems:'center'}}>
                                    <Image source={require('../../images/iconMessage.png')}/>
                                </TouchableOpacity>}
        />;


        return (
            <View onLayout={this.onLayout.bind(this)} style={[{position:'absolute',top:0,left:0,right:0,height:this.state.height}, (renderTitle? {backgroundColor:'rgba(255,255,255,0.98)', shadowOffset: {height:1, width:0}, shadowRadius:5, shadowOpacity:0.12} : {})]} >
                <LinearGradient colors={renderTitle ? ['rgba(255,255,255,0.98)'] : ['rgba(255,255,255,1)','rgba(255,255,255,0)']}
                                style={[{height:this.state.height}]}
                                onStartShouldSetResponder={()=>false}>

                </LinearGradient>
                <View style={[{position:'absolute',top:0,left:0,right:0,height:this.state.height}, (renderTitle? {backgroundColor:'rgba(255,255,255,0.98)', shadowOffset: {height:1, width:0}, shadowRadius:5, shadowOpacity:0.12} : {})]}>
                    <View style={{height:this.state.delta,flex:1}}></View>
                    <View style={{height:this.state.height-this.state.delta, flexDirection:'row'}}>
                        <TouchableOpacity onPress={()=>this.context.drawer.toggle()} style={{width:60,justifyContent:'center',alignItems:'center'}}>
                            <Image source={require('../../images/iconMenu.png')}/>
                        </TouchableOpacity>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>{renderTitle && renderTitle(this.props)}</View>
                        <TouchableOpacity onPress={Actions.messages} style={{width:60,justifyContent:'center',alignItems:'center'}}>
                            <Image source={require('../../images/iconMessage.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

TopButtons.contextTypes = {drawer: React.PropTypes.object};

