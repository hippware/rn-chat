import React from 'react';
import {
  requireNativeComponent,
  Component,
  PropTypes,
  StyleSheet,
  View
} from 'react-native';

import {DefaultRenderer} from 'react-native-router-flux';

class CubeBarIOS extends React.Component {
    render(){
        const state = this.props.navigationState;
        return <RNCubeBar key={state.key} style={[styles.container,this.props.style]} swipeEnabled={false} currentIndex={state.index}>
            {state.children.map(el=><View key={el.key+"_wrapper"} style={styles.container}>
                <DefaultRenderer navigationState={el} onNavigate={this.props.onNavigate}/>
            </View>)}
        </RNCubeBar>;
    }

}
CubeBarIOS.propTypes = {
    ...View.propTypes,
    currentIndex:React.PropTypes.any,
    swipeEnabled:React.PropTypes.bool
};

const RNCubeBar = requireNativeComponent('RNCube', CubeBarIOS);
const styles = StyleSheet.create({
    container: {position:'absolute',left:0,right:0,top:0,bottom:0}
});
export default CubeBarIOS;
