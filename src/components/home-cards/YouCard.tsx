import React from 'react'
import {Pill} from '../common'
import {inject, observer} from 'mobx-react/native'
import {IWocky} from 'wocky-client'
import ProfileCard from './ProfileCard'

type Props = {
  wocky?: IWocky
}

const YouCard = inject('wocky')(
  observer(({wocky}: Props) => {
    if (!wocky!.profile || !wocky!.profile!.handle) {
      return null
    }
    return (
      <ProfileCard profile={wocky!.profile!}>
        <Pill>
          {wocky!.profile!.botsSize} Location{wocky!.profile!.botsSize !== 1 && 's'}
        </Pill>
      </ProfileCard>
    )
  })
)
export default YouCard
