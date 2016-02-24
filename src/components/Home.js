import React from 'react-native';
import Map from './Map';
const {View, Image, StyleSheet, ScrollView, ListView, TouchableOpacity, Text, Dimensions} = React;
import {Actions} from 'react-native-router-flux';
import FilterBar from './FilterBar';
import FilterTitle from './FilterTitle';
import {WIDTH, k} from '../globals';
import ActivityCard from './ActivityCard';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            hideNavBar: false, dataSource: ds.cloneWithRows([
                {
                    avatar: require("../../images/test2.png"),
                    created: '10:12 AM',
                    channel: 'ThursdayPickupSoccer',
                    desc: '@Sarah added you to her channel Thursday Pickup Soccer'
                },
                {
                    avatar: require("../../images/test2.png"),
                    created: '10:12 AM',
                    from: 'Kogi',
                    location: '290 N Hill Ave, Pasadena, CA 91106',
                    desc: 'Pasadena PCC Lunch Run: 11:30-2:30 PM. Come and get it people!'
                },
                {
                    avatar: require("../../images/test2.png"),
                    created: '10:12 AM',
                    desc: '@Kogi: Pasadena PCC Lunch Run: 11:30-2:30 PM. Come and get it people!'
                },
                {
                    avatar: require("../../images/test2.png"),
                    created: '10:12 AM',
                    desc: '@Kogi: Pasadena PCC Lunch Run: 11:30-2:30 PM. Come and get it people!'
                },
                {
                    avatar: require("../../images/test2.png"),
                    created: '10:12 AM',
                    desc: '@Kogi: Pasadena PCC Lunch Run: 11:30-2:30 PM. Come and get it people!'
                },
                {
                    avatar: require("../../images/test2.png"),
                    created: '10:12 AM',
                    desc: '@Kogi: Pasadena PCC Lunch Run: 11:30-2:30 PM. Come and get it people!'
                },
            ])
        };
    }

    onScroll(event) {
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

    render() {
        return (
            <View style={styles.container}>
                <Map/>
                <ListView style={styles.container} scrollEventThrottle={1} onScroll={this.onScroll.bind(this)}
                          dataSource={this.state.dataSource}
                          renderHeader={
                            ()=><View>
                                    <TouchableOpacity style={{height:191*k}} onPress={()=>alert("!")}/>
                                    <View style={{position:'absolute',height:1000,right:0,left:0,backgroundColor:'rgba(241,242,244,0.85)'}}/>
                                    <FilterBar hidden={this.state.hideNavBar}/>
                             </View>}
                          renderRow={row => <ActivityCard {...row}/>}>
                </ListView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, backgroundColor: 'transparent'
    }
});
