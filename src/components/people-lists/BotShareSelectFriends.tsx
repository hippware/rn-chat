import React from 'react'
import {Alert, TouchableOpacity, Text, View, Keyboard, StyleSheet} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {observable, action} from 'mobx'
import {Actions} from 'react-native-router-flux'
import {k} from '../Global'
import {AutoExpandingTextInput} from '../common'
import Screen from '../Screen'
import {colors} from '../../constants'
import FriendMultiSelect from './FriendMultiSelect'
import {IBot, IWocky} from 'wocky-client'
import {ISearchStore} from '../../store/SearchStore'

type Props = {
  botId: string
  wocky?: IWocky
  notificationStore?: any
  warn?: any
  searchStore?: ISearchStore
}

type State = {
  height: number
  message: string
}

@inject('wocky', 'notificationStore', 'warn')
@observer
class BotShareSelectFriends extends React.Component<Props, State> {
  @observable bot?: IBot
  mounted: boolean = false
  state = {height: 0, message: ''}

  @action
  componentDidMount() {
    const {friends, getBot} = this.props.wocky!
    this.bot = getBot({id: this.props.botId})
    this.props.searchStore!.localResult.setList(friends.map(f => ({profile: f})))
    Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
    Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
    Keyboard.removeListener('keyboardWillShow', () => {}) // tslint:disable-line
    Keyboard.removeListener('keyboardWillHide', () => {}) // tslint:disable-line
  }

  share = () => {
    const shareSelect = this.props.searchStore!.localResult.selected.map(sp => sp.id)
    try {
      this.bot!.share(shareSelect, this.state.message)
      const num = shareSelect.length
      this.props.notificationStore!.flash(
        `Bot shared with ${num} ${num > 1 ? 'friends' : 'friend'} 🎉`
      )
      Actions.pop({animated: false})
    } catch (e) {
      Alert.alert('There was a problem sharing the bot.')
      this.props.warn(e)
    }
  }

  keyboardWillShow = e => {
    if (this.mounted) this.setState({height: e.endCoordinates.height})
  }

  keyboardWillHide = () => {
    if (this.mounted) this.setState({height: 0})
  }

  render() {
    const selection = this.props.searchStore!.localResult
    return (
      <Screen>
        <FriendMultiSelect selection={selection} botTitle={this.bot ? this.bot!.title! : ''} />
        {!!selection.selected.length && (
          <View style={styles.container}>
            <View style={{padding: 20 * k, paddingTop: 15 * k, paddingBottom: 10 * k}}>
              <AutoExpandingTextInput
                style={styles.input}
                placeholderTextColor={colors.DARK_GREY}
                maxLength={140}
                value={this.state.message}
                onChangeText={text => this.setState({message: text})}
                placeholder="Write an optional message..."
              />
            </View>
            <TouchableOpacity style={styles.shareButton} onPress={this.share}>
              <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{height: this.state.height}} />
      </Screen>
    )
  }
}

export default BotShareSelectFriends

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    right: 0,
    left: 0,
    position: 'relative',
    shadowOffset: {height: -1, width: 0},
    shadowRadius: 4,
    shadowOpacity: 0.11,
  },
  shareButton: {
    height: 50 * k,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
    backgroundColor: colors.PINK,
  },
  shareText: {
    fontSize: 15 * k,
    fontFamily: 'Roboto-Regular',
    color: colors.WHITE,
    letterSpacing: 0.8,
  },
  input: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15 * k,
    color: colors.PURPLE,
  },
})
