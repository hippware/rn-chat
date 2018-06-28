import React from 'react'
import {View, FlatList, Text, Image, TouchableOpacity, Clipboard, StyleSheet} from 'react-native'
import {when, observable, runInAction} from 'mobx'
import {observer, inject} from 'mobx-react/native'
import {k, width} from '../Global'
import {colors} from '../../constants'
import {IProfile, IBot, IWocky} from 'wocky-client'
import BotPostCard from './BotPostCard'
import {RText, Spinner} from '../common'
import AddBotPost from './AddBotPost'
import LocationDetailsHeader from './LocationDetailsHeader'
import {Actions} from 'react-native-router-flux'
import {isAlive} from 'mobx-state-tree'
import BottomPopup from '../BottomPopup'

const SEPARATOR_HEIGHT = 20 * k

type Props = {
  botId: string
  server?: string
  isNew: boolean
  scale: number
  params?: any
  wocky?: IWocky
  analytics?: any
}

// const Right = inject('wocky')(({wocky, botId, server}) => {
//   const bot = wocky.getBot({id: botId, server})
//   return <ShareButton bot={bot} />
// })

@inject('wocky', 'analytics')
@observer
export default class LocationDetails extends React.Component<Props> {
  @observable bot?: IBot
  @observable owner?: IProfile
  @observable numToRender: number = 8
  list: any
  post: any
  viewTimeout: any

  _footerComponent = observer(() => {
    return this.props.wocky!.connected &&
      this.bot &&
      isAlive(this.bot) &&
      this.bot.posts.loading ? (
      <Loader />
    ) : (
      <View style={{height: 60}} />
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

  _headerComponent = () => (
    <LocationDetailsHeader bot={this.bot!} scale={this.props.scale} {...this.props} />
  )

  scrollToEnd = () => {
    when(
      () => this.bot!.posts.finished,
      () => {
        this.numToRender = this.bot!.posts.length
        setTimeout(() => this.list && this.list.scrollToEnd(), 500)
      }
    )
  }

  componentWillReceiveProps(props: Props) {
    if (props.scale !== this.props.scale && this.list) {
      this.list.scrollToOffset({x: 0, y: 0, animated: false})
    }
  }

  renderItem = ({item}) => <BotPostCard item={item} bot={this.bot!} />

  renderSeparator = () => (
    <View style={{height: SEPARATOR_HEIGHT, width, backgroundColor: colors.LIGHT_GREY}} />
  )

  render() {
    const {bot} = this
    if (!bot) {
      return (
        <BottomPopup onClose={Actions.pop}>
          <Loader />
        </BottomPopup>
      )
    }
    if (!isAlive(bot)) {
      return <BottomPopup onClose={Actions.pop}>{null}</BottomPopup>
    }
    if (bot.error) {
      return <BotUnavailable />
    }
    return (
      <BottomPopup onClose={Actions.pop}>
        <FlatList
          style={{flex: 1}}
          data={this.bot && this.props.scale > 0 ? this.bot.posts.list.slice() : []}
          ref={r => (this.list = r)}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: this.post ? this.post.imgContainerHeight : 0,
          }}
          ListFooterComponent={this._footerComponent}
          initialNumToRender={this.numToRender}
          ListHeaderComponent={this._headerComponent}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          // must disable scroll because this is wrapped by ScrollView in BottomPopup
          scrollEnabled={false}
        />
        {this.props.scale > 0 && (
          <AddBotPost bot={bot} ref={a => (this.post = a)} scrollToEnd={() => this.scrollToEnd()} />
        )}
        {/* <View style={{flex: 1, backgroundColor: 'green', height: 1000}} /> */}
      </BottomPopup>
    )
  }
}

export const Title = inject('wocky')(({wocky, botId, server, scale}: Props) => {
  // console.log('& title', botId)
  const bot: IBot = wocky.getBot({id: botId, server})
  return <Header bot={bot} scale={scale} />
})

const backButtonImage = require('../../../images/iconBackGrayNew.png')
// const buttonColor = settings.isStaging ? STAGING_COLOR : 'rgb(117,117,117)'

const Header = inject('notificationStore')(
  observer(({bot, scale, notificationStore}) => {
    const map = scale === 0
    if (!bot || !isAlive(bot)) {
      return null
    }
    return (
      <View style={styles.title}>
        <Image source={backButtonImage} />
        <TouchableOpacity
          onLongPress={() => {
            Clipboard.setString(bot.address)
            notificationStore.flash('Address copied to clipboard 👍')
          }}
          // @TODO: need a way to call scrollToEnd on a ref in the mixin implementer
          onPress={() => scale === 0 && Actions.refresh({scale: 0.5})}
        >
          <RText
            numberOfLines={map ? 1 : 2}
            // must wait for solution to https://github.com/facebook/react-native/issues/14981
            // adjustsFontSizeToFit
            minimumFontScale={0.8}
            size={18}
            color={colors.DARK_PURPLE}
            style={{
              textAlign: 'center',
            }}
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
        <ShareButton />
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

const BotUnavailable = () => (
  <BottomPopup onClose={Actions.pop}>
    <View style={{alignItems: 'center'}}>
      <RText size={17} style={{textAlign: 'center'}}>
        <Text style={{color: 'red'}}>Oops. </Text>
        <Text style={{color: colors.ANOTHER_GREY}}>{'This bot is no\r\nlonger available'}</Text>
      </RText>
      <Image source={require('../../../images/botError.png')} style={{marginTop: 30 * k}} />
    </View>
  </BottomPopup>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.LIGHT_GREY,
  },
  title: {
    height: 64,
    flex: 1,
    elevation: 1,
    paddingTop: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
})
