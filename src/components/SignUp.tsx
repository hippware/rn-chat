import React, {useEffect, useState, useRef} from 'react'
import {View, Image, StyleSheet, Text, Linking, TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {k, avatarScale, minHeight, height} from './Global'
import {FormTextInput} from './FormTextInput'
import {colors} from '../constants'
import {RText, Spinner} from './common'
import {ValidatableProfile} from '../utils/formValidation'
import {getSnapshot} from 'mobx-state-tree'
import alert from '../utils/alert'
import {useAnalytics, useWocky} from 'src/utils/injectors'
import {observer} from 'mobx-react'

type Props = {
  routeName?: string
}

const SignUp = observer(({routeName}: Props) => {
  const [vProfile, setVProfile] = useState<ValidatableProfile | null>(null)
  const handle = useRef<FormTextInput>(null)

  const {profile, connected} = useWocky()
  const {track} = useAnalytics()

  useEffect(() => {
    if (routeName === 'signUp' && profile) {
      setVProfile(new ValidatableProfile(profile!))
    }
  }, [routeName])

  const done = async () => {
    if (!vProfile!.isValid) return
    if (!profile || profile!.updating) return
    try {
      await profile!.update(vProfile!.asObject)
      Actions.checkOnboarded()
      track('createprofile_complete', {
        profile: getSnapshot(profile!),
      })
    } catch (err) {
      // notificationStore is probably not good here, user must read and confirm
      try {
        // display first error if it is GraphQL error
        const error = JSON.parse(err.message)[0].message
        alert(null, error)
      } catch {
        alert(null, err.message)
      }
      track('createprofile_fail', {
        profile: vProfile!.asObject, // send entered data to mixpanel, not original profile
        error: err,
      })
    }
  }

  if (!profile) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Profile is not loaded</Text>
      </View>
    )
  }
  const buttonDisabled = (vProfile && !vProfile.isValid) || profile.updating
  return (
    <KeyboardAwareScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height,
        }}
      >
        <View
          style={{
            marginTop: 50 * minHeight,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          testID="signUpTopRow"
        >
          <Image
            style={{width: 60 * avatarScale, height: 69 * avatarScale}}
            source={require('../../images/pink.png')}
          />
          <RText
            weight="Light"
            size={30}
            color={colors.PINK}
            style={{height: 80, paddingLeft: 20 * k}}
          >
            Let's get{'\r\n'}started!
          </RText>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            width: '80%',
            marginVertical: 80 * minHeight,
          }}
        >
          <FormTextInput
            icon={require('../../images/iconUsernameNew.png')}
            ref={handle}
            label="Username"
            autoCapitalize="none"
            onSubmitEditing={() => done()}
            store={vProfile ? vProfile.handle : undefined}
            testID="signUpUsername"
            selectionColor={colors.COVER_BLUE}
          />
        </View>
        <RText
          size={12.5}
          color={colors.DARK_GREY}
          style={[styles.agreeNote as any, {paddingHorizontal: 35}]}
        >
          {'By signing up you agree to our '}
          <RText
            size={12.5}
            weight="Bold"
            onPress={() => Linking.openURL('https://tinyrobot.com/privacy-policy/')}
          >
            Privacy Policy
          </RText>
          {', \r\n'}
          <RText
            size={12.5}
            weight="Bold"
            onPress={() => Linking.openURL('https://tinyrobot.com/terms-of-service/')}
          >
            Terms of Service
          </RText>
          <RText size={12.5} color={colors.DARK_GREY} style={styles.agreeNote as any}>
            {', and for us to contact you via email for updates and information.'}
          </RText>
        </RText>
        <TouchableOpacity
          testID="signUpDone"
          disabled={buttonDisabled || !connected}
          onPress={done}
          style={styles.submitButton}
        >
          <RText size={17.5} color="white" style={{letterSpacing: 0.8, textAlign: 'center'}}>
            {profile.updating ? <Spinner color="white" size={22} /> : 'Done'}
          </RText>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  )
})

export default SignUp

const styles = StyleSheet.create({
  submitButton: {
    borderRadius: 6,
    height: 50 * k,
    backgroundColor: 'rgb(254,92,108)',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  agreeNote: {
    marginTop: 35 * k,
    marginBottom: 35 * k,
    textAlign: 'center',
  },
  paginationStyle: {bottom: 170 * k},
})
