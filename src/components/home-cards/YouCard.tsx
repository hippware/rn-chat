import React from 'react'
import {Pill} from '../common'
import ProfileCard from './ProfileCard'
import {useWocky} from 'src/utils/injectors'

const YouCard = () => {
  const wocky = useWocky()
  if (!wocky.profile || !wocky.profile!.handle) {
    return null
  }
  return (
    <ProfileCard profile={wocky!.profile!}>
      <Pill>
        {wocky!.profile!.botsSize} Location{wocky!.profile!.botsSize !== 1 && 's'}
      </Pill>
    </ProfileCard>
  )
}
export default YouCard
