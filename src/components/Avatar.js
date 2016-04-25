import React, {View, Image, Text} from 'react-native';
import {k} from '../globals';
import file from '../services/xmpp/file';

export default class extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this._checkProps = this._checkProps.bind(this);
    }
    async _checkProps(props){
        if (props.image){
            const avatarPath = await file.requestDownload(props.image);
            this.setState({image: avatarPath});
        }
    }
    componentDidMount(){
        this._checkProps(this.props);
    }
    componentWillReceiveProps(props){
        this._checkProps(props);
    }
    render(){
        const size = this.props.size || 40;
        return <View>
                {this.state.image && <Image source={this.state.image}
                      style={[{borderWidth:(this.props.borderWidth!==undefined ? this.props.borderWidth : 2)*k,borderColor:'white',width:size*k,height:size*k,borderRadius:size*k/2},this.props.style]}/> }
            {!this.state.image && this.props.title && <View style={{width:size*k,height:size*k,borderRadius:size*k/2,justifyContent:'center',alignItems:'center',backgroundColor:'rgb(228,228,228)'}}>
                <Text style={{color:'rgb(63,50,77)',fontSize:18*k,fontFamily:'Roboto-Regular'}}>{this.props.title[0].toUpperCase()}</Text></View>}
            {this.props.showFrame && <View style={{position:'absolute',top:0,left:0,right:0,bottom:0}}><Image source={require("../../images/avatarFrame.png") } style={{width:size*k,height:size*k}}/></View>}
        </View>
    }
}