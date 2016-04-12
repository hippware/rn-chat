import React from 'react-native';
import Map from './Map';
const {View, Image, StyleSheet, InteractionManager, Animated, ScrollView, TouchableOpacity, Text, Dimensions} = React;
import {Actions} from 'react-native-router-flux';
import FilterBar from './FilterBar';
import FilterTitle from './FilterTitle';
import {WIDTH, HEIGHT, k, backgroundColorDay, backgroundColorNight} from '../globals';
import CardListView from './CardListView';
import NavBar from './NavBar';
import NavBarTransparent from './NavBarTransparent';
import { connect } from 'react-redux';
import Conversations from './Conversations';
import {enableFullMap, disableFullMap} from '../actions/location';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.contentOffsetY = 0;
        this.state = {
            hideNavBar: false,
            top: new Animated.Value(0)

        };
    }

    onScroll(event) {
        // switch nav bar is scroll position is below threshold
        this.contentOffsetY = event.nativeEvent.contentOffset.y;
        if (event.nativeEvent.contentOffset.y > 140 * k) {
            if (!this.state.hideNavBar) {
                this.setState({hideNavBar: true});
                Actions.refresh({showActivityNavBar: true, initialScroll: false});
            }
        } else {
            if (this.state.hideNavBar) {
                this.setState({hideNavBar: false});
                Actions.refresh({showActivityNavBar: false, initialScroll: false})
            }
        }
    }

    static renderNavigationBar(props){
        return props.showActivityNavBar ? <NavBar chameleon={true} navigationBarStyleDay={{backgroundColor: 'rgba(255,255,255,0.83)'}}
                                                  navigationBarStyleNight={{backgroundColor: 'rgba(63,50,77,0.83)'}}
                                                  renderTitle={()=><FilterTitle {...props} />} {...props}/> : <NavBarTransparent chameleon={true} {...props}/>
    }

    componentWillReceiveProps(props){
        if (props.showActivityNavBar === false && props.initialScroll){
            this.refs.list.scrollTo({x:0, y:0, animated:true});
        }
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

    componentDidMount(){
        this.props.dispatch(disableFullMap());
    }

    enableFullMap(){
        Actions.refresh({key:'main', enableSwipe: false});
        this.props.dispatch(enableFullMap());
    }

    render() {
        console.log("RERENDER HOME");
        const isDay = this.props.isDay;
        const backgroundColor = isDay ? backgroundColorDay : backgroundColorNight;
        return (
            <View style={{flex:1}}>
                <Map/>
                <Animated.View style={{flex:1, transform: [{translateY:this.state.top}]}}>
                    <Conversations ref="list" name="list" onScroll={this.onScroll.bind(this)}
                                   renderHeader={
                            ()=><View style={{flex:1}}>
                                    <TouchableOpacity style={{height:191*k}} onPress={this.enableFullMap.bind(this)}/>
                                    <View style={{position:'absolute',height:20000,right:0,left:0,backgroundColor}}/>
                                    <FilterBar isDay={isDay} hidden={this.state.hideNavBar}/>
                             </View>}>
                    </Conversations>
                </Animated.View>
            </View>
        );
    }
}
export default connect(state=>({isDay:state.location.isDay, fullMap:state.location.fullMap}))(Home)
