import {types, getParent} from 'mobx-state-tree'
import {ValidatableProfile} from '../utils/formValidation'
import {IWocky} from 'wocky-client'

const ProfileValidationStore = types.model('ProfileValidationStore', {}).actions(self => {
  let vProfile: ValidatableProfile

  const {profile} = (getParent(self) as any).wocky! as IWocky

  function save() {
    if (profile) {
      return profile!.update(vProfile.asObject)
    }
  }

  function setProfile(prof: ValidatableProfile) {
    vProfile = prof
  }

  return {save, setProfile}
})

export default ProfileValidationStore
