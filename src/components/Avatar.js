import React, {View, Image, Text} from 'react-native';
import {k} from '../globals';

export default class extends React.Component {
    render(){
        return <View>
                {this.props.image && <Image source={this.props.image}
                      style={[{borderWidth:2*k,borderColor:'white',width:40*k,height:40*k,borderRadius:20*k},this.props.style]}/> }
            {!this.props.image && this.props.title && <View style={{width:40*k,height:40*k,justifyContent:'center',alignItems:'center',backgroundColor:'rgb(228,228,228)'}}>
                <Text style={{color:'rgb(63,50,77)',fontSize:18*k,fontFamily:'Roboto-Regular'}}>{this.props.title}</Text></View>}
            <View style={{position:'absolute',top:0,left:0,right:0,bottom:0}}><Image source={require("../../images/avatarFrame.png") } style={{width:40*k,height:40*k}}/></View>
        </View>
    }
}