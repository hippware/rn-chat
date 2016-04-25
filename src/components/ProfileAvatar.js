import React, {Component, View} from 'react-native';
import Avatar from './Avatar';
export default class extends Component {
    render(){
        return <View style={{alignItems:'center'}}>
            <Avatar size={65} image={this.props.profile.avatar} displayName={this.props.profile.displayName}/>
        </View>
    }
}