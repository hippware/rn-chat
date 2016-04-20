import React, {TouchableOpacity, ListView, View, Text, Component} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {k} from '../globals';
import { connect } from 'react-redux';
import moment from 'moment'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class FriendsCard extends React.Component {
    render(){
        const isDay = this.props.isDay;
        return <Card style={[{top:12*k}, this.props.style]}
                     innerStyle={{paddingTop:20*k,paddingLeft:1,paddingRight:1,paddingBottom:10*k}}
                     footer={
                        <View style={{position:'absolute',top:0,left:30*k,right:0,height:40*k}}>
                            <Avatar image={this.props.avatar}/>
                            {this.props.onPostOptions && <TouchableOpacity ref='button' onPress={e=>this.props.onPostOptions(e, this.refs.button)}
                                style={{position:'absolute', flexDirection:'row', alignItems:'center', top:20*k, right:10*k}}>
                                <Text style={{fontFamily:'Roboto-Light',fontSize:12, color:'rgb(155,155,155)'}}>{this.props.created} </Text>
                                <Image source={require("../../images/iconPostOptions.png")}/>
                            </TouchableOpacity>}
                            {!this.props.onPostOptions && <View style={{position:'absolute', flexDirection:'row', alignItems:'center', top:20*k, right:5*k}}>
                                    <Text style={{fontFamily:'Roboto-Light',fontSize:12, color:'rgb(155,155,155)'}}>{this.props.created} </Text>
                                </View>
                                }
                        </View>
                        }>
            <Text style={{padding:15*k}}>
                {this.props.from && <Text style={{fontFamily:'Roboto-Regular',color: isDay ? 'rgb(81,67,96)' : 'white',fontSize:15}}>@{this.props.from}: </Text>}
                <Text style={{fontFamily:'Roboto-Light',color:isDay ? 'rgb(81,67,96)' : 'white',fontSize:15}}>{this.props.desc}</Text>
            </Text>
            {this.props.image && <ResizedImage image={this.props.image}/>}
            {this.props.location && <View style={{flexDirection:'row', alignItems:'center', paddingLeft:15*k, paddingRight:15*k, paddingTop: 10}} ><Image source={require("../../images/iconLocation.png")}/><Text style={styles.smallText}> {this.props.location}</Text></View>}
            {this.props.priority && <View style={{position:'absolute',right:0,bottom:0,height:15,width:15}}><Image source={require("../../images/iconNewPriority.png")}/></View>}
        </Card>;
    }
}

class FriendsList extends Component {
    constructor(props){
        super(props);
        this._handleProps = this._handleProps.bind(this);
        this.state = {displayArea: {}, buttonRect: {}, isVisible:false, ...this._handleProps(this.props)};

    }

    _handleProps(props){
        return  {dataSource: ds.cloneWithRows(props.list)};
    }

    componentWillReceiveProps(props) {
        if (props.showActivityNavBar === false && props.initialScroll) {
            this.refs.list.scrollTo({x: 0, y: 0, animated: true});
        }

        this.setState({...this._handleProps(props)});
    }

    render(){
        let list = this.props.list.map(conv=>{return {id:conv.username, desc:conv.lastMsg, priority:conv.unread > 0, from:conv.profile.handle, avatar:conv.profile.avatarPath, created:moment(conv.time).calendar()}});
        return   <View style={styles.container} onLayout={this.onLayout.bind(this)}>
            {this.props.children}
            <ListView ref="list" style={styles.container} scrollEventThrottle={1} {...this.props}
                      dataSource={this.state.dataSource}
                      renderRow={row => <FriendsCard key={row.id} {...row} />}>
            </ListView>

        </View>
    }
}
export default connect(state=>{return {list:state.roster.roster}})(FriendsList)