import React from 'react'
import LocationSettingsModal, {
  LocationSettingsType,
} from '../../../src/components/LiveLocation/LocationSettingsModal'

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

export default ({type, withContact}: {type: LocationSettingsType; withContact?: boolean}) => (
  <LocationSettingsModal
    type={type}
    profile={withContact ? undefined : (profile as any)}
    displayName={withContact ? 'contact' : undefined}
    onOkPress={() => null}
  />
)
