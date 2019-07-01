import React from 'react'
import {View, Clipboard, TouchableOpacity} from 'react-native'
import {observable, runInAction} from 'mobx'
import {observer, inject} from 'mobx-react/native'
import {k} from '../Global'
import {colors} from '../../constants'
import {IProfile, IBot, IWocky} from 'wocky-client'
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
}

@inject('wocky', 'analytics', 'notificationStore', 'homeStore')
@observer
export default class BotDetails extends React.Component<Props> {
  @observable bot?: IBot
  @observable owner?: IProfile
  @observable numToRender: number = 8
  list: any
  viewTimeout: any

  static navigationOptions = ({navigation}) => {
    const {isNew, bot, notificationStore} = navigation.state.params
    const backAction = isNew ? () => Actions.popTo('home') : Actions.pop
    return {
      backAction,
      fadeNavConfig: {
        back: true,
        backAction,
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

  _footerComponent: any = observer(() => {
    if (!this.bot) return null

    if (this.props.wocky!.connected && this.bot && isAlive(this.bot) && this.bot.posts.loading)
      return <Loader />

    return <View style={{backgroundColor: 'white', height: 100 * k}} />
  })

  async componentWillMount() {
    const {wocky, analytics, botId, homeStore, navigation} = this.props
    runInAction(() => {
      this.bot = wocky!.getBot({id: botId})
    })
    if (!this.bot) {
      return
    }

    // send all injected props + bot "up" to static context
    this.props.navigation.setParams({...this.props, bot: this.bot})

    homeStore.select(this.bot.id)
    homeStore.setFocusedLocation(this.bot.location)
    await wocky!.loadBot(botId)

    this.viewTimeout = setTimeout(() => {
      if (this.bot && isAlive(this.bot))
        analytics.track('bot_view', {id: this.bot.id, title: this.bot.title})
    }, 7000)

    // deep-linking to visitors
    if (navigation.state.params.params === 'visitors') {
      // todo: why doesn't Botdetails pop back down when nav'ing to visitors?
      Actions.visitors({botId})
    }
  }

  componentWillUnmount() {
    if (this.viewTimeout) {
      clearTimeout(this.viewTimeout)
    }
  }

  scrollToNewestPost = () => {
    this.list.wrappedInstance.scrollToIndex({
      index: 0,
      viewPosition: 0.5,
    })
  }

  renderItem = ({item}) => <BotPostCard item={item} bot={this.bot!} />

  renderSeparator = () => (
    <View style={{backgroundColor: 'white'}}>
      <Separator />
    </View>
  )

  render() {
    const {bot} = this
    if (!bot || !isAlive(bot)) {
      return null
    }

    return (
      <View pointerEvents="box-none" style={{flex: 1}}>
        <DraggablePopupList
          isActive={this.props.isActive}
          data={!bot.error && bot.isSubscribed ? bot.posts.list.slice() : []}
          ref={r => (this.list = r)}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          ListFooterComponent={this._footerComponent}
          initialNumToRender={this.numToRender}
          headerInner={<Header bot={this.bot!} {...this.props} />}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          bounces={false}
          keyboardDismissMode="on-drag"
        />
        {!bot.error && bot.isSubscribed && (
          <AddBotPost bot={bot} afterPostSent={this.scrollToNewestPost} />
        )}
      </View>
    )
  }
}

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
