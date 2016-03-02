import React, {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Card from './Card';
import Avatar from './Avatar';
import {k} from '../globals';
import ResizedImage from './ResizedImage';
import { connect } from 'react-redux';

class ActivityCard extends React.Component {
    render(){
        const isDay = this.props.isDay;
        return <Card style={[{top:12*k}, this.props.style]}
                     innerStyle={{paddingTop:20*k,paddingLeft:1,paddingRight:1,paddingBottom:10*k,backgroundColor:isDay ? 'white' : 'rgb(63,50,77)'}}
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
            {this.props.channel && <Text style={[{paddingLeft:15*k, paddingRight:15*k}, styles.smallText]}>#{this.props.channel}</Text>}
            {this.props.priority && <View style={{position:'absolute',right:0,bottom:0,height:15,width:15}}><Image source={require("../../images/iconNewPriority.png")}/></View>}
        </Card>;
    }
}

const styles = StyleSheet.create({
    smallText: {
        fontFamily:'Roboto-Regular',
        fontSize:12,
        color:'rgb(155,155,155)'
    }

});

export default connect(state=>state.location)(ActivityCard)