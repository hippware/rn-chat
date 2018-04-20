import React from 'react'
import {View} from 'react-native'
import {observer} from 'mobx-react/native'
import {Actions} from 'react-native-router-flux'
import BotImage from './BotImage'
import EventBotTitle from './EventBotTitle'
import EventBotMetabar from './EventBotMetabar'
import {colors} from '../../constants'
import {k} from '../Global'
import {RText} from '../common'
import {IEventBotShare} from 'wocky-client'

type Props = {
  item: IEventBotShare
}

@observer
class EventBotShareCard extends React.Component<Props> {
  onPress() {
    Actions.botDetails({item: this.props.item.bot.id})
  }

  render() {
    // tslint:disable-next-line:one-variable-per-declaration
    let eventBot, bot, msg, isGeo

    try {
      eventBot = this.props.item
      bot = eventBot.bot || {}
      msg = eventBot.message || {}
      isGeo = eventBot.action === 'geofence share'
    } catch (err) {
      return null
    }
    // console.log('render share', eventBot.toJSON())

    return (
      <View>
        <EventBotTitle
          profile={eventBot.target}
          bot={bot}
          action={isGeo ? 'wants to share presence for' : 'shared'}
          timestamp={eventBot.relativeDateAsString}
        />
        {!!msg.body && (
          <View>
            <View
              style={{height: 1, backgroundColor: colors.addAlpha(colors.DARK_GREY, 0.18), flex: 1}}
            />
            <RText weight="Light" color={colors.DARK_PURPLE} size={15} style={{padding: 15 * k}}>
              {msg.body}
            </RText>
          </View>
        )}
        <BotImage bot={bot} isGeo={isGeo} />
        <EventBotMetabar bot={bot} />
      </View>
    )
  }
}

export default EventBotShareCard
