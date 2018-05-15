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
import EmptyList from '../EmptyList'
type Props = {
  item: string
  wocky?: IWocky
}

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
        <CardList
          emptyUI={<EmptyList text="No one favorited it yet" />}
          keyboardShouldPersistTaps="always"
          data={list.slice()}
          ItemSeparatorComponent={() => <Separator />}
          renderItem={({item}) => <FollowableProfileItem profile={item} />}
          keyExtractor={item => item.id}
          onEndReached={() => this.bot.subscribers.load()}
          onEndReachedThreshold={0.3}
          ListFooterComponent={connected ? <ListFooter finished={finished} /> : null}
        />
      </Screen>
    )
  }
}

export default BotSubscriberList
