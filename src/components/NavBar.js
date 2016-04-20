import React, {Image, View, PropTypes,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import NavigationBar from './NavigationBar';
import { connect } from 'react-redux';
import {navBarTextColorNight, navBarTextColorDay, navBarBackgroundColorDay, navBarBackgroundColorNight} from '../globals';
import NavBarMenuButton from './NavBarMenuButton';
import NavBarCloseButton from './NavBarCloseButton';
import NavBarMessageButton from './NavBarMessageButton';
import {enableFullMap, disableFullMap} from '../actions';

class NavBar extends React.Component {
    static contextTypes = {
        drawer: PropTypes.object.isRequired,
    };

    disableFullMap(){
        Actions.refresh({key:'main', enableSwipe: true});
        this.props.dispatch(disableFullMap());
    }

    renderLeftButton(){
        const state = this.props.navigationState;
        const Button = state.children[state.index].sceneKey === 'home' && this.props.fullMap ? NavBarCloseButton : NavBarMenuButton;
        return <Button kind="left" isDay={this.props.isDay} onClose={this.disableFullMap.bind(this)} />;
    }

    renderRightButton(){
        const Button = this.props.navigationState.sceneKey === 'messaging' ? NavBarCloseButton : NavBarMessageButton;
        return <Button kind="right" isDay={this.props.isDay} onClose={Actions.core} />;
    }



    render() {
        const isDay = this.props.isDay;
        console.log("IS DAY:", isDay);
//        const isDay = this.props.chameleon? this.props.location.isDay : true;
        return <NavigationBar
            {...this.props}
            navBarHeader={this.props.navBarHeader || (this.props.navBarHeaderDay && this.props.navBarHeaderNight && (isDay ? this.props.navBarHeaderDay : this.props.navBarHeaderNight))}
            style={ [{backgroundColor:isDay ? navBarBackgroundColorDay : navBarBackgroundColorNight}, this.props.navigationBarStyle, (isDay? this.props.navigationBarStyleDay : this.props.navigationBarStyleNight)]}
            renderBackButton={()=>
                                <TouchableOpacity key="back" accessibilityLabel="backNavButton" onPress={()=>Actions.pop()} style={{width:60,justifyContent:'center',alignItems:'center'}}>
                                    <Image source={require('../../images/iconBackGray.png')}/>
                                </TouchableOpacity>}
            renderLeftButton={this.renderLeftButton.bind(this)}
            textStyle={{fontFamily:'Roboto-Regular',color:isDay ? navBarTextColorDay : navBarTextColorNight, fontSize:18}}
            renderRightButton={this.renderRightButton.bind(this)}/>
    }

}



export default connect(state=>({isDay:state.location.isDay, fullMap:state.location.fullMap}))(NavBar)