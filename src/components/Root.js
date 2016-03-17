import React, {Component, View} from 'react-native';
import {DefaultRenderer, Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';

class Root extends Component {
    render(){
        const selector = this.props.selector || console.error("selector should be defined");
        const selectedKey = selector(this.props);
        console.log("STATE:", selectedKey);
        const state = this.props.navigationState.children.filter(el=>el.key==selectedKey)[0];


        return <DefaultRenderer navigationState={state} />

    }
}


export default connect(state=>({profile:state.profile}))(Root)
