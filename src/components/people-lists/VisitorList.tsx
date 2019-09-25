import React, {useState, useEffect} from 'react'
import {RText} from '../common'
import {IBot} from 'wocky-client'
import {isAlive} from 'mobx-state-tree'
import FriendCard from './FriendCard'
import DraggablePopupList from '../common/DraggablePopupList'
import withKeyboardHOC from '../common/withKeyboardHOC'
import {colors} from '../../constants'
import {k} from '../Global'
import {useWocky} from 'src/utils/injectors'

type Props = {
  botId: string
  isActive: boolean
}

const KeyboardAwareDraggablePopupList: any = withKeyboardHOC(DraggablePopupList)

const VisitorList = ({botId, isActive}: Props) => {
  const [bot, setBot] = useState<IBot | null>(null)
  const {getBot, loadBot} = useWocky()

  useEffect(() => {
    const tempBot = getBot({id: botId})
    setBot(tempBot)
    // TODO: refactor (remove?), it doesn't look good because we already load bot within BotDetails
    tempBot.visitors.load!({force: true})
    loadBot(botId)
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
}
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
