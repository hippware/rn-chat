import React from 'react'
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {CloseButton, RText} from '../common'
import AddressBar from '../map/AddressBar'
import {observable} from 'mobx'
import {IWocky, IBot} from 'wocky-client'
import {colors} from '../../constants'
import {k} from '../Global'
import {Actions} from 'react-native-router-flux'
import {getSnapshot} from 'mobx-state-tree'
import IconStore from '../../store/IconStore'

type Props = {
  wocky?: IWocky
  analytics?: any
  iconStore: IconStore
}

@inject('wocky', 'analytics', 'iconStore')
@observer
export default class CreationHeader extends React.Component<Props> {
  @observable
  bot?: IBot
  trackTimeout: any

  componentWillMount() {
    this.createBot()
    this.props.iconStore.setIndex(0)
    this.trackTimeout = setTimeout(() => this.props.analytics.track('botcreate_start'), 1000)
  }

  componentWillUnmount() {
    clearTimeout(this.trackTimeout)
  }

  createBot = async () => {
    this.bot = await this.props.wocky!.createBot()
  }

  next = () => {
    this.props.analytics.track('botcreate_chooselocation', getSnapshot(this.bot!))
    Actions.botCompose({botId: this.bot!.id})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <View style={{width: 100}}>
            <CloseButton style={{left: 0}} />
          </View>
          <RText size={17} style={{textAlign: 'center'}}>
            Pin Location
          </RText>
          <View style={{width: 100}}>
            {this.bot && (
              <TouchableOpacity onPress={this.next} style={{alignSelf: 'flex-end'}}>
                <RText size={17} color={colors.PINK}>
                  Next
                </RText>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <AddressBar bot={this.bot!} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  nav: {
    flexDirection: 'row',
    padding: 10,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50 * k,
  },
})
