import React from 'react';
import {View, Text} from 'react-native';
import {k, backgroundColorDay, backgroundColorNight} from '../globals';
import {observer} from 'mobx-react/native';
import notification from '../store/notificationStore';

@observer
export default class extends React.Component {
  render() {
    const current = notification.current;
    console.log("CURRENT:", notification.current);
    if (!notification.current){
      return null;
    }
    return <View
      style={[{height:53.5*k, justifyContent:'center', backgroundColor:'rgba(117,117,117,0.85)', right:0, left:0}, this.props.style]}>
      <Text style={{fontSize:15, textAlign:'center', fontFamily:'Roboto-Regular', color:'white', letterSpacing:0.6}}>{notification.current.title}</Text>
      <Text
        style={{fontSize:13, textAlign:'center', fontFamily:'Roboto-Regular', color:'rgba(255,255,255,0.75)',letterSpacing:0.6}}>{notification.current.detail}</Text>
    </View>;
  }
}