import {types, getParent} from 'mobx-state-tree'
import {ValidatableProfile} from '../utils/formValidation'

const ProfileValidationStore = types
  .model('ProfileValidationStore', {})
  .views(self => ({
    get wocky() {
      return getParent(self).wocky
    },
  }))
  .actions(self => {
    let vProfile: ValidatableProfile = null

    function save() {
      return self.wocky.profile.update(vProfile.asObject)
    }

    function setProfile(profile: ValidatableProfile) {
      vProfile = profile
    }

    return {save, setProfile}
  })

export default ProfileValidationStore
