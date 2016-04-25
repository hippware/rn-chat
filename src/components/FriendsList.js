import React, {TouchableOpacity, Image, StyleSheet, ListView, View, Text, Component} from 'react-native';
import * as actions from '../actions';
import {Actions} from 'react-native-router-flux';
import {k} from '../globals';
import { connect } from 'react-redux';
import moment from 'moment'
import Card from './Card';
import Avatar from './Avatar';
import Screen from './Screen';
import CardText from './CardText';
import FilterBar from './FilterBar';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class FriendsCard extends React.Component {
    render(){
        const isDay = this.props.isDay;
        return <TouchableOpacity onPress={()=>Actions.profileDetail({username:this.props.username, title:this.props.displayName})}>
            <Card style={this.props.style}
                     innerStyle={{paddingTop:5*k,paddingLeft:10*k,paddingRight:10*k,paddingBottom:5*k}}>
                <View style={{flex:1, flexDirection:'row'}}>
                    <View style={{padding:5*k}}><Avatar image={this.props.avatar} displayName={this.props.displayName} borderWidth={0}/></View>
                    <View style={{flex:1, padding:10*k}}><CardText isDay={this.props.isDay}>{this.props.displayName} </CardText></View>
                </View>
                {this.props.isFavorite && <View style={{position:'absolute',right:0,bottom:0,height:28,width:28}}><Image source={require("../../images/iconFavOn.png")}/></View>}
                {this.props.isFavorite && <View style={{position:'absolute',backgroundColor:'transparent',right:0,bottom:0,height:15,width:15}}><Text style={{color:'white'}}>★</Text></View>}
            </Card>

        </TouchableOpacity>;
    }
}

class FriendsList extends Component {
    constructor(props){
        super(props);
        this._handleProps = this._handleProps.bind(this);
        this.state = {...this._handleProps(this.props)};

    }

    _handleProps(props){
        let list = props.list.map(conv=>({id:conv.username, ...conv}));
        return  {dataSource: ds.cloneWithRows(list)};
    }

    componentWillReceiveProps(props) {
        this.setState({...this._handleProps(props)});
    }

    render(){
        return <Screen>
            <FilterBar style={{paddingLeft:15*k, paddingRight:15*k}} onSelect={data=>this.props.dispatch({type:data.key})} selected={this.props.filter}>
                <Text key={actions.SET_ROSTER_FILTER_ALL}>All</Text>
                <Text key={actions.SET_ROSTER_FILTER_FAVS}>Faves★</Text>
                <Text key={actions.SET_ROSTER_FILTER_NEARBY}>Nearby</Text>
                <Image key="search" onSelect={()=>console.log("SEARCH")} source={require("../../images/iconFriendsSearch.png")}></Image>
                <Image key="add" onSelect={()=>Actions.addFriends()}  source={require("../../images/iconAddFriend.png")}></Image>
            </FilterBar>
                    <ListView ref="list" style={{flex:1}} scrollEventThrottle={1} {...this.props}
                      dataSource={this.state.dataSource}
                      renderRow={row => <FriendsCard key={row.id} dispatch={this.props.dispatch} isDay={this.props.isDay} {...row} />}>
                    </ListView>
        </Screen>;
    }
}


export default connect(state=>({...state.roster, isDay:state.location.isDay}))(FriendsList)
