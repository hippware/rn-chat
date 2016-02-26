import React, {Image} from 'react-native';
import {k} from '../globals';

export default class extends React.Component {
    render(){
        if (!this.props.image){
            return null;
        }
        return <Image source={this.props.image}
                      style={[{borderWidth:2*k,borderColor:'white',width:40*k,height:40*k,borderRadius:20*k},this.props.style]}/>
    }
}