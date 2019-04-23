import React from 'react'
import {TouchableOpacity, View, StyleSheet, Linking, Alert} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {observable} from 'mobx'
import {minHeight} from './Global'
import SignUpAvatar from './SignUpAvatar'
import {Actions} from 'react-native-router-flux'
import Cell from './Cell'
import FormTextInput from './FormTextInput'
import {colors} from '../constants'
import {RText, Separator} from './common'
import {ValidatableProfile} from '../utils/formValidation'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {IWocky} from 'wocky-client'
import {settings} from '../globals'
import {phoneFormat} from '../utils/misc'
import Version from './Version'

type Props = {
  wocky?: IWocky
  profileValidationStore?: any
}

@inject('wocky', 'profileValidationStore')
@observer
class MyAccount extends React.Component<Props> {
  static renderTitle = () => <Title />
  static rightButton = () => <Right />

  static submit = async profileValidationStore => {
    try {
      await profileValidationStore.save()
      Actions.pop()
      // need to force refresh of ProfileDetails after this change
      setTimeout(() => Actions.refresh({refresh: new Date()}))
    } catch (e) {
      alert(e)
    }
  }

  @observable saving: boolean = false
  @observable vProfile?: ValidatableProfile
  handle: any
  firstName: any
  lastName: any
  email: any

  componentWillMount() {
    if (this.props.wocky!.profile) {
      this.vProfile = new ValidatableProfile(this.props.wocky!.profile!)
      this.props.profileValidationStore.setProfile(this.vProfile)
    }
  }

  render() {
    const {wocky} = this.props
    const {profile} = wocky!
    if (!profile || !this.vProfile) {
      // error('NULL PROFILE')
      return <View style={{flex: 1, backgroundColor: 'white'}} />
    }
    return (
      <KeyboardAwareScrollView testID="myAccountScrollView">
        <View style={styles.headerOuter}>
          <SignUpAvatar />
        </View>

        <View style={styles.body}>
          <View style={{width: '80%'}}>
            <RText
              size={17}
              weight="Medium"
              style={{color: colors.navBarTextColorDay}}
              testID="profileInfo"
            >
              About
            </RText>

            <FormTextInput
              ref={r => (this.handle = r)}
              label="Username"
              store={this.vProfile && this.vProfile.handle}
              autoCapitalize="none"
              icon={require('../../images/iconUsernameNew.png')}
              onSubmitEditing={() => this.email.focus()}
              selectionColor={colors.COVER_BLUE}
            />
            <FormTextInput
              label="First Name"
              store={this.vProfile && this.vProfile.firstName}
              icon={require('../../images/iconSubsNew.png')}
              onSubmitEditing={() => this.lastName.focus()}
              selectionColor={colors.COVER_BLUE}
            />
            <FormTextInput
              ref={r => (this.lastName = r)}
              label="Last Name"
              store={this.vProfile && this.vProfile.lastName}
              onSubmitEditing={() => this.handle.focus()}
              selectionColor={colors.COVER_BLUE}
            />

            <RText
              size={17}
              weight="Medium"
              style={{color: colors.navBarTextColorDay, marginTop: 30, marginBottom: 7}}
              testID="profileInfo"
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
              ref={r => (this.email = r)}
              label="Email"
              store={this.vProfile && this.vProfile.email}
              icon={require('../../images/iconEmailNew.png')}
              onSubmitEditing={() => MyAccount.submit(this.props.profileValidationStore)}
              selectionColor={colors.COVER_BLUE}
            />

            <RText
              size={17}
              weight="Medium"
              style={{color: colors.navBarTextColorDay, marginTop: 30, marginBottom: 7}}
              testID="profileInfo"
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
          {settings.allowProfileDelete && (
            <LinkButton
              style={{marginTop: 50}}
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
            >
              Delete Profile
            </LinkButton>
          )}
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

export default MyAccount

const LinkButton = ({
  children,
  onPress,
  style,
}: {
  children: any
  onPress: () => void
  style?: any
}) => (
  <TouchableOpacity onPress={onPress}>
    <RText size={16} color={colors.PINK} style={[styles.text, style]}>
      {children}
    </RText>
  </TouchableOpacity>
)

const Title = inject('wocky')(
  observer(({wocky}) =>
    wocky.profile ? (
      <RText
        size={18}
        style={{
          letterSpacing: 0.5,
          color: colors.DARK_PURPLE,
        }}
      >
        Edit Profile
      </RText>
    ) : null
  )
)

const Right = inject('profileValidationStore', 'wocky')(
  observer(({profileValidationStore, wocky}) => {
    const {profile} = wocky
    const disabled =
      !profile ||
      profile.updating ||
      profile.uploading ||
      (profile.avatar && profile.avatar.loading)
    return profile ? (
      <TouchableOpacity
        onPress={() => MyAccount.submit(profileValidationStore)}
        disabled={disabled}
      >
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
