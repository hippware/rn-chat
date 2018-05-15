import React from 'react'
import {View, TextInput, StyleSheet} from 'react-native'
import {observer} from 'mobx-react/native'
import {isAlive} from 'mobx-state-tree'
import {Actions} from 'react-native-router-flux'
import {k} from '../Global'
import {colors} from '../../constants'
import Cell from '../Cell'
import VisibilitySwitch from '../BotVisibilitySwitch'
import Button from '../Button'
import {IBot, IWocky} from 'wocky-client'

type Props = {
  bot: IBot
  wocky: IWocky
}

@observer
class EditControls extends React.Component<Props> {
  input: any

  focus = () => {
    this.input.focus()
  }

  onCancel = () => {
    Actions.pop({animated: false})
    Actions.pop()
  }

  render() {
    const {bot} = this.props
    if (!bot || !isAlive(bot)) return null
    return (
      <View>
        <View style={[{backgroundColor: colors.WHITE}, styles.separator]}>
          <VisibilitySwitch bot={bot} />
          <Cell
            imageStyle={{paddingLeft: 10 * k, paddingTop: 7 * k, alignSelf: 'flex-start'}}
            style={styles.separator}
            image={require('../../../images/botNotePink.png')}
          >
            <TextInput
              multiline
              style={{height: 200 * k, flex: 1, fontFamily: 'Roboto-Regular', fontSize: 15}}
              placeholder="Tell us about this place!"
              // tslint:disable-next-line
              onChangeText={text => bot.load({description: text})}
              value={bot.description ? bot.description : ''}
              maxLength={1500}
              ref={r => (this.input = r)}
            />
          </Cell>
        </View>
        {bot.isNew && (
          <Button onPress={this.onCancel} textStyle={{color: colors.PINK}} style={styles.crud}>
            Cancel Bot
          </Button>
        )}
      </View>
    )
  }
}

export default EditControls

const styles = StyleSheet.create({
  separator: {
    borderTopWidth: 1,
    borderTopColor: colors.WARM_GREY
  },
  crud: {
    bottom: 0,
    right: 0,
    left: 0,
    borderRadius: 0,
    position: 'relative',
    backgroundColor: 'transparent'
  }
})
