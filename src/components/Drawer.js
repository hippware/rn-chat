import React from 'react-native';
import Drawer from 'react-native-drawer';
import SideMenu from './SideMenu';
import {Route,Router} from 'react-native-router-flux';

export default class extends React.Component {
    render(){
        return (
            //Material Design Style Drawer
            <Drawer
                ref="drawer"
                type="displace"
                content={<SideMenu />}
                tapToClose={true}
                openDrawerOffset={0.2} // 20% gap on the right side of drawer
                panCloseMask={0.2}
                negotiatePan={true}
                styles={{main: {shadowColor: "#000000", shadowOpacity: 0.4, shadowRadius: 3}}}
                tweenHandler={(ratio) => ({
                     main: { opacity:Math.max(0.54,1-ratio) }
                })}
            >
                {React.Children.map(this.props.children, c => React.cloneElement(c, {route: this.props.route}))}
            </Drawer>

        );
    }
}

Router.contextTypes = {drawer: React.PropTypes.object};
Route.contextTypes = {drawer: React.PropTypes.object};
