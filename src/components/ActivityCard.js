import React, {Text, View, StyleSheet} from 'react-native';
import Card from './Card';
import Avatar from './Avatar';
import {k} from '../globals';

export default class extends React.Component {
    render(){
        return <Card style={{top:12*k}} innerStyle={{paddingTop:40*k}}
                     footer={
                        <View style={{position:'absolute',top:0,left:30*k,right:0,height:40*k}}>
                            <Avatar image={this.props.avatar}/>
                            <Text style={{position:'absolute', fontFamily:'Roboto-Light',fontSize:12, color:'rgb(155,155,155)', top:20*k, right:16*k}}>{this.props.created}</Text>
                        </View>
                        }>
            <Text>
                {this.props.from && <Text style={{fontFamily:'Roboto-Regular',color:'rgb(63,50,77)',fontSize:15}}>@{this.props.from}: </Text>}
                <Text style={{fontFamily:'Roboto-Regular',color:'rgb(63,50,77)',fontSize:15}}>{this.props.desc}</Text>
            </Text>
            {this.props.location && <Text style={styles.smallText}>{this.props.location}</Text>}
            {this.props.channel && <Text style={styles.smallText}>#{this.props.channel}</Text>}
        </Card>;
    }
}

const styles = StyleSheet.create({
    smallText: {
        paddingTop:10,
        fontFamily:'Roboto-Regular',
        fontSize:12,
        color:'rgb(155,155,155)'
    }

});