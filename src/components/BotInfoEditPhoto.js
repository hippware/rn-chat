import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import autobind from 'autobind-decorator';
import {observer} from 'mobx-react/native';
import Screen from './Screen';
import SaveButton from './SaveButton';
import Button from './Button';
import {k, width, height} from './Global';
import {launchCamera, launchImageLibrary} from './ImagePicker';
import {Actions} from 'react-native-router-native';
import botStore from '../store/botStore';

@autobind
@observer
export default class extends React.Component {
    constructor(props){
        super(props);
        this.state = {width : props.width, height: props.height, source: props.source, fileSize: props.fileSize};
    }

    retakePhoto(){
        launchCamera((source, response) => {
            this.setState({source, width:response.width, height:response.height, fileSize:response.fileSize});
        })
    }

    save() {
        Actions.pop();
        botStore.publishImage(this.state);
    }

    render(){
        return <Screen>
            <View style={{flex:1, justifyContent:'center'}}>
                <Image aspectRatio={this.state.width / this.state.height} style={{width}} source={this.state.source}/>
            </View>
            <SaveButton color='rgb(155,155,155)' title='Retake' onSave={this.retakePhoto}/>
            <Button style={{bottom: 0, right: 0, left: 0, borderRadius: 0}}
                    onPress={this.save}>Save</Button>
        </Screen>;
    }
}