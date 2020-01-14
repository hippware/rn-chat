import React from 'react'
import LocationSettingsModal from '../../src/components/LiveLocation/LocationSettingsModal'

const profile = {
  id: 'place_cage_avatar',
  handle: 'nic_cage',
  firstName: 'Nick',
  avatar: {
    thumbnail: {
      uri: 'https://www.placecage.com/c/300/300',
    },
  },
}

export default () => <LocationSettingsModal type="ACCEPT_REJECT_REQUEST" user={profile as any} />
