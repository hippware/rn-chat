import React from 'react'
import {View, Image, TouchableOpacity, Clipboard, StyleSheet} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {k} from '../Global'
import {colors} from '../../constants'
import {IBot, IWocky} from 'wocky-client'
import {RText} from '../common'
// import AddBotPost from './AddBotPost'
import {Actions} from 'react-native-router-flux'
import {isAlive} from 'mobx-state-tree'
import {navBarStyle} from '../Router'

type Props = {
  botId: string
  server?: string
  isNew: boolean
  params?: any
  wocky?: IWocky
  analytics?: any
  scrollable: boolean
}

const LocationDetailsNavBar = inject('wocky')(({wocky, botId, server}: Props) => {
  const bot: IBot = wocky.getBot({id: botId, server})
  return <Header bot={bot} />
})

const Header = inject('notificationStore')(
  observer(({bot, scale, notificationStore}) => {
    const map = scale === 0
    if (!bot || !isAlive(bot)) {
      return null
    }
    const {backButtonImage, navBarButtonColor, titleStyle} = navBarStyle
    return (
      <View style={[styles.title]}>
        <TouchableOpacity onPress={Actions.pop}>
          <Image
            source={backButtonImage}
            style={{tintColor: navBarButtonColor, width: 13, height: 21, marginLeft: 10}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onLongPress={() => {
            Clipboard.setString(bot.address)
            notificationStore.flash('Address copied to clipboard 👍')
          }}
          // @TODO: need a way to call scrollToEnd on a ref in the mixin implementer
          // onPress={() => scale === 0 && Actions.refresh({scale: 0.5})}
          onPress={null}
          style={{marginHorizontal: 16}}
        >
          <RText
            numberOfLines={map ? 1 : 2}
            // must wait for solution to https://github.com/facebook/react-native/issues/14981
            // adjustsFontSizeToFit
            minimumFontScale={0.8}
            size={18}
            color={colors.DARK_PURPLE}
            style={[
              titleStyle,
              {
                textAlign: 'center',
              },
            ]}
          >
            {bot.error ? 'Bot Unavailable' : bot.title}
          </RText>
          {map && (
            <RText
              minimumFontScale={0.6}
              numberOfLines={1}
              weight="Light"
              size={14}
              color={colors.DARK_PURPLE}
              style={{textAlign: 'center'}}
            >
              {bot.address}
            </RText>
          )}
        </TouchableOpacity>
        <View style={{marginRight: 20 * k}}>
          <ShareButton bot={bot} />
        </View>
      </View>
    )
  })
)

const ShareButton = observer(({bot}) => {
  if (!bot || !isAlive(bot) || bot.error || bot.loading) return null
  const isOwn = !bot.owner || bot.owner.isOwn
  return isOwn || bot.isPublic ? (
    <TouchableOpacity
      onPress={() => Actions.botShareSelectFriends({botId: bot.id})}
      style={{marginRight: 20 * k}}
    >
      <Image source={require('../../../images/shareIcon.png')} />
    </TouchableOpacity>
  ) : null
})

export default LocationDetailsNavBar

const styles = StyleSheet.create({
  title: {
    height: 64,
    flex: 1,
    elevation: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
})
