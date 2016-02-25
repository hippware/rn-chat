import React from 'react-native';
import Map from './Map';
const {View, Image, StyleSheet, InteractionManager, ScrollView, ListView, TouchableOpacity, Text, Dimensions} = React;
import {Actions} from 'react-native-router-flux';
import FilterBar from './FilterBar';
import FilterTitle from './FilterTitle';
import {WIDTH, k} from '../globals';
import ActivityCard from './ActivityCard';
import PostOptionsMenu from './PostOptionsMenu';

export default class Home extends React.Component {
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
        if (nativeEvent.pageY>this.height-200*k){
            console.log("NAVBAR:",this.state.hideNavBar);
            this.refs.list.scrollTo({x:0, y:this.contentOffsetY+nativeEvent.pageY-(this.height-200*k), animated:false});
        }
        InteractionManager.runAfterInteractions(() =>
            button.measure((ox, oy, width, height, px, py) => {
                console.log(ox, oy, width, height, px, py, this.contentOffsetY);
                console.log("CONTENTOFFSET:",this.contentOffsetY);
                console.log("NAVBAR:",this.state.hideNavBar);
                this.setState({
                    isVisible: true,
                    item:row,
                    displayArea: {x: 15*k, y: 0, width: this.width-30*k, height: this.height},
                    buttonRect: {x: px+width/2-6*k, y: py, width: width, height: height}
                });
            }));
        //console.log("SHOW:",button.me);
        //    this.setState({
        //        isVisible: true,
        //        placement: nativeEvent.pageY>this.height-150*k ? 'top' : 'bottom',
        //        displayArea: {x: 0, y: 0, width: this.width-15*k, height: this.height},
        //        buttonRect: {x: this.width-46*k, y: nativeEvent.pageY, width: 0, height: 10*k}
        //    });
    }

    closePopover() {
        this.setState({isVisible: false});
    }

    onScroll(event) {
        this.contentOffsetY = event.nativeEvent.contentOffset.y;
        if (event.nativeEvent.contentOffset.y > 140 * k) {
            if (!this.state.hideNavBar) {
                this.setState({hideNavBar: true});
                Actions.refresh({renderTitle: ()=><FilterTitle/>});
            }
        } else {
            if (this.state.hideNavBar) {
                this.setState({hideNavBar: false});
                Actions.refresh({renderTitle: null})
            }
        }
    }

    onLayout({nativeEvent}){
        this.width = nativeEvent.layout.width;
        this.height = nativeEvent.layout.height;
    }

    render() {
        return (
            <View style={styles.container} onLayout={this.onLayout.bind(this)}>
                <Map/>
                <ListView ref="list" style={styles.container} scrollEventThrottle={1} onScroll={this.onScroll.bind(this)}
                          dataSource={this.state.dataSource}
                          renderHeader={
                            ()=><View style={{flex:1}}>
                                    <TouchableOpacity style={{height:191*k}} onPress={()=>alert("!")}/>
                                    <View style={{position:'absolute',height:20000,right:0,left:0,backgroundColor:'rgba(241,242,244,0.85)'}}/>
                                    <FilterBar hidden={this.state.hideNavBar}/>
                             </View>}
                          renderFooter={
                            ()=><View style={{flex:1}}>
                                    <View style={{position:'absolute',height:200,right:0,left:0,backgroundColor:'rgba(241,242,244,0.85)'}}/>
                                    <View style={{height:20,right:0,left:0,backgroundColor:'rgba(241,242,244,0.85)'}}/>
                             </View>}
                          renderRow={row => <ActivityCard key={row.id} {...row} onPostOptions={this.showPopover.bind(this, row)}/>}>
                </ListView>
                <PostOptionsMenu
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
