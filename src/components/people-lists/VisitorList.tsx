import React, {useState, useEffect} from 'react'
import {RText, BottomPopupNew} from '../common'
import {IBot} from 'wocky-client'
import {isAlive} from 'mobx-state-tree'
import FriendCard from './FriendCard'
import {colors} from '../../constants'
import {k} from '../Global'
import {useWocky} from 'src/utils/injectors'
import {observer} from 'mobx-react'

type Props = {
  botId: string
  isActive: boolean
}

const VisitorList = observer(({botId, isActive}: Props) => {
  const [bot, setBot] = useState<IBot | null>(null)
  const {getBot, loadBot} = useWocky()

  useEffect(() => {
    const tempBot = getBot({id: botId})
    setBot(tempBot)
    // TODO: refactor (remove?), it doesn't look good because we already load bot within BotDetails
    tempBot.visitors.load!({force: true})
    loadBot(botId)
  }, [])

  const header = (
    <RText
      size={16}
      color={colors.PURPLE}
      weight="Medium"
      style={{width: '90%', alignSelf: 'center', marginBottom: 5 * k}}
    >
      {"Who's Here"}
    </RText>
  )

  const data = bot && isAlive(bot) ? bot!.visitors.list.slice() : []

  // TODO display spinner during loading
  return (
    <BottomPopupNew
      fullViewHeight={400}
      allowFullScroll
      navBarConfig={{
        title: (
          <RText size={18} color={colors.PURPLE}>
            Who's Here
          </RText>
        ),
      }}
      listProps={{
        ListHeaderComponent: header,
        renderItem: ({item}) => <FriendCard profile={item} />,
        keyExtractor: item => item.id,
        data,
        keyboardShouldPersistTaps: 'handled',
        onEndReachedThreshold: 0.5,
        onEndReached: () => bot!.visitors.load(),
      }}
    />
  )
})

export default VisitorList
