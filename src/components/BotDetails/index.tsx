import React from 'react'
import {View, FlatList, Text, TouchableOpacity, Clipboard, Image, StyleSheet} from 'react-native'
import {when, observable, runInAction} from 'mobx'
import {observer, inject} from 'mobx-react/native'
import {k, width} from '../Global'
import {colors} from '../../constants'
import {IProfile, IBot, IWocky} from 'wocky-client'
import BotPostCard from './BotPostCard'
import {RText, Spinner} from '../common'
import AddBotPost from './AddBotPost'
import BotDetailsHeader from './BotDetailsHeader'
import {Actions} from 'react-native-router-flux'
import {isAlive} from 'mobx-state-tree'

const SEPARATOR_HEIGHT = 20 * k

type Props = {
  item: string
  server?: string
  isNew: boolean
  scale: number
  params?: any
  wocky?: IWocky
  analytics?: any
}

const Title = inject('wocky')(({wocky, item, server, scale}) => {
  const bot: IBot = wocky.getBot({id: item, server})
  return <Header bot={bot} scale={scale} />
})

const Right = inject('wocky')(({wocky, item, server}) => {
  const bot = wocky.getBot({id: item, server})
  return <ShareButton bot={bot} />
})

@inject('wocky', 'analytics')
@observer
class BotDetails extends React.Component<Props> {
  static renderTitle = props => <Title {...props} />
  static rightButton = props => <Right {...props} />

  @observable bot?: IBot
  @observable owner?: IProfile
  @observable numToRender: number = 8
  list: any
  post: any
  viewTimeout: any

  _footerComponent = observer(() => {
    return this.props.wocky!.connected && this.bot && this.bot.posts.loading ? (
      <Loader />
    ) : (
      <View style={{height: 60}} />
    )
  })

  componentDidMount() {
    this.loadBot()
    if (this.props.params && this.props.params.indexOf('visitors') !== -1) {
      Actions.visitors({item: this.props.item})
    }
  }

  componentWillUnmount() {
    if (this.viewTimeout) {
      clearTimeout(this.viewTimeout)
    }
  }

  loadBot = async () => {
    const {wocky, analytics} = this.props
    runInAction(() => (this.bot = wocky!.getBot({id: this.props.item})))
    await wocky!.loadBot(this.props.item, undefined)
    await this.bot!.posts.load({force: true})

    this.viewTimeout = setTimeout(() => {
      if (this.bot && isAlive(this.bot))
        analytics.track('bot_view', {id: this.bot.id, title: this.bot.title})
    }, 7000)
  }

  _headerComponent = () => (
    <BotDetailsHeader bot={this.bot!} scale={this.props.scale} {...this.props} />
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
        <View style={{flex: 1}}>
          <Loader />
        </View>
      )
    }
    if (!isAlive(bot)) {
      return null
    }
    if (bot.error) {
      return <BotUnavailable />
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.bot && this.props.scale > 0 ? this.bot.posts.list.slice() : []}
          ref={r => (this.list = r)}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: this.post ? this.post.imgContainerHeight : 0
          }}
          ListFooterComponent={this._footerComponent}
          initialNumToRender={this.numToRender}
          ListHeaderComponent={this._headerComponent}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
        {this.props.scale > 0 && (
          <AddBotPost bot={bot} ref={a => (this.post = a)} scrollToEnd={() => this.scrollToEnd()} />
        )}
      </View>
    )
  }
}

const Header = inject('notificationStore')(
  observer(({bot, scale, notificationStore}) => {
    const map = scale === 0
    if (!bot || !isAlive(bot)) {
      return null
    }
    return (
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
          weight="Medium"
          size={18}
          color={colors.DARK_PURPLE}
          style={{
            textAlign: 'center'
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
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <View style={{alignItems: 'center'}}>
      <RText size={17} style={{textAlign: 'center'}}>
        <Text style={{color: 'red'}}>Oops. </Text>
        <Text style={{color: colors.ANOTHER_GREY}}>{'This bot is no\r\nlonger available'}</Text>
      </RText>
      <Image source={require('../../../images/botError.png')} style={{marginTop: 30 * k}} />
    </View>
  </View>
)

const Loader = () => (
  <View
    style={{
      alignItems: 'center',
      paddingTop: 20 * k,
      paddingBottom: 80 * k,
      backgroundColor: 'white'
    }}
  >
    <Spinner />
  </View>
)

export default BotDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.LIGHT_GREY
  }
})
