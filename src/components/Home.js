import React from 'react-native';
import Map from './Map';
const {View, Image, StyleSheet, InteractionManager, ScrollView, ListView, TouchableOpacity, Text, Dimensions} = React;
import {Actions} from 'react-native-router-flux';
import FilterBar from './FilterBar';
import FilterTitle from './FilterTitle';
import {WIDTH, k, backgroundColorDay, backgroundColorNight} from '../globals';
import ActivityCard from './ActivityCard';
import PostOptionsMenu from './PostOptionsMenu';
import NavBar from './NavBar';
import NavBarTransparent from './NavBarTransparent';
import { connect } from 'react-redux';
import { processLogin } from '../actions/xmpp/roster';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.contentOffsetY = 0;
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            isVisible: false, buttonRect: {}, displayArea: {},
            hideNavBar: false, dataSource: ds.cloneWithRows([
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
            ])
        };
    }

    showPopover(row, {nativeEvent}, button) {
        let delta = 0;
        // scroll up if element is too low
        if (nativeEvent.pageY>this.height-200*k){
            this.refs.list.scrollTo({x:0, y:this.contentOffsetY+nativeEvent.pageY-(this.height-200*k), animated:false});
        }
        InteractionManager.runAfterInteractions(() =>
            button.measure((ox, oy, width, height, px, py) => {
                console.log(ox, oy, width, height, px, py, this.contentOffsetY);
                this.setState({
                    isVisible: true,
                    item:row,
                    displayArea: {x: 13*k, y: 0, width: this.width-29*k, height: this.height},
                    buttonRect: {x: px+width/2-6*k, y: py, width: width, height: height}
                });
            }));
    }

    closePopover() {
        this.setState({isVisible: false});
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

    onLayout({nativeEvent}){
        this.width = nativeEvent.layout.width;
        this.height = nativeEvent.layout.height;
    }

    static renderNavigationBar(props){
        return props.showActivityNavBar ? <NavBar chameleon={true} navigationBarStyleDay={{backgroundColor: 'rgba(255,255,255,0.83)'}}
                                                  navigationBarStyleNight={{backgroundColor: 'rgba(63,50,77,0.83)'}}
                                                  renderTitle={()=><FilterTitle {...props} />} {...props}/> : <NavBarTransparent chameleon={true} {...props}/>
    }


    componentDidMount(){
        // login to chat
        this.props.dispatch(processLogin(this.props.profile.uuid, this.props.profile.sessionID));
    }

    componentWillReceiveProps(props){
        if (props.showActivityNavBar === false && props.initialScroll){
            this.refs.list.scrollTo({x:0, y:0, animated:true});
        }
    }


    render() {
        const isDay = this.props.location.isDay;
        const backgroundColor = isDay ? backgroundColorDay : backgroundColorNight;
        return (
            <View style={styles.container} onLayout={this.onLayout.bind(this)}>
                <Map/>
                <ListView ref="list" style={styles.container} scrollEventThrottle={1} onScroll={this.onScroll.bind(this)}
                          dataSource={this.state.dataSource}
                          renderHeader={
                            ()=><View style={{flex:1}}>
                                    <TouchableOpacity style={{height:191*k}} onPress={()=>Actions.map()}/>
                                    <View style={{position:'absolute',height:20000,right:0,left:0,backgroundColor}}/>
                                    <FilterBar isDay={isDay} hidden={this.state.hideNavBar}/>
                             </View>}
                          renderFooter={
                            ()=><View style={{flex:1}}>
                                    <View style={{position:'absolute',height:200,right:0,left:0,backgroundColor}}/>
                                    <View style={{height:20,right:0,left:0,backgroundColor}}/>
                             </View>}
                          renderRow={row => <ActivityCard key={row.id} {...row} onPostOptions={this.showPopover.bind(this, row)}/>}>
                </ListView>
                <PostOptionsMenu
                    width={this.state.displayArea.width - 15*k}
                    isVisible={this.state.isVisible}
                    fromRect={this.state.buttonRect}
                    item={this.state.item}
                    placement='bottom'
                    displayArea={this.state.displayArea}
                    onClose={this.closePopover.bind(this)}/>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, backgroundColor: 'transparent'
    }
});

export default connect(state=>state)(Home)