import React from 'react'
import {autorun, observable} from 'mobx'
import {Actions} from 'react-native-router-flux'
import {observer, inject} from 'mobx-react/native'
import Screen from '../Screen'
import CardList from '../CardList'
import {Separator} from '../common'
import {TappableProfileItem} from './customProfileItems'
import ListFooter from '../ListFooter'
import {IBot, IWocky} from 'wocky-client'
import {ILocationStore} from '../../store/LocationStore'
import {isAlive} from 'mobx-state-tree'

type Props = {
  item: string
  wocky?: IWocky
  locationStore?: ILocationStore
}

@inject('wocky', 'locationStore')
@observer
class BotVisitorList extends React.Component<Props> {
  @observable bot?: IBot
  handler

  componentWillMount() {
    this.bot = this.props.wocky!.getBot({id: this.props.item})
    this.bot.visitors.load!({force: true})
    this.props.wocky!.loadBot(this.props.item)
  }

  componentDidMount() {
    this.handler = autorun(() => {
      if (!this.props.locationStore!.alwaysOn) {
        Actions.pop()
      }
    })
  }

  componentWillUnmount() {
    this.handler()
  }

  render() {
    const {connected} = this.props.wocky!
    if (!this.bot || !isAlive(this.bot)) return null
    const {list, finished} = this.bot.visitors
    return (
      <Screen>
        <CardList
          keyboardShouldPersistTaps="always"
          data={list!.slice()}
          ItemSeparatorComponent={() => <Separator />}
          renderItem={({item}) => <TappableProfileItem profile={item} />}
          keyExtractor={item => item.id}
          ListFooterComponent={connected ? <ListFooter finished={finished} /> : null}
        />
      </Screen>
    )
  }
}

export default BotVisitorList
