import React from "react";
import {
    View,
    Slider,
    Alert,
    Image,
    StyleSheet,
    TextInput,
    ListView,
    InteractionManager,
    Animated,
    ScrollView,
    TouchableOpacity,
    Text,
    Dimensions
}
    from "react-native"

import {width, k} from './Global';
import {backgroundColorDay, backgroundColorNight, navBarTextColorDay, navBarTextColorNight} from '../globals';
import autobind from 'autobind-decorator';
import {observer} from 'mobx-react/native';
import {when, computed, autorun, observable} from 'mobx';
import Card from './Card';
import location from '../store/locationStore';
import Header from './Header';
import Cell from './Cell';
import Bot from '../model/Bot';
import statem from '../../gen/state';
import {Actions} from 'react-native-router-native';
import showImagePicker from './ImagePicker';
import botStore from '../store/botStore';

const MenuButton = props => <TouchableOpacity
    style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} {...props}>
    <Image source={props.icon} style={props.imageStyle}/>
    <Text style={[{
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: props.color
    }, props.textStyle]}>{props.children}</Text>
    {props.saving && <Text style={[{
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: 'rgb(253,95,108)'
    }, props.textStyle]}>Saving...</Text>}
</TouchableOpacity>;

const Separator = props => <View style={{width: 1, backgroundColor: 'rgba(155,155,155,0.15)'}}/>;
@autobind
@observer
export default class BotInfoEditMenu extends React.Component {

    addPhoto(){
        showImagePicker(null, (source, response) => {
            botStore.publishImage({...response, source});
        });
    }
    render() {
        const bot: Bot = this.props.bot;
        const color = location.isDay ? 'rgb(63,50,77)' : 'white';
        return <Card isDay={location.isDay} style={{paddingLeft: 0, paddingRight: 0, paddingTop: 0}}>
            <View style={{flexDirection: 'row', height: 100}}>
                {!bot.description && <MenuButton color='rgb(253,95,108)' icon={require('../../images/iconAddnote.png')}
                                                 onPress={() => statem.handle("setNote", {bot})}
                                                 saving={bot.noteSaving}>Add Note</MenuButton>}
                {!!bot.description && <MenuButton color={color} icon={require('../../images/iconAddnoteGray.png')}
                                                  onPress={() => statem.handle("setNote", {bot: bot.bot})}
                                                  saving={bot.noteSaving}>Note</MenuButton>}
                <Separator/>
                {!bot.imagesCount && <MenuButton color='rgb(253,95,108)' icon={require('../../images/iconAddphoto.png')}
                                                 onPress={this.addPhoto}
                                                 saving={bot.imageSaving}>Add
                    Photo</MenuButton>}
                {bot.imagesCount > 0 && <MenuButton color={color} icon={require('../../images/iconAddphotoGrey.png')}
                                                    onPress={() => statem.handle("editPhotos", {bot})}
                                                    saving={bot.imageSaving}>Photos
                    ({bot.imagesCount})</MenuButton>}
                <Separator/>
                <MenuButton color='rgba(253,95,108,0.3)' imageStyle={{opacity: 0.3}}
                            icon={require('../../images/iconAddtag.png')}>Add Tags</MenuButton>

            </View>
        </Card>

    }
}