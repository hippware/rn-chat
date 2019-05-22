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

type Props = {
  botId: string
  // server?: string
  isNew?: boolean
  params?: any
  wocky?: IWocky
  analytics?: any
  notificationStore?: any
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
    return {
      backAction: navigation.state.params.isNew ? () => Actions.popTo('home') : Actions.pop,
    }
  }

  _footerComponent: any = observer(() => {
    if (!this.bot) return null

    if (this.props.wocky!.connected && this.bot && isAlive(this.bot) && this.bot.posts.loading)
      return <Loader />

    return <View style={{backgroundColor: 'white', height: 100 * k}} />
  })

  async componentWillMount() {
    const {wocky, analytics, botId, homeStore} = this.props
    runInAction(() => {
      this.bot = wocky!.getBot({id: botId})
    })
    if (!this.bot) {
      return
    }

    homeStore.select(this.bot.id)
    homeStore.setFocusedLocation(this.bot.location)
    await wocky!.loadBot(botId)

    this.viewTimeout = setTimeout(() => {
      if (this.bot && isAlive(this.bot))
        analytics.track('bot_view', {id: this.bot.id, title: this.bot.title})
    }, 7000)
  }

  componentWillUnmount() {
    if (this.viewTimeout) {
      clearTimeout(this.viewTimeout)
    }
  }

  scrollToNewestPost = () => {
    this.list.scrollToIndex({
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

  onNavLongPress = () => {
    Clipboard.setString(this.bot!.address)
    this.props.notificationStore.flash('Address copied to clipboard 👍')
  }

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
          fadeNavConfig={{
            back: true,
            backAction: this.props.navigation.state.params.isNew
              ? () => Actions.popTo('home')
              : Actions.pop,
            title: <NavTitle bot={bot} onLongPress={this.onNavLongPress} />,
          }}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          bounces={false}
          keyboardDismissMode="on-drag"
        />
        {bot.isSubscribed && <AddBotPost bot={bot} afterPostSent={this.scrollToNewestPost} />}
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
        {bot.error ? 'Bot Unavailable' : bot.title}
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
