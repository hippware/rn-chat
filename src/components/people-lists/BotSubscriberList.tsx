// @flow

import React from 'react'
import {observable} from 'mobx'
import {observer, inject} from 'mobx-react/native'
import Screen from '../Screen'
import CardList from '../CardList'
import {Separator} from '../common'
import {FollowableProfileItem} from './customProfileItems'
import ListFooter from '../ListFooter'
import {IBot, IWocky} from 'wocky-client'
import {FlatList, View, Image} from 'react-native'
import {RText} from '../common'
import {colors} from '../../constants'
import {k} from '../Global'

type Props = {
  item: string
  wocky?: IWocky
}

const EmptyList = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: colors.LIGHT_GREY,
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Image
      source={require('../../../images/surpriseBotGray.png')}
      style={{height: 74, width: 64, marginVertical: 10 * k}}
      resizeMode="contain"
    />
    <RText color={colors.DARK_GREY} size={15}>
      No one favorited it yet!
    </RText>
  </View>
)

@inject('wocky')
@observer
class BotSubscriberList extends React.Component<Props> {
  props: Props
  @observable bot: IBot

  componentWillMount() {
    this.bot = this.props.wocky.getBot({id: this.props.item})
    this.bot.subscribers.load({force: true})
    this.props.wocky.loadBot(this.props.item, null)
  }

  render() {
    const {connected} = this.props.wocky
    const {list, finished} = this.bot.subscribers
    return (
      <Screen>
        {list.length ? (
          <CardList
            keyboardShouldPersistTaps="always"
            data={list.slice()}
            ItemSeparatorComponent={() => <Separator />}
            renderItem={({item}) => <FollowableProfileItem profile={item} />}
            keyExtractor={item => item.id}
            onEndReached={() => this.bot.subscribers.load()}
            onEndReachedThreshold={0.3}
            ListFooterComponent={connected ? <ListFooter finished={finished} /> : null}
          />
        ) : (
          <EmptyList />
        )}
      </Screen>
    )
  }
}

export default BotSubscriberList
