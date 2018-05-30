import React from 'react'
import {FlatList} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {Actions} from 'react-native-router-flux'
import BotCard from './BotCard'
import ListFooter from './ListFooter'
import {IWocky} from 'wocky-client'

type Props = {
  filter?: string
  list?: any
  header?: any
  wocky?: IWocky
}

const img = require('../../images/graphicEndBots.png')

@inject('wocky')
@observer
export default class BotListView extends React.Component<Props> {
  props: Props
  list: any
  bots?: any

  componentWillMount() {
    const {filter, wocky, list} = this.props
    this.bots =
      filter === 'all'
        ? wocky.profile.subscribedBots
        : filter === 'own' ? wocky.profile.ownBots : list
    this.bots.load()
  }

  scrollToTop = () => {
    this.list.scrollToOffset({x: 0, y: 0})
  }

  render() {
    const {header, wocky} = this.props
    if (!wocky.profile) {
      return null
    }
    const {finished} = this.bots
    const {connected} = wocky

    return (
      this.bots && (
        <FlatList
          data={this.bots.list.slice()}
          ref={l => (this.list = l)}
          onEndReachedThreshold={0.5}
          onEndReached={this.bots.load}
          ListHeaderComponent={header}
          ListFooterComponent={
            connected ? (
              <ListFooter
                footerImage={img}
                finished={finished}
                style={{marginTop: !finished && this.bots.list.length === 0 ? 100 : 0}}
              />
            ) : null
          }
          renderItem={({item}) => (
            <BotCard item={item} onPress={i => Actions.botDetails({item: i.id})} />
          )}
          keyExtractor={item => `${item.id}`}
        />
      )
    )
  }
}
