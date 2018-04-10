import React from 'react'
import {View, StyleSheet} from 'react-native'

import {observer, inject} from 'mobx-react/native'

import BotBubble from '../map/BotBubble'
import VisitorHeads from './VisitorHeads'
import {IBot, IWocky} from 'wocky-client'
import {Actions} from 'react-native-router-flux'
import {RText} from '../common'
import {width} from '../Global'

type Props = {
  wocky?: IWocky
  bot: IBot
}

@inject('wocky')
@observer
class ActiveBot extends React.Component<Props> {
  goToBot = (): void => {
    Actions.botDetails({item: this.props.bot.id})
    setTimeout(() => Actions.visitors({item: this.props.bot.id}), 500)
  }

  render() {
    return (
      <View style={styles.outer}>
        <View style={styles.inner}>
          <BotBubble bot={this.props.bot} scale={0} onImagePress={this.goToBot}>
            {this.props.bot.visitor ? (
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <RText
                  size={13}
                  color="white"
                  style={{textAlign: 'center'}}
                >{`You're\r\nHere`}</RText>
              </View>
            ) : null}
          </BotBubble>
          <RText size={13} style={{textAlign: 'center'}} numberOfLines={2} ellipsizeMode="tail">
            {this.props.bot.title}
          </RText>
          <VisitorHeads bot={this.props.bot} />
        </View>
      </View>
    )
  }
}

export default ActiveBot

const styles = StyleSheet.create({
  outer: {
    padding: 15,
    width: width / 3.5,
    alignItems: 'center',
  },
  inner: {
    width: 75,
  },
})
