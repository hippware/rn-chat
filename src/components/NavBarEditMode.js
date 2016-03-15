import React, {Image, Text, View, PropTypes,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import NavigationBar from './NavigationBar';
import { connect } from 'react-redux';

class NavBarEditMode extends React.Component {
    render() {
        const isDay = this.props.location.isDay;
//        const isDay = this.props.chameleon? this.props.location.isDay : true;
        return <NavigationBar
            {...this.props}
            navBarHeader={this.props.navBarHeader || (this.props.navBarHeaderDay && this.props.navBarHeaderNight && (isDay ? this.props.navBarHeaderDay : this.props.navBarHeaderNight))}
            style={ [{backgroundColor:'transparent'}, this.props.navigationBarStyle, (isDay? this.props.navigationBarStyleDay : this.props.navigationBarStyleNight)]}
            renderLeftButton={()=>
                                <TouchableOpacity key="left" accessibilityLabel="leftNavButton"   onPress={()=>Actions.refresh({editMode:false})}
                                style={{width:60,justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{fontFamily:'Roboto-Regular',color:'rgb(155,155,155)',fontSize:15}}>Cancel</Text>
                                </TouchableOpacity>}
            textStyle={{fontFamily:'Roboto-Regular',color:'rgb(63,50,77)',fontSize:18}}
            renderRightButton={()=>
                                <TouchableOpacity key="right" accessibilityLabel="rightNavButton" onPress={()=>Actions.refresh({editMode:false, save:true})}
                                style={{width:60,justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{fontFamily:'Roboto-Regular',color:'rgb(254,92,108)',fontSize:15}}>Save</Text>
                                </TouchableOpacity>}/>
    }

}



export default connect(state=>state)(NavBarEditMode)