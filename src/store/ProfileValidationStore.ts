import {types, getParent} from 'mobx-state-tree'
import {ValidatableProfile} from '../utils/formValidation'
import {IWocky} from 'wocky-client'

const ProfileValidationStore = types
  .model('ProfileValidationStore', {})
  .views(self => ({
    get wocky(): IWocky {
      return (getParent(self) as any).wocky
    },
  }))
  .actions(self => {
    let vProfile: ValidatableProfile

    function save() {
      if (self.wocky.profile) {
        return self.wocky.profile!.update(vProfile.asObject)
      }
    }

    function setProfile(profile: ValidatableProfile) {
      vProfile = profile
    }

    return {save, setProfile}
  })

export default ProfileValidationStore
