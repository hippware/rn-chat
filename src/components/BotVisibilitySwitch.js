import React from "react";
import {
    View,
    Image,
    TouchableOpacity,
    Text
} from "react-native"

import {k} from './Global';
import autobind from 'autobind-decorator';
import {observer} from 'mobx-react/native';
import {when, computed, autorun, observable} from 'mobx';
import Card from './Card';
import Separator from './Separator';
import location from '../store/locationStore';
import Header from './Header';
import Switch from './Switch';
import Bot from '../model/Bot';
import Cell from './Cell';
import statem from '../../gen/state';

@autobind
@observer
export default class VisibilitySwitch extends React.Component {
    render() {
        const bot: Bot = this.props.bot;
        const color = location.isDay ? 'rgb(63,50,77)' : 'white';
        return <Card isDay={location.isDay} style={{paddingLeft: 0, paddingRight: 0, paddingTop: 0}}>
            <Header>Visibility</Header>
            <Separator width={1}/>
            <View style={{height: 53 * k, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity style={{width: 113, alignItems: 'center'}}
                                  onPress={() => this.refs.switch.deactivate()}>
                    <Text style={{
                        color,
                        fontFamily: 'Roboto-Regular',
                        fontSize: 15 * k,
                        opacity: bot.isPublic ? 0.3 : 1
                    }}>Private</Text>
                </TouchableOpacity>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Switch ref="switch"
                            active={bot.isPublic}
                            buttonRadius={15}
                            onChangeState={isPublic => bot.isPublic = isPublic}
                            buttonContent={<Image
                                source={bot.isPublic ? require('../../images/iconPublic.png') : require('../../images/iconPrivate.png')}/>}
                            toggleHeight={32}
                            toggleWidth={75}
                            switchHeight={38}
                            switchWidth={150}
                            activeBackgroundColor="rgb(212,212,212)"
                            inactiveBackgroundColor="rgb(212,212,212)"
                            activeButtonColor="white"
                            inactiveButtonColor="white"
                            activeButtonPressedColor="white"
                            inactiveButtonPressedColor="white"
                            buttonShadow={{
                                shadowColor: '#000',
                                shadowOpacity: 0.5,
                                shadowRadius: 0,
                                shadowOffset: {height: 0, width: 0}
                            }}

                    /></View>
                <TouchableOpacity style={{width: 113, alignItems: 'center'}}
                                  onPress={() => this.refs.switch.activate() }>
                    <Text style={{
                        color,
                        fontFamily: 'Roboto-Regular',
                        fontSize: 15 * k,
                        opacity: bot.isPublic ? 1 : 0.3
                    }}>Public</Text>
                </TouchableOpacity>
            </View>
            <Separator width={1}/>
            <Cell style={{alignItems: 'flex-start', padding: 10 * k}} imageStyle={{paddingLeft: 14 * k}}
                  image={require('../../images/iconSubs.png')}>
                <TouchableOpacity onPress={() => bot.followersSize && statem.botEdit.subscribers()}
                                  style={{flex: 1}}>
                    <Text style={{fontSize: 15 * k, fontFamily: 'Roboto-Regular', color}}>
                        {bot.followersSize} Subscribers
                    </Text>
                </TouchableOpacity>
            </Cell>
        </Card>

    }
}