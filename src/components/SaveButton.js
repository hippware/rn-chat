import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

export default class extends React.Component {
  render(){
    return <TouchableOpacity onPress={this.props.onSave}
                             style={{position:'absolute', right:0, top:0, width:50, height:70,
                              justifyContent:'center', alignItems:'center'}}>
      <Text style={{paddingTop:14, fontFamily:'Roboto-Regular', fontSize:15, backgroundColor:'transparent', color:'rgb(254,92,108)'}}>Save</Text></TouchableOpacity>
    
  }
}