import React from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import Popover from 'react-native-popover';
import Separator from './Separator';
import friend from '../store/friend';
import event from '../store/event';
import profile from '../store/profile';

export default class extends React.Component {
    render(){
        const item = this.props.item;
        return <Popover {...this.props}>
            {item && <View style={{width:this.props.width}}>
                <TouchableOpacity onPress={()=>{event.hidePost(item);this.props.onClose()}}><Text style={styles.boldText}>Hide this post</Text></TouchableOpacity>
                    <Separator width={1}/>
                <TouchableOpacity onPress={()=>{profile.hidePosts(item.event.target);this.props.onClose()}}><Text style={styles.boldText}>Hide {item.event.target.displayName}'s Posts</Text></TouchableOpacity>
                    <Separator width={1}/>
                <TouchableOpacity>
                    <Text style={styles.boldText}>Block {item.event.target.displayName}</Text>
                </TouchableOpacity>
            </View>}
        </Popover>
    }
}

const styles = StyleSheet.create({
    boldText: {
        padding: 10, paddingLeft: 20,
        fontFamily: 'Roboto-Regular',
        fontSize: 15,
        color: 'rgb(63,50,77)'
    },
    text: {
        padding: 10, paddingLeft: 20,
        fontFamily: 'Roboto-Light',
        fontSize: 15,
        color: 'rgb(63,50,77)'
    },
    menu: {
        borderBottomWidth: 1, borderBottomColor: 'rgb(155,155,155)'
    }
})