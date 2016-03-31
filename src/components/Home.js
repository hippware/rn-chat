import React from 'react-native';
import Map from './Map';
const {View, Image, StyleSheet, InteractionManager, ScrollView, TouchableOpacity, Text, Dimensions} = React;
import {Actions} from 'react-native-router-flux';
import FilterBar from './FilterBar';
import FilterTitle from './FilterTitle';
import {WIDTH, k, backgroundColorDay, backgroundColorNight} from '../globals';
import CardListView from './CardListView';
import NavBar from './NavBar';
import NavBarTransparent from './NavBarTransparent';
import { connect } from 'react-redux';
import { processLogin } from '../actions/xmpp/roster';
import { processRequestArchive } from '../actions/xmpp/xmpp';
import { processProfileRequest } from '../actions/xmpp/profile';
import {logoutRequest} from '../actions/profile';
import Conversations from './Conversations';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.contentOffsetY = 0;
        this.list = [
            {
                id:1,
                avatar: require("../../images/iconAvatar.png"),
                created: '10:12 AM',
                from: 'Sarah',
                channel: 'ThursdayPickupSoccer',
                desc: '@Sarah added you to her channel Thursday Pickup Soccer'
            },
            {
                id:2,
                avatar: require("../../images/iconAvatar2@2x.png"),
                created: '10:32 AM',
                from: 'Kogi',
                priority: 1,
                location: '290 N Hill Ave, Pasadena, CA 91106',
                desc: 'Pasadena PCC Lunch Run: 11:30-2:30 PM. Come and get it people!'
            },
            {
                id:3,
                avatar: require("../../images/iconAvatar.png"),
                created: '11:12 AM',
                from: 'Janice',
                image: {uri:'http://madebysofa.com/static/archive/img/blog/sofa_icon/final_zowieso.png'},
                //image: {uri: 'https://cdn0.iconfinder.com/data/icons/furnitures-icons-rounded/110/Sofa-3-512.png'},
                desc: 'What about this one? $399 at the thrift store on Melrose'
            },
        ];

        this.state = {
            hideNavBar: false
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


    componentDidMount(){
        // login to chat
//        this.props.dispatch(processLogin("user1", "user1"));
        this.props.dispatch(processLogin(this.props.profile.uuid, this.props.profile.sessionID));

    }

    componentWillReceiveProps(props){
        if (props.showActivityNavBar === false && props.initialScroll){
            this.refs.list.scrollTo({x:0, y:0, animated:true});
        }
        if (props.xmpp.authfail){
            this.props.dispatch(logoutRequest());
        }
        // request archive
        if (props.xmpp.connected && !props.xmpp.archiveRequested){
            props.dispatch(processRequestArchive());
        }
        //console.log("CONV:", props.conversation);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.location.isDay != nextProps.location.isDay || this.state.hideNavBar != nextState.hideNavBar;
    }

    render() {
        console.log("RERENDER HOME");
        const isDay = this.props.location.isDay;
        const backgroundColor = isDay ? backgroundColorDay : backgroundColorNight;
        return (
            <Conversations ref="list" name="list" onScroll={this.onScroll.bind(this)}
                          renderHeader={
                            ()=><View style={{flex:1}}>
                                    <TouchableOpacity style={{height:191*k}} onPress={()=>Actions.map()}/>
                                    <View style={{position:'absolute',height:20000,right:0,left:0,backgroundColor}}/>
                                    <FilterBar isDay={isDay} hidden={this.state.hideNavBar}/>
                             </View>}>
                    <Map/>
                </Conversations>
        );
    }
}

export default connect(state=>state)(Home)