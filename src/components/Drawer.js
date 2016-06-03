import React from "react";
import Drawer from 'react-native-drawer';
import SideMenu from './SideMenu';
import {DefaultRenderer} from 'react-native-router-flux';
import assert from 'assert';
export default class MyDrawer extends React.Component {
    render(){
        const profile = this.props.model && this.props.model.profile;
        const avatar = profile && profile.avatar && profile.avatar.source;
        const state = this.props.navigationState;
        let selected = state.children[state.index];
        while (selected.hasOwnProperty('children')) {
            selected = selected.children[selected.index];
        }
        const enableSwipe = selected.drawerDisableSwipe === true ? false : true;
        const children = state.children;
        return (
            //Material Design Style Drawer
            <Drawer
                ref="drawer"
                type="displace"
                content={<SideMenu profile={profile}/>}
                tapToClose={true}
                openDrawerOffset={0.2} // 20% gap on the right side of drawer
                panCloseMask={0.2}
                negotiatePan={true}
                acceptPan={enableSwipe}
                tweenHandler={(ratio) => ({
                     main: { opacity:Math.max(0.54,1-ratio) }
                })}>
                <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate}/>
            </Drawer>

        );
    }
}
