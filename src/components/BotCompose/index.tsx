import React from 'react'
import {Alert, Keyboard, TouchableOpacity, Image} from 'react-native'
import {observer, inject, Provider} from 'mobx-react/native'
import {observable} from 'mobx'
import {isAlive} from 'mobx-state-tree'
import {Actions} from 'react-native-router-flux'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {k} from '../Global'
import {colors} from '../../constants'
import Screen from '../Screen'
import BottomButton from '../common/BottomButton'
import {Spinner} from '../common'
import EditControls from './EditControls'
import ComposeCard from './ComposeCard'
import BotComposeMap from './BotComposeMap'
import {settings} from '../../globals'

type Props = {
  botId: string
  edit?: boolean
  titleBlurred?: boolean
}

@inject('wocky', 'notificationStore', 'analytics', 'log')
@observer
class BotCompose extends React.Component<Props> {
  static leftButton = ({edit}) => {
    return (
      <TouchableOpacity
        // tslint:disable-next-line
        onPress={() => {
          if (edit) {
            Alert.alert('Unsaved Changes', 'Are you sure you want to discard the changes?', [
              {text: 'Cancel', style: 'cancel'},
              {
                text: 'Discard',
                style: 'destructive',
                onPress: () => {
                  // TODO: undo on BotCompose
                  // botStore.bot.load(oldBot);
                  Actions.pop()
                },
              },
            ])
          } else {
            Actions.pop()
          }
        }}
        style={{marginLeft: 10 * k}}
      >
        <Image
          source={require('../../../images/iconBackGrayNew.png')}
          style={{tintColor: settings.isStaging ? 'rgb(28,247,39)' : 'rgb(117,117,117)'}}
        />
      </TouchableOpacity>
    )
  }
  botTitle: any
  @observable isLoading: boolean = false
  controls: any
  @observable bot: Bot

  componentWillMount() {
    this.bot = this.props.wocky.getBot({id: this.props.botId})
  }

  save = async (): Promise<void> => {
    const {bot} = this
    if (!bot.title) {
      // TODO: slide-down notification
      Alert.alert('Title cannot be empty')
      if (this.botTitle) this.botTitle.focus()
      return
    }
    try {
      this.isLoading = true
      const {isNew, geofence} = bot
      await bot.save()
      if (isNew) {
        Actions.pop({animated: false})
        Actions.pop()
        setTimeout(() => {
          if (geofence) Actions.geofenceShare({botId: bot.id})
          else Actions.botDetails({item: bot.id, isNew: true})
        })
      } else {
        Actions.pop()
      }
      this.props.analytics.track('botcreate_complete', this.bot.toJSON())
    } catch (e) {
      this.props.notificationStore.flash('Something went wrong, please try again.')
      this.props.analytics.track('botcreate_fail', {bot: this.bot.toJSON(), error: e})
      this.props.log('BotCompose save problem', e)
    } finally {
      this.isLoading = false
    }
  }

  scrollToNote = () => {
    if (this.bot.description === '') this.controls.focus()
  }

  render() {
    const {edit, titleBlurred} = this.props
    const {bot} = this
    if (!bot || !isAlive(bot)) {
      this.props.log('NO BOT IS DEFINED')
      return <Screen />
    }
    const isEnabled = bot.title && bot.title.trim().length > 0 && bot.location && bot.address
    const buttonText = bot.isNew ? (bot.isPublic ? 'Post' : 'Post (Private)') : 'Save Changes'

    return (
      <Provider bot={bot}>
        <Screen>
          <KeyboardAwareScrollView
            style={{marginBottom: 50 * k}}
            keyboardShouldPersistTaps="handled"
          >
            <BotComposeMap afterPhotoPost={this.scrollToNote} />
            <ComposeCard edit={edit} titleBlurred={titleBlurred} />
            <EditControls ref={this.setEditRef} />
          </KeyboardAwareScrollView>
          <BottomButton isDisabled={!isEnabled} onPress={this.save}>
            {bot.isLoading ? <Spinner color="white" size={22} /> : buttonText}
          </BottomButton>
        </Screen>
      </Provider>
    )
  }

  private setEditRef = r => (this.controls = r)
}

export default BotCompose
