import React, {useState, useEffect, useRef} from 'react'
import {View, Clipboard, TouchableOpacity} from 'react-native'
import {inject, Observer} from 'mobx-react'
import {k} from '../Global'
import {colors} from '../../constants'
import {IBot, IWocky} from 'src/wocky'
import BotPostCard from './BotPostCard'
import {RText, Spinner, BottomPopupNew} from '../common'
import AddBotPost from './AddBotPost'
import {PreviewHeader, DefaultHeader} from './BotDetailsHeader'
import {isAlive} from 'mobx-state-tree'
import Separator from './Separator'
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
  fromDeeplink?: boolean
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
      isNew,
      notificationStore,
      preview = false,
      fromDeeplink,
    } = props

    useEffect(() => {
      let tempBot = wocky!.bots.exists(botId)
      if (!tempBot) {
        if (fromDeeplink) {
          // bot could be not loaded yet, create empty one
          tempBot = wocky!.getBot({id: botId})
        } else {
          Actions.popTo('home') // bot is deleted, redirect user to own profile
          return
        }
      }
      setBot(tempBot)

      // send all injected props + bot "up" to static context
      props.navigation.setParams({isNew, bot: tempBot, notificationStore})

      homeStore.select(tempBot.id)
      wocky!.loadBot(botId).then(() => {
        homeStore.setFocusedLocation(tempBot!.location)

        viewTimeout = setTimeout(() => {
          if (tempBot && isAlive(tempBot))
            analytics.track('bot_view', {id: tempBot.id, title: tempBot.title})
        }, 7000)
      })

      return () => {
        if (viewTimeout) {
          clearTimeout(viewTimeout)
        }
      }
    }, [botId])

    function scrollToNewestPost() {
      ;(list.current as any).getNode().scrollToIndex({
        index: 0,
        viewPosition: 1,
      })
    }

    if (homeStore.fullScreenMode || !bot || !isAlive(bot)) {
      return null
    }

    return (
      <BottomPopupNew
        ref={list}
        previewHeight={150}
        fullViewHeight={500}
        allowFullScroll
        preview={preview}
        navBarConfig={{
          backAction: () => Actions.refresh({preview: true}),
          title: bot && (
            <NavTitle
              bot={bot}
              onLongPress={() => {
                Clipboard.setString(bot.address)
                notificationStore!.flash('Address copied to clipboard 👍')
              }}
            />
          ),
        }}
        listProps={{
          data: !bot.error && bot.isSubscribed && !preview ? bot.posts.list.slice() : [],
          contentContainerStyle: {
            flexGrow: 1,
          },
          ListHeaderComponent: preview ? (
            <PreviewHeader bot={bot!} />
          ) : (
            <DefaultHeader bot={bot!} />
          ),
          ListFooterComponent: (
            <Observer>
              {() => {
                if (props.wocky!.connected && bot && isAlive(bot) && bot.posts.loading)
                  return <Loader />
                return <View style={{height: 80}} />
              }}
            </Observer>
          ),
          initialNumToRender: 8,
          ItemSeparatorComponent: () => (
            <View style={{backgroundColor: 'white'}}>
              <Separator />
            </View>
          ),
          renderItem: ({item}) => <BotPostCard item={item} bot={bot!} />,
          keyExtractor: item => item.id,
          bounces: false,
          keyboardDismissMode: 'on-drag',
        }}
        renderFooter={() =>
          !preview &&
          !bot.error &&
          bot.isSubscribed && (
            <View style={{position: 'absolute', bottom: 0, right: 0, left: 0}}>
              <AddBotPost bot={bot} afterPostSent={scrollToNewestPost} />
            </View>
          )
        }
      />
    )
  })
)
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
