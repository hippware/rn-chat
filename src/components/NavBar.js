import React, {Image, View, PropTypes,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import NavigationBar from './NavigationBar';

export default class extends React.Component {
    static contextTypes = {
        drawer: PropTypes.object.isRequired,
    };

    render() {
        return <NavigationBar
            {...this.props}
            style={ {backgroundColor:'rgba(255,255,255,0.83)'}}
            renderBackButton={()=>
                                <TouchableOpacity key="back"  onPress={()=>Actions.pop()} style={{width:60,justifyContent:'center',alignItems:'center'}}>
                                    <Image source={require('../../images/iconBackGray.png')}/>
                                </TouchableOpacity>}
            renderLeftButton={()=>
                                <TouchableOpacity key="left"  onPress={()=>this.context.drawer.toggle()} style={{width:60,justifyContent:'center',alignItems:'center'}}>
                                    <Image source={require('../../images/iconMenu.png')}/>
                                </TouchableOpacity>}
            renderTitle={this.props.renderTitle}
            renderRightButton={()=>
                                <TouchableOpacity onPress={Actions.messages} style={{width:60,justifyContent:'center',alignItems:'center'}}>
                                    <Image source={require('../../images/iconMessage.png')}/>
                                </TouchableOpacity>}
        />;
    }

}
