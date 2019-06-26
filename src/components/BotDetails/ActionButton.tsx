import React from 'react'
import {TouchableOpacity, Image, Alert, ViewStyle} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {Actions} from 'react-native-router-flux'
import ActionSheet from 'react-native-actionsheet'
import {autorun} from 'mobx'
import {IBot, IWocky} from 'wocky-client'
import {ILocationStore} from '../../store/LocationStore'
// import {settings} from '../../globals'
import {IHomeStore} from '../../store/HomeStore'
import {isAlive} from 'mobx-state-tree'
import alert from '../../utils/alert'

type Props = {
  bot: IBot
  wocky?: IWocky
  locationStore?: ILocationStore
  homeStore?: IHomeStore
  copyAddress: () => void
  unsubscribe: () => void
  isSubscribed: boolean
  analytics?: any
  style?: ViewStyle
}

@inject('wocky', 'locationStore', 'analytics', 'homeStore')
@observer
class BotButtons extends React.Component<Props> {
  actionSheet: any
  handler: any

  // TODO: why is this in BotButtons? Should probably move to BotDetailsHeader
  componentDidMount() {
    this.handler = autorun(() => {
      if (this.props.wocky!.connected && this.props.bot.isSubscribed) {
        if (!this.props.locationStore!.alwaysOn) {
          Actions.geofenceWarning({bot: this.props.bot})
          this.props.bot.unsubscribe()
        }
      }
    })
  }

  componentWillUnmount() {
    this.handler()
  }

  render() {
    const {bot, style} = this.props
    if (!bot || !isAlive(bot) || !bot.owner) return null
    // const isShareable = bot.isPublic || bot.owner.isOwn
    const actions = this.getActions()
    const destructiveIndex = actions.findIndex((a: any) => !!a.destructive)
    return [
      <TouchableOpacity onPress={() => this.actionSheet.show()} style={style} key="1">
        <Image
          source={require('../../../images/ellipsis.png')}
          style={{width: 20, height: 20}}
          resizeMode="contain"
        />
      </TouchableOpacity>,
      <ActionSheet
        ref={o => (this.actionSheet = o)}
        options={actions.map(a => a.name)}
        cancelButtonIndex={actions.length - 1}
        onPress={index => this.onTap(index, actions)}
        destructiveButtonIndex={destructiveIndex}
        key="2"
      />,
    ]
  }

  onTap = (index: number, actions: any[]) => actions[index].action(this.props)

  getActions = () => {
    const {wocky, bot} = this.props
    if (bot!.owner!.isOwn) {
      // TODO make owner non-null ?
      return [
        // shareVia,
        // copyLink,
        copyAddr,
        {name: 'Edit', action: () => Actions.botEdit({botId: bot ? bot.id : null})},
        {
          name: 'Delete',
          action: () => {
            Alert.alert('', 'Are you sure you want to delete this location?', [
              {text: 'Cancel', style: 'cancel'},
              {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {
                  wocky!.removeBot(bot!.id)
                  Actions.popTo('home')
                },
              },
            ])
          },
          destructive: true,
        },
        cancel,
      ]
    } else {
      let arr: any = [
        // shareVia,
        // copyLink,
        copyAddr,
      ]
      if (bot.isSubscribed) {
        arr.push(unfollow)
      }
      arr = [
        ...arr,
        {
          name: 'Report',
          action: () => Actions.reportBot({botId: bot.id}),
          destructive: true,
        },
        cancel,
      ]
      return arr
    }
  }
}

export default BotButtons

const copyAddr = {
  name: 'Copy Address',
  action: ({copyAddress}) => copyAddress(),
}

// const linkPrefix = settings.isStaging
//   ? 'http://html.dev.tinyrobot.com/bot/'
// : 'https://tinyro.bot/bot/'

// const shareVia = {
//   name: 'Share via',
//   action: async ({bot, analytics}: {bot: IBot; analytics: any}) => {
//     analytics.track('bot_share_link_choose_activity')
//     const {action, activityType} = await (Share as any).share(
//       {
//         message: `Hey, take a look at "${bot.title}" on tinyrobot!`,
//         // title: 'title',
//         url: `${linkPrefix}${bot.id}`,
//       },
//       {
//         subject: `Hey, take a look at "${bot.title}" on tinyrobot!`,
//         // excludedActivityTypes: [],
//         // tintColor: ''
//       }
//     )
//     analytics.track('bot_share_link_choose_activity_choice', {action, activityType})
//   },
// }

// const copyLink = {
//   name: 'Copy Link',
//   action: ({bot, analytics}) => {
//     Clipboard.setString(`${linkPrefix}${bot.id}`)
//     analytics.track('bot_share_link_copy')
//   },
// }

const cancel = {name: 'Cancel', action: () => {}} // tslint:disable-line

const unfollow = {
  name: 'Unfollow Location',
  action: ({bot}: Props) => {
    alert(null, 'Are you sure you want to unfollow this location?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Unfollow',
        style: 'destructive',
        onPress: () => {
          Actions.pop()
          ;(bot as IBot).unsubscribe()
        },
      },
    ])
  },
}
