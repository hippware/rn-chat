import React from 'react'
import {StyleSheet, View, TextInput} from 'react-native'
import RText from '../common/RText'
import {k, width} from '../Global'
import {colors} from '../../constants'
import {observer, inject} from 'mobx-react/native'
import {IWocky, IBot} from 'wocky-client'
import {Actions} from 'react-native-router-flux'
import withKeyboardHOC from '../common/withKeyboardHOC'
import {GradientButton} from '../common'

type Props = {
  botId: string
  wocky?: IWocky
}

@inject('wocky')
@observer
class EditNote extends React.Component<Props> {
  bot: IBot = null
  note: any = null

  componentWillMount() {
    this.bot = this.props.wocky!.getBot({id: this.props.botId})
  }

  render() {
    return (
      <View>
        <TextInput
          style={[styles.textStyle, {width, height: 120, paddingTop: 15}]}
          placeholder="Tell us about this place!"
          ref={r => (this.note = r)}
          onChangeText={text => this.bot.load({description: text})}
          value={this.bot.description}
          autoFocus
          multiline
          onBlur={Actions.pop}
        />
        <GradientButton
          innerStyle={{
            width,
            // backgroundColor: colors.PINK, // TODO: gradient background
            paddingVertical: 15 * k,
            alignItems: 'center',
          }}
          isPink
          onPress={Actions.pop}
        >
          <RText color="white" size={15}>
            Add Note
          </RText>
        </GradientButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textStyle: {
    height: 50 * k,
    left: 0,
    right: 0,
    borderBottomColor: colors.GREY,
    borderBottomWidth: 1,
    borderTopColor: colors.GREY,
    borderTopWidth: 1,
    backgroundColor: 'white',
    padding: 10 * k,
    paddingLeft: 21 * k,
    fontFamily: 'Roboto-Regular',
    fontSize: 16 * k,
  },
})

export default withKeyboardHOC(EditNote)
