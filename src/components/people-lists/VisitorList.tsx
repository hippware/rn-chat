import React, {useState, useEffect} from 'react'
import {inject} from 'mobx-react'
import {observer} from 'mobx-react-lite'
import {RText} from '../common'
import {IBot, IWocky} from 'wocky-client'
import {ILocationStore} from '../../store/LocationStore'
import {isAlive} from 'mobx-state-tree'
import FriendCard from './FriendCard'
import DraggablePopupList from '../common/DraggablePopupList'
import withKeyboardHOC from '../common/withKeyboardHOC'
import {colors} from '../../constants'
import {k} from '../Global'

type Props = {
  botId: string
  wocky?: IWocky
  locationStore?: ILocationStore
  isActive: boolean
}

const KeyboardAwareDraggablePopupList: any = withKeyboardHOC(DraggablePopupList)

const VisitorList = inject('wocky', 'locationStore')(
  observer(({botId, wocky, locationStore, isActive}: Props) => {
    const [bot, setBot] = useState<IBot | null>(null)

    useEffect(() => {
      const tempBot = wocky!.getBot({id: botId})
      setBot(tempBot)
      // TODO: refactor (remove?), it doesn't look good because we already load bot within BotDetails
      tempBot.visitors.load!({force: true})
      wocky!.loadBot(botId)
    }, [])

    const renderItem = ({item}) => <FriendCard profile={item} />

    const renderHeader = () => (
      <RText
        size={16}
        color={colors.PURPLE}
        weight="Medium"
        style={{width: '90%', alignSelf: 'center', marginBottom: 5 * k}}
      >
        {"Who's Here"}
      </RText>
    )

    // TODO display spinner during loading
    return (
      <KeyboardAwareDraggablePopupList
        headerInner={renderHeader()}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        data={bot && isAlive(bot) ? bot!.visitors.list.slice() : []}
        keyboardShouldPersistTaps="handled"
        onEndReachedThreshold={0.5}
        onEndReached={() => bot!.visitors.load()}
        isActive={isActive}
      />
    )
  })
)
;(VisitorList as any).navigationOptions = {
  fadeNavConfig: {
    back: true,
    title: (
      <RText size={18} color={colors.PURPLE}>
        Who's Here
      </RText>
    ),
  },
}

export default VisitorList
