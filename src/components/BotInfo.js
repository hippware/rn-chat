import React from "react";
import {View, Slider, Alert, Image, StyleSheet, TextInput, ListView, InteractionManager, Animated, ScrollView, TouchableOpacity, Text, Dimensions}
    from "react-native"

import {width, k} from './Global';
import {backgroundColorDay, backgroundColorNight, navBarTextColorDay, navBarTextColorNight} from '../globals';
import autobind from 'autobind-decorator';
import {observer} from 'mobx-react/native';
import {when, computed, autorun, observable} from 'mobx';
import Card from './Card';
import Cell from './Cell';
import Separator from './Separator';
import location from '../store/locationStore';
import Header from './Header';
import Bot, {LOCATION} from '../model/Bot';
import statem from '../../gen/state';
import botFactory from '../factory/botFactory';
import bot from '../store/botStore';
import SaveButton from './SaveButton';
import Screen from './Screen';
import {Actions} from 'react-native-router-native';
import VisibilitySwitch from './BotVisibilitySwitch';
import BotInfoEditMenu from './BotInfoEditMenu';
import Button from './Button';
@autobind
@observer
export default class LocationBot extends React.Component {
    @computed get hasPhoto() {return bot.bot && bot.bot.images.length > 0 };
    @computed get hasNote() {return bot.bot && bot.bot.description && bot.bot.description.length > 0 };
    @computed get collapsedHeight() {return 52*3 + (this.hasNote ? 52 : 0) + (this.hasPhoto ? 52 : 0)};

    constructor(props){
        super(props);
        this.state = {isFirstScreen : false, isPublic: true};
    }

    next(){
        if (bot.bot.title.length > 0){
            if (this.state.isFirstScreen) {
                this.setState({isFirstScreen: false});
            }
            this.refs.title.blur();
        }
    }

    componentWillMount(){
        if (this.props.item){
            bot.bot = botFactory.create({id: this.props.item});
        }
        if (!bot.bot) {
            bot.create({type: LOCATION});

            when(() => location.location, () => {
                bot.location = location.location;
            });

        } else {
            if (bot.bot.location){
                this.latitude = bot.bot.location.latitude;
                this.longitude = bot.bot.location.longitude;
            }
        }
        if (bot.bot.isNew) {
            this.setState({isFirstScreen : true});
        }
    }

    removeBot(){
        Alert.alert(null, 'Are you sure you want to delete this bot?',[
            {text:'Cancel', style:'cancel'},
            {text:'Delete', style:'destructive', onPress:()=>{bot.remove(bot.bot.id, bot.bot.server); Actions.pop();Actions.pop({animated: false})}}
        ]);
    }

    async save(){
        if (!bot.bot.title){
            alert('Title cannot be empty');
            this.refs.title.focus();
            return;
        }
        try {
            this.setState({isLoading: true});

            const isNew = bot.bot.isNew;
            await bot.save();

            if (isNew){
                Actions.pop({animated:false});
                Actions.pop();
                setTimeout(()=>statem.botsScene.botDetails({item: bot.bot.id}));
            } else {
                Actions.pop();
            }
        } catch (e){
            alert(e);
        } finally {
            this.setState({isLoading: false});
        }
    }

    render(){
        if (!bot.bot){
            console.log("NO BOT IS DEFINED");
            return <Screen isDay={location.isDay}/>;
        }
        const address = `${bot.bot.isCurrent ? 'Current - ' : '' }${bot.bot.address}`;
        const backgroundColor = location.isDay ? backgroundColorDay : backgroundColorNight;
        const isDay = location.isDay;
        const isEnabled = bot.bot.title.length > 0 && bot.bot.location && bot.bot.address;
        return (
            <Screen isDay={location.isDay}>
                <ScrollView>
                    <View style={{height:275*k, alignItems:'center', justifyContent:'center',
                        backgroundColor:this.state.isFirstScreen ? 'rgb(242,243,245)' : 'rgb(112,176,225)'}}>
                        <TouchableOpacity onPress={this.handleImagePress}>
                            <View style={{alignItems:'center'}}>
                                <Image source={this.state.isFirstScreen ? require('../../images/attachPhotoGray.png') : require('../../images/iconAddcover.png')}/>
                                <Text style={{fontFamily:'Roboto-Regular', fontSize:14, color:this.state.isFirstScreen ? 'rgb(211,211,211)' : 'white'}}>Add Cover Photo</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Card isDay={location.isDay} style={{paddingLeft:0, paddingRight:0, paddingTop:0}}>
                            <View style={{padding: 15*k}}>
                                <Text style={{fontFamily:'Roboto-Medium', fontSize:16,color:isDay ? navBarTextColorDay : navBarTextColorNight }}>Bot Details</Text>
                            </View>
                            <Separator width={1}/>
                            <Cell style={{padding:10*k}} image={require('../../images/iconBotTitle.png')} imageStyle={{paddingLeft:14*k}}
                                  textStyle={{fontFamily:'Roboto-Light'}} onRemove={()=>bot.bot.title = ''}>
                                <View style={{flex:1,paddingRight:10*k, alignItems:'center', justifyContent:'center'}}>
                                    <TextInput autoFocus={!this.props.edit}
                                               placeholder="Name your bot" ref="title" placeholderTextColor='rgb(211,211,211)' value={bot.bot.title}
                                               onChangeText={text=>bot.bot.title = text}
                                               returnKeyType={this.state.isFirstScreen ? 'next' : 'done' }
                                               onSubmitEditing={this.next}
                                               blurOnSubmit={false}
                                               maxLength={60}
                                               style={{height:25*k, fontFamily:'Roboto-Regular', fontSize:15,
                                                   color:location.isDay? navBarTextColorDay : navBarTextColorNight}}/>
                                </View></Cell>
                            <View><Separator width={1}/>
                                <Cell imageStyle={{paddingLeft:8*k}} onPress={()=>statem.handle("setAddress", {bot: bot.bot})} image={require('../../images/iconBotLocation2.png')}>{address}</Cell>
                            </View>
                        </Card>
                        {!this.state.isFirstScreen && <View>
                            <BotInfoEditMenu bot={bot.bot}/>
                            <VisibilitySwitch bot={bot.bot}/>
                            <View style={{height:100}}>
                                {bot.bot.isNew && <Button onPress={()=>{Actions.pop({animated:false});Actions.pop()}} textStyle={{color:'rgb(254,92,108)'}} style={{bottom:0, right:0, left:0, borderRadius:0, position:'relative', backgroundColor:'transparent'}}>Cancel Bot</Button>}
                                {!bot.bot.isNew && <Button onPress={this.removeBot} textStyle={{color:'rgb(254,92,108)'}} style={{bottom:0, right:0, left:0, borderRadius:0, position:'relative', backgroundColor:'transparent'}}>Delete Bot</Button>}
                            </View>
                        </View>}
                    </View>
                </ScrollView>
                {!this.state.isFirstScreen && <Button style={{bottom:0, right:0, left:0, borderRadius:0}} isLoading={this.state.isLoading} isDisabled={!isEnabled} onPress={this.save}>{bot.bot.isNew ? 'Create Bot' : 'Save Changes'}</Button>}
                {this.state.isFirstScreen && <SaveButton title="Next" active={isEnabled} onSave={this.next}/>}
            </Screen>

        );
    }
}
