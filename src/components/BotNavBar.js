import React, { Component, PropTypes } from 'react'
import { View, Text, Image } from 'react-native'
import NavBar from './NavBar'
import NavBarBackButton from './NavBarBackButton'
import NavBarRightButton from './NavBarRightButton'
import { k, width, height } from './Global'
import location from '../store/locationStore'
import Bot, { VISIBILITY_PUBLIC, VISIBILITY_OWNER, LOCATION, NOTE, IMAGE } from '../model/Bot'
import statem from '../../gen/state'
import { observer } from 'mobx-react/native'

@observer
export default class extends React.Component {
    static propTypes = {
        bot: PropTypes.any.isRequired
    }

    render () {
        const bot = this.props.bot
        const isDay = location.isDay
        const isOwn = !bot.owner || bot.owner.isOwn
        return <NavBar style={{
            justifyContent: 'flex-start',
            height: this.props.fullMap ? 100 * k : 70 * k,
            backgroundColor: location.isDay ? 'rgba(255,255,255,0.87)' : 'rgba(45,33,55,0.87)'
        }}>
            <View style={{paddingTop: this.props.fullMap ? 25 * k : 30 * k, paddingLeft: 68 * k, paddingRight: 68 * k}}>
                <Text numberOfLines={1} style={{
                    fontFamily: 'Roboto-Medium',
                    fontSize: this.props.fullMap ? 16 : 18,
                    color: isDay ? 'rgb(63,50,77)' : 'white'
                }}>{bot.title}</Text>
                {this.props.fullMap && <Text numberOfLines={2} style={{
                    fontFamily: 'Roboto-Light',
                    fontSize: 14,
                    color: isDay ? 'rgb(63,50,77)' : 'white'
                }}>{bot.address}</Text>}
            </View>
            <NavBarBackButton/>
            {((isOwn && bot.visibility !== VISIBILITY_OWNER) || bot.visibility === VISIBILITY_PUBLIC) &&
            <NavBarRightButton onPress={() => statem.logged.botShare({item: bot.id})}>
                <Text style={{fontFamily: 'Roboto-Regular', fontSize: 15, color: 'rgb(254,92,108)'}}>Share</Text>
            </NavBarRightButton>
            }

        </NavBar>
    }
}