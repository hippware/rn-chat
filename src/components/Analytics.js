import Mixpanel from 'react-native-mixpanel'
import { settings, k } from '../globals'
import { autorun } from 'mobx'
import model from '../model/model'

class Analytics {
    init () {
        Mixpanel.sharedInstanceWithToken(settings.isStaging ? '5ee41c4ec134d9c7d769d9ddf41ed8eb' : '3f62ffcf7a8fc0100157f877af5668a6')

        autorun(() => {
            if (model.profile) {
                Mixpanel.identify(model.profile.user)
                if (model.profile.loaded) {
                    Mixpanel.set({
                        '$email': model.profile.email,
                        'firstName': model.profile.firstName,
                        'lastName': model.profile.lastName,
                        'phone': model.profile.phoneNumber,
                        'username': model.profile.handle,
                    })
                    Mixpanel.track('profile loaded')
                } else {
                    Mixpanel.timeEvent('profile loaded')
                }
            }
        })

        autorun(() => {
            if (model.profile && model.profile.avatar && model.connected) {
                if (!model.profile.avatar.loaded) {
                    console.log('Profile image loading start')
                    Mixpanel.timeEvent('Profile Image Upload')
                } else {
                    console.log('Profile image loading end')
                    Mixpanel.track('Profile Image Upload')
                }
            }
        })
    }
}

export default new Analytics()