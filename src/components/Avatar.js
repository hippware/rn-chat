import React from "react";
import {View, Image, Text} from "react-native";
import {k} from '../globals';
import file from '../services/xmpp/file';

export default class extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this._checkProps = this._checkProps.bind(this);
    }
    async _checkProps(props){
        if (props.source){
            const avatarPath = await file.requestDownload(props.source);
            this.setState({image: avatarPath});
        }
    }
    setNativeProps(nativeProps) {
        this._root.setNativeProps(nativeProps);
    }
    componentDidMount(){
        this._checkProps(this.props);
    }
    componentWillReceiveProps(props){
        this._checkProps(props);
    }
    render(){
        const title = this.props.title || ' ';
        const size = this.props.size || 50;
        return <View ref={component => this._root = component} style={[this.props.style, {height:50, width:50}]}>
                {this.state.image && <Image source={this.state.image}
                      style={[{borderWidth:(this.props.borderWidth!==undefined ? this.props.borderWidth : 2)*k,borderColor:'white'},this.props.style,{width:size*k,height:size*k,borderRadius:size*k/2}]}/> }
            {!this.state.image && <View style={{width:size*k,height:size*k,borderRadius:size*k/2,justifyContent:'center',alignItems:'center',backgroundColor:'rgb(228,228,228)'}}>
                <Text style={{color:'rgb(63,50,77)',fontSize:18*k,fontFamily:'Roboto-Regular'}}>{title[0].toUpperCase()}</Text></View>}
            {this.props.showFrame && <View style={{position:'absolute',top:0,left:0,right:0,bottom:0}}><Image source={require("../../images/avatarFrame.png") } style={{width:size*k,height:size*k}}/></View>}
        </View>
    }
}