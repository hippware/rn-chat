import React, {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Card from './Card';
import CardText from './CardText';
import Avatar from './Avatar';
import {k} from '../globals';
import ResizedImage from './ResizedImage';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class ActivityCard extends React.Component {
  render(){
    const isDay = this.props.isDay;
    return (
      <Card style={[{top:12*k}, this.props.style]}
            onPress={()=>this.props.onPress(this.props.item)}
            innerStyle={{paddingTop:20*k,paddingLeft:1,paddingRight:1,paddingBottom:10*k}}
            footer={
                        <View style={{position:'absolute',top:0,left:30*k,right:0,height:40*k}}>
                            {this.props.item.profile && <Avatar size={40} source={this.props.item.profile.avatar} title={this.props.item.profile.displayName}/>}
                            {this.props.onPostOptions && <TouchableOpacity ref='button' onPress={e=>this.props.onPostOptions(e, this.refs.button)}
                                style={{position:'absolute', flexDirection:'row', alignItems:'center', top:20*k, right:10*k}}>
                                <Text style={{fontFamily:'Roboto-Light',fontSize:12, color:'rgb(155,155,155)'}}>{this.props.item.created} </Text>
                                <Image source={require("../../images/iconPostOptions.png")}/>
                            </TouchableOpacity>}
                            {!this.props.onPostOptions && <View style={{position:'absolute', flexDirection:'row', alignItems:'center', top:20*k, right:5*k}}>
                                    <Text style={{fontFamily:'Roboto-Light',fontSize:12, color:'rgb(155,155,155)'}}>{this.props.item.created} </Text>
                                </View>
                                }
                        </View>
                        }>
        <Text style={{padding:15*k}}>
          {this.props.item.profile && <CardText isDay={isDay}>{this.props.item.own ? 'you' : `@${this.props.item.profile.handle}`}: </CardText>}
          <Text style={{fontFamily:'Roboto-Light',color:isDay ? 'rgb(81,67,96)' : 'white',fontSize:15}}>{this.props.item.desc}</Text>
        </Text>
        {this.props.item.image && <ResizedImage image={this.props.item.image}/>}
        {this.props.item.location && <View style={{flexDirection:'row', alignItems:'center', paddingLeft:15*k, paddingRight:15*k, paddingTop: 10}} ><Image source={require("../../images/iconLocation.png")}/><Text style={styles.smallText}> {this.props.item.location}</Text></View>}
        {this.props.item.channel && <Text style={[{paddingLeft:15*k, paddingRight:15*k}, styles.smallText]}>#{this.props.item.channel}</Text>}
        {this.props.item.priority && <View style={{position:'absolute',right:0,bottom:0,height:15,width:15}}><Image source={require("../../images/iconNewPriority.png")}/></View>}
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  smallText: {
    fontFamily:'Roboto-Regular',
    fontSize:12,
    color:'rgb(155,155,155)'
  }

});

export default connect(state=>{return {isDay:state.location.isDay}})(ActivityCard)