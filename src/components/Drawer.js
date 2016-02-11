import React from 'react-native';
import Drawer from 'react-native-drawer';
import SideMenu from './SideMenu';

export default class extends React.Component {
    render(){
        return (
            //Material Design Style Drawer
            <Drawer
                type="displace"
                content={<SideMenu />}
                tapToClose={true}
                openDrawerOffset={0.2} // 20% gap on the right side of drawer
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                tweenHandler={(ratio) => ({
                    main: { opacity:0.54 }
                })}
            >
                {this.props.children}
            </Drawer>

        );
    }
}