import React, {useState, useEffect, useRef} from 'react'
import {View, Clipboard, TouchableOpacity} from 'react-native'
import {inject, Observer} from 'mobx-react'
import {k} from '../Global'
import {colors} from '../../constants'
import {IBot, IWocky} from 'wocky-client'
import BotPostCard from './BotPostCard'
import {RText, Spinner} from '../common'
import AddBotPost from './AddBotPost'
import Header from './BotDetailsHeader'
import {isAlive} from 'mobx-state-tree'
import Separator from './Separator'
import DraggablePopupList from '../common/DraggablePopupList'
import {Actions} from 'react-native-router-flux'
import {navBarStyle} from '../styles'
import NotificationStore from '../../store/NotificationStore'
import {observer} from 'mobx-react'

type Props = {
  botId: string
  isNew?: boolean
  params?: any
  wocky?: IWocky
  analytics?: any
  notificationStore?: NotificationStore
  homeStore?: any
  navigation: any
  isActive: boolean
  preview?: boolean
}

const BotDetails = inject(
  'wocky',
  'analytics',
  'notificationStore',
  'homeStore'
)(
  observer((props: Props) => {
    let viewTimeout

    const [bot, setBot] = useState<IBot | undefined>(undefined)
    const list = useRef(null)
    const {
      wocky,
      analytics,
      botId,
      homeStore,
      navigation,
      isNew,
      notificationStore,
      preview = false,
      isActive,
    } = props

    useEffect(() => {
      const tempBot = wocky!.getBot({id: botId})
      setBot(tempBot)
      if (!tempBot) {
        return
      }

      // send all injected props + bot "up" to static context
      props.navigation.setParams({isNew, bot: tempBot, notificationStore})

      homeStore.select(tempBot.id)
      homeStore.setFocusedLocation(tempBot.location)
      wocky!.loadBot(botId).then(() => {
        viewTimeout = setTimeout(() => {
          if (tempBot && isAlive(tempBot))
            analytics.track('bot_view', {id: tempBot.id, title: tempBot.title})
        }, 7000)

        // deep-linking to visitors
        if (navigation.state.params.params === 'visitors') {
          // todo: why doesn't Botdetails pop back down when nav'ing to visitors?
          Actions.visitors({botId})
        }
      })

      return () => {
        if (viewTimeout) {
          clearTimeout(viewTimeout)
        }
      }
    }, [])

    function scrollToNewestPost() {
      ;(list.current as any).scrollToIndex({
        index: 0,
        viewPosition: 0.5,
      })
    }

    if (!bot || !isAlive(bot)) {
      return null
    }

    return (
      <View pointerEvents="box-none" style={{flex: 1}}>
        <DraggablePopupList
          isActive={isActive}
          preview={preview}
          data={!bot.error && bot.isSubscribed && !preview ? bot.posts.list.slice() : []}
          ref={list}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          ListFooterComponent={
            <Observer>
              {() => {
                if (props.wocky!.connected && bot && isAlive(bot) && bot.posts.loading)
                  return <Loader />
                return <View style={{height: 0}} />
              }}
            </Observer>
          }
          initialNumToRender={8}
          headerInner={<Header bot={bot!} {...props} />}
          ItemSeparatorComponent={() => (
            <View style={{backgroundColor: 'white'}}>
              <Separator />
            </View>
          )}
          renderItem={({item}) => <BotPostCard item={item} bot={bot!} />}
          keyExtractor={item => item.id}
          bounces={false}
          keyboardDismissMode="on-drag"
        />
        {!preview && !bot.error && bot.isSubscribed && (
          <AddBotPost bot={bot} afterPostSent={scrollToNewestPost} />
        )}
      </View>
    )
  })
)
;(BotDetails as any).navigationOptions = ({navigation}) => {
  const {bot, notificationStore} = navigation.state.params
  return {
    fadeNavConfig: {
      back: true,
      title: bot && (
        <NavTitle
          bot={bot}
          onLongPress={() => {
            Clipboard.setString(bot.address)
            notificationStore.flash('Address copied to clipboard 👍')
          }}
        />
      ),
    },
  }
}

export default BotDetails

const NavTitle = ({bot, onLongPress}) => {
  const {titleStyle} = navBarStyle
  if (!bot) {
    return null
  }
  return (
    <TouchableOpacity onLongPress={onLongPress} onPress={undefined} style={{marginHorizontal: 16}}>
      <RText
        // numberOfLines={2}
        // must wait for solution to https://github.com/facebook/react-native/issues/14981
        // adjustsFontSizeToFit
        // minimumFontScale={0.8}
        size={16}
        color={colors.DARK_PURPLE}
        style={[titleStyle, {textAlign: 'center'}]}
        numberOfLines={1}
      >
        {bot.error ? 'Unavailable' : bot.title}
      </RText>
      <RText
        // minimumFontScale={0.6}
        numberOfLines={1}
        weight="Light"
        size={12}
        color={colors.DARK_PURPLE}
        style={{textAlign: 'center'}}
      >
        {bot.addressData && bot.addressData.locationShort}
      </RText>
    </TouchableOpacity>
  )
}

const Loader = () => (
  <View
    style={{
      alignItems: 'center',
      paddingTop: 20 * k,
      paddingBottom: 80 * k,
      backgroundColor: 'white',
    }}
  >
    <Spinner />
  </View>
)
