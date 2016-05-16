import React from "react";
import Map from './Map';
const {View, Image, StyleSheet, InteractionManager, Animated, ScrollView, TouchableOpacity, Text, Dimensions} = React;
import {Actions} from 'react-native-router-flux';
import FilterBar from './FilterBar';
import FilterTitle from './FilterTitle';
import {WIDTH, HEIGHT, k, backgroundColorDay, backgroundColorNight} from '../globals';
import CardListView from './CardListView';
import NavBarCloseButton from './NavBarCloseButton';
import { connect } from 'react-redux';
import Conversations from './Conversations';
import {filterActivities} from '../actions';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.contentOffsetY = 0;
        this.state = {
            top: new Animated.Value(0)

        };
    }

    onScroll(event) {
        // switch nav bar is scroll position is below threshold
        this.contentOffsetY = event.nativeEvent.contentOffset.y;
        if (event.nativeEvent.contentOffset.y > 140 * k) {
            if (!this.props.hideActivityBar) {
                Actions.fullActivities();
            }
        } else {
            if (this.props.hideActivityBar) {
                Actions.restoreHome();
            }
        }
    }

    componentWillReceiveProps(props){
        console.log("RECEIVE PROPS", props.fullMap, this.state.fullMap);
        if (props.fullMap && !this.state.fullMap){
            this.setState({fullMap: true});
            // animate
            Animated.timing(          // Uses easing functions
              this.state.top,    // The value to drive
              {toValue: HEIGHT}            // Configuration
            ).start()
        }
        if (!props.fullMap && this.state.fullMap){
            this.setState({fullMap: false});
            // animate
            Animated.timing(          // Uses easing functions
              this.state.top,    // The value to drive
              {toValue: 0}            // Configuration
            ).start()
        }
    }

    render() {
        const isDay = this.props.isDay;
        const backgroundColor = isDay ? backgroundColorDay : backgroundColorNight;
        return (
          <View style={{flex:1}}>
              <Map fullMap={this.props.fullMap}/>
              <Animated.View style={{flex:1, transform: [{translateY:this.state.top}]}}>
                  <Conversations ref="list" initialScroll={this.props.initialScroll}
                                 name="list" onScroll={this.onScroll.bind(this)}
                                 renderHeader={
                            ()=><View style={{flex:1}}>
                                    <TouchableOpacity style={{height:191*k}} onPress={Actions.fullMap}/>
                                    <View style={{position:'absolute',height:2000,right:0,left:0,backgroundColor}}/>
                                    <FilterBar style={{paddingLeft:15*k, paddingRight:15*k}}
                                        hidden={this.props.hideActivityBar}
                                        onSelect={data=>this.props.dispatch(filterActivities(data.key))}
                                        selected={this.props.activity.mode}>
                                        <Text key="all">All</Text>
                                        <Text key="friends">Friends</Text>
                                        <Text key="nearby">Nearby</Text>
                                        <Image key="search" onSelect={()=>console.log("Search")} source={require('../../images/iconSearchHome.png')}/>

                                    </FilterBar>
                             </View>}>
                  </Conversations>
              </Animated.View>
          </View>
        );
    }
}
export default connect(state=>({isDay:state.location.isDay,activity:state.activity}))(Home)
