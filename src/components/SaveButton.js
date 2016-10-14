import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {k} from './Global';

export default class SaveButton extends React.Component {
  render(){
    return this.props.active ? <TouchableOpacity onPress={this.props.onSave}
                             style={{position:'absolute', right:0, top:0, width:60*k, height:70*k,
                              justifyContent:'center', alignItems:'center'}}>
      <Text style={{paddingTop:14, fontFamily:'Roboto-Regular', fontSize:15*k, backgroundColor:'transparent', color:this.props.active ? 'rgb(254,92,108)' : 'rgb(155,155,155)'}}>Save</Text></TouchableOpacity> :
      <View
                        style={{position:'absolute', right:0, top:0, width:60*k, height:70*k,
                              justifyContent:'center', alignItems:'center'}}>
        <Text style={{paddingTop:14, fontFamily:'Roboto-Regular', fontSize:15*k, backgroundColor:'transparent', color:this.props.active ? 'rgb(254,92,108)' : 'rgb(155,155,155)'}}>Save</Text></View>
    
  }
}

SaveButton.defaultProps = {
  active: true
};