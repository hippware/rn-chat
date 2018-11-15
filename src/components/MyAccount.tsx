import React from 'react'
import {TouchableOpacity, View, StyleSheet, Linking, Alert} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {observable} from 'mobx'
import {k} from './Global'
import SignUpAvatar from './SignUpAvatar'
import {Actions} from 'react-native-router-flux'
import * as log from '../utils/log'
import Card from './Card'
import Cell from './Cell'
import FormTextInput from './FormTextInput'
import {colors} from '../constants'
import {RText, Separator} from './common'
import {ValidatableProfile} from '../utils/formValidation'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {IWocky} from 'wocky-client'
import Screen from './Screen'
import {settings} from '../globals'
import {phoneFormat} from '../utils/misc'
const {version} = require('../../package.json')

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

  componentDidMount() {
    if (this.props.wocky!.profile) {
      this.vProfile = new ValidatableProfile(this.props.wocky!.profile!)
      this.props.profileValidationStore.setProfile(this.vProfile)
    }
  }

  render() {
    const {wocky} = this.props
    const {profile} = wocky!
    if (!profile || !this.vProfile) {
      log.log('NULL PROFILE', {level: log.levels.ERROR})
      return <View style={{flex: 1, backgroundColor: 'white'}} />
    }
    return (
      <Screen>
        <KeyboardAwareScrollView testID="myAccountScrollView">
          <View style={styles.headerOuter}>
            <SignUpAvatar
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
              }}
              showDot
            />
          </View>

          <Card style={{opacity: 0.95}}>
            <RText
              size={16}
              weight="Medium"
              style={{padding: 15, color: colors.navBarTextColorDay}}
              testID="profileInfo"
            >
              About
            </RText>
            <Separator />
            <FormTextInput
              label="First Name"
              store={this.vProfile && this.vProfile.firstName}
              icon={require('../../images/iconSubsNew.png')}
              onSubmitEditing={() => this.lastName.focus()}
            />
            <FormTextInput
              ref={r => (this.lastName = r)}
              label="Last Name"
              store={this.vProfile && this.vProfile.lastName}
              onSubmitEditing={() => this.handle.focus()}
            />
            <FormTextInput
              ref={r => (this.handle = r)}
              label="Username"
              store={this.vProfile && this.vProfile.handle}
              autoCapitalize="none"
              icon={require('../../images/iconUsernameNew.png')}
              onSubmitEditing={() => this.email.focus()}
            />
            <FormTextInput
              label="Phone"
              icon={require('../../images/phone.png')}
              editable={false}
              value={phoneFormat(profile.phoneNumber!)}
              // value={format({phone: profile.phoneNumber.replace('+', ''), country: 'US'}, 'E.164')}
            />
            <FormTextInput
              ref={r => (this.email = r)}
              label="Email"
              store={this.vProfile && this.vProfile.email}
              icon={require('../../images/iconEmailNew.png')}
              onSubmitEditing={() => MyAccount.submit(this.props.profileValidationStore)}
            />
            <Cell
              image={require('../../images/blocked.png')}
              onPress={Actions.blocked}
              imageStyle={{height: 20 * k, width: 20 * k, marginHorizontal: 5 * k}}
              style={{marginTop: 0}}
            >
              <RText numberOfLines={1} size={18} style={{flex: 1, color: colors.DARK_PURPLE}}>
                Blocked Users
              </RText>
            </Cell>
            {/* <Cell image={icon} style={{justifyContent: 'center'}} imageStyle={{height: 20 * k, width: 20 * k, marginHorizontal: 5 * k}}> */}
          </Card>

          {/* <LogoutButton /> */}

          <View style={{marginVertical: 30, alignItems: 'center'}}>
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
            {settings.isStaging && (
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
      </Screen>
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
    <RText size={15} color={colors.PINK} style={[styles.text, style]}>
      {children}
    </RText>
  </TouchableOpacity>
)

const Title = inject('wocky')(
  observer(
    ({wocky}) =>
      wocky.profile ? (
        <RText
          size={16}
          style={{
            letterSpacing: 0.5,
            color: colors.DARK_PURPLE,
          }}
        >
          {`@${wocky.profile.handle}`}
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
            marginRight: 10 * k,
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

const Version = inject()(
  observer(({}) => {
    return (
      <RText size={15} color={colors.DARK_GREY} style={{marginBottom: 15}}>
        {`Version ${version}`}
      </RText>
    )
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
  text: {
    marginBottom: 15,
  },
})
