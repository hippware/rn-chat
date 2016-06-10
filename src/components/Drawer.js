import React from "react";
import {StyleSheet} from 'react-native';
import Drawer from 'react-native-drawer';
import SideMenu from './SideMenu';
import {DefaultRenderer,Actions} from 'react-native-router-flux';
import assert from 'assert';

export default class MyDrawer extends React.Component {
    render(){
        const profile = this.props.model && this.props.model.profile;
        const avatar = profile && profile.avatar && profile.avatar.source;
        const state = this.props.navigationState;
        const SideMenu = this.props.SideMenu;
        assert(SideMenu, "SideMenu component is not defined");
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
                content={<SideMenu {...this.props} />}
                side={this.props.side || 'left'}
                styles={drawerStyles}
                open={!!state.open}
                tapToClose={true}
                onClose={()=>Actions.refresh({key: state.key, open:false})}
                openDrawerOffset={this.props.openDrawerOffset || 0.2} // 20% gap on the right side of drawer
                panCloseMask={this.props.openDrawerOffset || 0.2}
                negotiatePan={true}
                acceptPan={enableSwipe}
                tweenHandler={this.props.tweenHandler}
            >
                <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate}/>
            </Drawer>

        );
    }
}


const drawerStyles = {
    drawer: { borderWidth: 0},
    main: {paddingLeft: 0},
};