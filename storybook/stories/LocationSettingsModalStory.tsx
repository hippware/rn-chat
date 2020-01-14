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

export default () => <LocationSettingsModal type="ACCEPT_REJECT_REQUEST" profile={profile as any} />
// export default () => <LocationSettingsModal type="ACCEPT_REQUEST" user={profile as any} />
// export default () => <LocationSettingsModal type="SEND_REQUEST" user={profile as any} />
