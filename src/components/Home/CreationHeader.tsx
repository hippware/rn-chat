import React, {useState, useEffect} from 'react'
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import {inject} from 'mobx-react'
import {CloseButton, RText} from '../common'
import AddressBar from '../map/AddressBar'
import {IWocky, IBot} from 'wocky-client'
import {colors} from '../../constants'
import {k} from '../Global'
import {Actions} from 'react-native-router-flux'
import {getSnapshot} from 'mobx-state-tree'
import {IHomeStore} from 'src/store/HomeStore'
import {observer} from 'mobx-react'

type Props = {
  wocky?: IWocky
  analytics?: any
  homeStore?: IHomeStore
}

const CreationHeader = inject('wocky', 'analytics', 'iconStore', 'homeStore')(
  observer(({wocky, analytics, homeStore}: Props) => {
    let trackTimeout: any

    const [bot, setBot] = useState<IBot | null>(null)

    useEffect(() => {
      wocky!.createBot().then(b => {
        setBot(b)
        homeStore!.stopFollowingUserOnMap()
        trackTimeout = setTimeout(() => analytics.track('botcreate_start'), 1000)
      })

      return () => {
        clearTimeout(trackTimeout)
      }
    }, [])

    function next() {
      analytics.track('botcreate_chooselocation', getSnapshot(bot!))
      Actions.botCompose({botId: bot!.id})
    }

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
            {bot && (
              <TouchableOpacity onPress={next} style={{alignSelf: 'flex-end'}}>
                <RText size={17} color={colors.PINK}>
                  Next
                </RText>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <AddressBar bot={bot!} />
      </View>
    )
  })
)

export default CreationHeader

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
