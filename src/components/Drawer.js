import React from 'react-native';
import Drawer from 'react-native-drawer';
import SideMenu from './SideMenu';
import {DefaultRenderer} from 'react-native-router-flux';

export default class extends React.Component {
    render(){
        const children = this.props.navigationState.children;
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
                tweenHandler={(ratio) => ({
                     main: { opacity:Math.max(0.54,1-ratio) }
                })}>
                <DefaultRenderer navigationState={children[0]} />
            </Drawer>

        );
    }
}
