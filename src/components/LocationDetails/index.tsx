import React from 'react'
import {View, FlatList, Text, Image} from 'react-native'
import {when, observable, runInAction} from 'mobx'
import {observer, inject} from 'mobx-react/native'
import {k} from '../Global'
import {colors} from '../../constants'
import {IProfile, IBot, IWocky} from 'wocky-client'
import BotPostCard from './BotPostCard'
import {RText, Spinner} from '../common'
// import AddBotPost from './AddBotPost'
import LocationDetailsHeader from './LocationDetailsHeader'
import {Actions} from 'react-native-router-flux'
import {isAlive} from 'mobx-state-tree'
import BottomPopup from '../BottomPopup'

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

  _headerComponent = () => <LocationDetailsHeader bot={this.bot!} {...this.props} />

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

  renderSeparator = () => (
    <View
      style={{
        height: 2,
        marginHorizontal: 25 * k,
        marginVertical: 20 * k,
        backgroundColor: 'rgb(222,222,222)',
      }}
    />
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
      <FlatList
        style={{flex: 1}}
        data={this.bot ? this.bot.posts.list.slice() : []}
        // data={this.bot ? [...this.bot.posts.list.slice(), ...this.bot.posts.list.slice()] : []}
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
    )
  }
}

export const LocationDetailsBottomPopup = (props: Props) => (
  <BottomPopup onClose={Actions.pop}>
    <LocationDetails {...props} scrollable={false} />
  </BottomPopup>
)

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
