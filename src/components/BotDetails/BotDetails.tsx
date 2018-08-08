import React from 'react'
import {View, FlatList, Text, Image} from 'react-native'
import {when, observable, runInAction} from 'mobx'
import {observer, inject} from 'mobx-react/native'
import {k, width, height} from '../Global'
import {colors} from '../../constants'
import {IProfile, IBot, IWocky} from 'wocky-client'
import BotPostCard from './BotPostCard'
import {RText, Spinner} from '../common'
// import AddBotPost from './AddBotPost'
import Header from './BotDetailsHeader'
import {Actions} from 'react-native-router-flux'
import {isAlive} from 'mobx-state-tree'
import BottomPopup from '../BottomPopup'
import Separator from './Separator'

type Props = {
  botId: string
  server?: string
  isNew: boolean
  params?: any
  wocky?: IWocky
  analytics?: any
  scrollable: boolean
}

@inject('wocky', 'analytics')
@observer
export default class BotDetails extends React.Component<Props> {
  @observable bot?: IBot
  @observable owner?: IProfile
  @observable numToRender: number = 8
  list: any
  post: any
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

  _headerComponent = () => <Header bot={this.bot!} {...this.props} />

  scrollToEnd = () => {
    when(
      () => this.bot!.posts.finished,
      () => {
        this.numToRender = this.bot!.posts.length
        setTimeout(() => this.list && this.list.scrollToEnd(), 500)
      }
    )
  }

  // componentWillReceiveProps(props: Props) {
  //   if (props.scale !== this.props.scale && this.list) {
  //     this.list.scrollToOffset({x: 0, y: 0, animated: false})
  //   }
  // }

  renderItem = ({item}) => <BotPostCard item={item} bot={this.bot!} />

  renderSeparator = () => <Separator />

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
      <View style={{width, height}}>
        <FlatList
          style={{flex: 1}}
          data={this.bot ? this.bot.posts.list.slice() : []}
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
          // keyExtractor={(item, index) => `${item.id} ${index}`}
          scrollEnabled={this.props.scrollable}
        />
      </View>
    )
  }
}

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
