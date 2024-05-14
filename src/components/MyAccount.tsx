import React, {useEffect, useState, useRef} from 'react'
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Linking,
  Alert,
  TouchableOpacityProps,
} from 'react-native'
import {inject} from 'mobx-react'
import {observer} from 'mobx-react'
import {minHeight} from './Global'
import SignUpAvatar from './SignUpAvatar'
import {Actions} from 'react-native-router-flux'
import Cell from './Cell'
import {FormTextInput} from './FormTextInput'
import {colors} from '../constants'
import {RText, Separator} from './common'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {IWocky} from 'src/wocky'
import {settings} from '../globals'
import {phoneFormat} from '../utils/misc'
import Version from './Version'

type Props = {
  wocky?: IWocky
}

const MyAccount = inject('wocky')(
  observer(({wocky}: Props) => {
    const {profile} = wocky!
    const handle = useRef<FormTextInput>(null)
    const firstName = useRef<FormTextInput>(null)
    const lastName = useRef<FormTextInput>(null)
    const email = useRef<FormTextInput>(null)
    // const phone = useRef<FormTextInput>(null)

    if (!profile) {
      // error('NULL PROFILE')
      return <View style={{flex: 1, backgroundColor: 'white'}} />
    }

    return (
      <KeyboardAwareScrollView testID="myAccountScrollView">
        <View style={styles.headerOuter}>
          <SignUpAvatar />
        </View>

        <View style={styles.body} testID="profileInfo">
          <View style={{width: '80%'}}>
            <RText size={17} weight="Medium" style={{color: colors.navBarTextColorDay}}>
              About
            </RText>

            <FormTextInput
              ref={handle}
              label="Username"
              name="handle"
              autoCapitalize="none"
              icon={require('../../images/iconUsernameNew.png')}
              onSubmitEditing={() => firstName.current!.focus()}
              selectionColor={colors.COVER_BLUE}
            />
            <FormTextInput
              ref={firstName}
              label="First Name"
              store={vProfile && vProfile.firstName}
              icon={require('../../images/iconSubsNew.png')}
              onSubmitEditing={() => lastName.current!.focus()}
              selectionColor={colors.COVER_BLUE}
            />
            <FormTextInput
              ref={lastName}
              label="Last Name"
              store={vProfile && vProfile.lastName}
              onSubmitEditing={() => email.current!.focus()}
              selectionColor={colors.COVER_BLUE}
            />

            <RText
              size={17}
              weight="Medium"
              style={{color: colors.navBarTextColorDay, marginTop: 30, marginBottom: 7}}
            >
              Info
            </RText>

            <FormTextInput
              label="Phone"
              icon={require('../../images/phone.png')}
              editable={false}
              value={phoneFormat(profile.phoneNumber!)}
              selectionColor={colors.COVER_BLUE}
              // value={format({phone: profile.phoneNumber.replace('+', ''), country: 'US'}, 'E.164')}
            />
            <FormTextInput
              ref={email}
              label="Email"
              store={vProfile && vProfile.email}
              icon={require('../../images/iconEmailNew.png')}
              onSubmitEditing={submit}
              selectionColor={colors.COVER_BLUE}
            />

            <RText
              size={17}
              weight="Medium"
              style={{color: colors.navBarTextColorDay, marginTop: 30, marginBottom: 7}}
            >
              Settings
            </RText>

            <Cell
              image={require('../../images/blocked.png')}
              onPress={Actions.blocked}
              style={{justifyContent: 'center'}}
              imageStyle={{marginHorizontal: 10}}
            >
              <RText numberOfLines={1} size={18} style={{flex: 1, color: colors.DARK_PURPLE}}>
                Blocked Users
              </RText>
            </Cell>
            <Separator backgroundColor={'rgba(63, 50, 77, .2)'} />
            {/* <Cell image={icon} style={{justifyContent: 'center'}} imageStyle={{height: 20 * k, width: 20 * k, marginHorizontal: 5 * k}}> */}
          </View>
        </View>

        {/* <LogoutButton /> */}

        <View style={[styles.body, {paddingVertical: 38.5 * minHeight}]}>
          <Version />
          <LinkButton onPress={() => Linking.openURL('https://tinyrobot.com/terms-of-service/')}>
            Terms of Service
          </LinkButton>
          <LinkButton onPress={() => Linking.openURL('https://tinyrobot.com/privacy-policy/')}>
            Privacy Policy
          </LinkButton>
          <LinkButton onPress={Actions.debugOptionsScreen}>Debug Options</LinkButton>
          <LinkButton
            onPress={() => {
              Alert.alert('Log Out', `Are you sure you want to log out?`, [
                {text: 'Cancel', style: 'cancel'},
                {
                  text: 'Log Out',
                  style: 'destructive',
                  onPress: Actions.logout,
                },
              ])
            }}
          >
            Logout
          </LinkButton>
          {settings.allowBypassLogin && (
            <LinkButton
              style={{marginTop: 50}}
              onPress={() => {
                wocky!.profile!.clientData.clear()
                Actions.logout()
              }}
            >
              Clear Client Data
            </LinkButton>
          )}
          {settings.allowProfileDelete && (
            <LinkButton
              onPress={() => {
                Alert.alert(
                  'Delete Profile',
                  `Are you reeeeally sure you want to remove this profile? This action cannot be reversed.`,
                  [
                    {text: 'Cancel', style: 'cancel'},
                    {
                      text: 'Delete Profile',
                      style: 'destructive',
                      onPress: async () => {
                        Actions.logout()
                        wocky!.remove()
                      },
                    },
                  ]
                )
              }}
              testID="deleteProfile"
            >
              Delete Profile
            </LinkButton>
          )}
        </View>
      </KeyboardAwareScrollView>
    )
  })
)
;(MyAccount as any).navigationOptions = () => ({
  headerRight: <Right />,
  headerTitle: 'Edit Profile',
})

const submit = async () => {
  try {
    await (MyAccount as any).profileValidationStore.save()
    Actions.pop()
  } catch (e) {
    Alert.alert(
      'Error',
      e.messages
        ? e.messages
            .map(rec =>
              rec.message.replace('has already been taken', 'Handle has already been taken')
            )
            .join('\n')
        : e.message
    )
  }
}

export default MyAccount

const LinkButton = ({
  children,
  style,
  ...rest
}: TouchableOpacityProps & {children: React.ReactNode}) => (
  <TouchableOpacity {...rest}>
    <RText size={16} color={colors.PINK} style={[styles.text, style]}>
      {children}
    </RText>
  </TouchableOpacity>
)

const Right = inject(
  'wocky',
  'profileValidationStore'
)(
  observer(({wocky, profileValidationStore}: Props) => {
    const {profile} = wocky!
    const disabled =
      !profile ||
      profile.updating ||
      profile.uploading ||
      (profile.avatar && profile.avatar.loading)
    return profile ? (
      <TouchableOpacity onPress={submit} disabled={disabled as boolean}>
        <RText
          size={16}
          style={{
            marginRight: 15 * minHeight,
            color: disabled ? colors.GREY : colors.PINK,
            opacity: profile.updating ? 0.5 : 1,
          }}
        >
          Save
        </RText>
      </TouchableOpacity>
    ) : null
  })
)

const styles = StyleSheet.create({
  headerOuter: {
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  text: {
    marginBottom: 15,
  },
})
