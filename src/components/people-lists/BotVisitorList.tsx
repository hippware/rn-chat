import React from 'react'
import {View, Image} from 'react-native'
import {autorun, observable} from 'mobx'
import {Actions} from 'react-native-router-flux'
import {observer, inject} from 'mobx-react/native'
import Screen from '../Screen'
import CardList from '../CardList'
import {Separator, Spinner} from '../common'
import {TappableProfileItem} from './customProfileItems'
import {IBot, IWocky} from 'wocky-client'
import {ILocationStore} from '../../store/LocationStore'
import {isAlive} from 'mobx-state-tree'
import EmptyList from '../EmptyList'

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
    this.props.wocky!.loadBot(this.props.item, undefined)
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
    if (!this.bot || !isAlive(this.bot)) return null
    const {list, loading} = this.bot.visitors
    if (loading) {
      return (
        <Screen>
          <View style={{alignItems: 'center'}}>
            <Spinner />
          </View>
        </Screen>
      )
    }
    return (
      <Screen>
        <CardList
          keyboardShouldPersistTaps="always"
          data={list!.slice()}
          emptyUI={<EmptyList text="No one is here!" />}
          ItemSeparatorComponent={() => <Separator />}
          renderItem={({item}) => <TappableProfileItem profile={item} />}
          keyExtractor={item => item.id}
        />
      </Screen>
    )
  }
}

export default BotVisitorList
