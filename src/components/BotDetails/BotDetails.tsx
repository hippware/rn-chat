import React from 'react'
import {View, Text, Image, Clipboard, TouchableOpacity} from 'react-native'
import {when, observable, runInAction} from 'mobx'
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
import {navBarStyle} from '../Router'
import {DraggablePopupList} from '../common/'
import {Actions} from 'react-native-router-flux'

type Props = {
  botId: string
  server?: string
  isNew: boolean
  params?: any
  wocky?: IWocky
  analytics?: any
  notificationStore?: any
}

@inject('wocky', 'analytics')
@observer
export default class BotDetails extends React.Component<Props> {
  @observable bot?: IBot
  @observable owner?: IProfile
  @observable numToRender: number = 8
  list: any
  viewTimeout: any

  _footerComponent = observer(() => {
    return (
      this.props.wocky!.connected &&
      this.bot &&
      isAlive(this.bot) &&
      this.bot.posts.loading && <Loader />
    )
  })

  componentDidMount() {
    this.loadBot()
    // if (this.props.params && this.props.params.indexOf('visitors') !== -1) {
    //   Actions.visitors({item: this.props.botId})
    // }
  }

  componentWillUnmount() {
    if (this.viewTimeout) {
      clearTimeout(this.viewTimeout)
    }
  }

  loadBot = async () => {
    const {wocky, analytics} = this.props
    runInAction(() => (this.bot = wocky!.getBot({id: this.props.botId})))
    await wocky!.loadBot(this.props.botId, undefined)
    await this.bot!.posts.load({force: true})

    this.viewTimeout = setTimeout(() => {
      if (this.bot && isAlive(this.bot))
        analytics.track('bot_view', {id: this.bot.id, title: this.bot.title})
    }, 7000)
  }

  scrollToEnd = () => {
    when(
      () => this.bot!.posts.finished,
      () => {
        this.numToRender = this.bot!.posts.length
        setTimeout(() => this.list && this.list.scrollToEnd(), 500)
      }
    )
  }

  renderItem = ({item}) => <BotPostCard item={item} bot={this.bot!} />

  renderSeparator = () => (
    <View style={{backgroundColor: 'white'}}>
      <Separator />
    </View>
  )

  onNavLongPress = () => {
    Clipboard.setString(this.bot.address)
    this.props.notificationStore.flash('Address copied to clipboard 👍')
  }

  render() {
    const {bot} = this
    if (!bot) {
      return <Loader />
    }
    if (!isAlive(bot)) {
      return null
    }
    if (bot.error) {
      return <BotUnavailable />
    }

    return (
      <View style={{flex: 1}}>
        <DraggablePopupList
          data={this.bot ? this.bot.posts.list.slice() : []}
          ref={r => (this.list = r)}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 50, // leave room for absolute positioned comment input
          }}
          ListFooterComponent={this._footerComponent}
          initialNumToRender={this.numToRender}
          headerInner={<Header bot={this.bot!} {...this.props} />}
          fadeNavConfig={{
            back: true,
            title: <NavTitle bot={bot} onLongPress={this.onNavLongPress} />,
            right: <ShareButton bot={bot} />,
          }}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          bounces={false}
          keyboardDismissMode="on-drag"
        />
        <AddBotPost bot={bot} scrollToEnd={this.scrollToEnd} />
      </View>
    )
  }
}

const NavTitle = ({bot, onLongPress}) => {
  const {titleStyle} = navBarStyle
  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      onPress={null}
      style={{marginHorizontal: 16, paddingTop: 10}}
    >
      <RText
        numberOfLines={2}
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
    </TouchableOpacity>
  )
}

const ShareButton = observer(({bot}) => {
  if (!bot || !isAlive(bot) || bot.error || bot.loading) return null
  const isOwn = !bot.owner || bot.owner.isOwn
  return isOwn || bot.isPublic ? (
    <TouchableOpacity onPress={() => Actions.botShareSelectFriends({botId: bot.id})}>
      <Image source={require('../../../images/shareIcon.png')} />
    </TouchableOpacity>
  ) : null
})

const BotUnavailable = () => (
  <View style={{alignItems: 'center'}}>
    <RText size={17} style={{textAlign: 'center'}}>
      <Text style={{color: 'red'}}>Oops. </Text>
      <Text style={{color: colors.ANOTHER_GREY}}>{'This bot is no\r\nlonger available'}</Text>
    </RText>
    <Image source={require('../../../images/botError.png')} style={{marginTop: 30 * k}} />
  </View>
)

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
