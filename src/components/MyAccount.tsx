import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import {observer, inject} from 'mobx-react/native'
import {observable} from 'mobx'
import {k} from './Global'
import SignUpAvatar from './SignUpAvatar'
import {Actions} from 'react-native-router-flux'
import LogoutButton from './LogoutButton'
import Screen from './Screen'
import * as log from '../utils/log'
import Card from './Card'
import Cell from './Cell'
import FormTextInput from './FormTextInput'
import {colors} from '../constants'
import {RText, Separator} from './common'
import {ValidatableProfile} from '../utils/formValidation'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {IWocky} from 'wocky-client'
import {settings} from '../globals'

type Props = {
  wocky?: IWocky
  profileValidationStore?: any
}

@inject('wocky', 'profileValidationStore')
@observer
class MyAccount extends React.Component<Props> {
  static title = () => <Title />
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
  @observable vProfile: ValidatableProfile
  handle: any
  firstName: any
  lastName: any
  email: any

  componentDidMount() {
    if (this.props.wocky!.profile) {
      this.vProfile = new ValidatableProfile(this.props.wocky.profile)
      this.props.profileValidationStore.setProfile(this.vProfile)
    }
  }

  render() {
    const {profile} = this.props.wocky
    if (!profile) {
      log.log('NULL PROFILE', {level: log.levels.ERROR})
      return <Screen />
    }
    return (
      <Screen>
        <KeyboardAwareScrollView testID="myAccountScrollView">
          <SignUpAvatar
            style={{
              top: 5,
              backgroundColor: 'rgb(243,244,246)',
              borderRadius: 33 * k,
              width: 66 * k,
              height: 66 * k,
            }}
          />
          <Card isDay style={{opacity: 0.95}}>
            <View style={{padding: 15 * k}} testID="profileInfo">
              <RText size={16} weight="Medium" style={{color: colors.navBarTextColorDay}}>
                Profile Info
              </RText>
            </View>
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
            {/* TODO: phoneStore.format
            <Cell image={require('../../images/iconPhoneSmall.png')}>{format(props.profile.phoneNumber)}</Cell>
          <Separator width={1} /> */}
            <FormTextInput
              ref={r => (this.email = r)}
              label="Email"
              store={this.vProfile && this.vProfile.email}
              icon={require('../../images/iconEmailNew.png')}
              onSubmitEditing={() => MyAccount.submit(this.props.profileValidationStore)}
            />
            <Cell
              image={require('../../images/block.png')}
              onPress={Actions.blocked}
              imageStyle={{height: 20 * k, width: 20 * k, marginHorizontal: 5 * k}}
              style={{marginTop: 10 * k}}
            >
              <RText numberOfLines={1} size={18} style={{flex: 1, color: colors.DARK_PURPLE}}>
                Blocked Users
              </RText>
            </Cell>
            {/* <Cell image={icon} style={{justifyContent: 'center'}} imageStyle={{height: 20 * k, width: 20 * k, marginHorizontal: 5 * k}}> */}
          </Card>

          <LogoutButton />
        </KeyboardAwareScrollView>
      </Screen>
    )
  }
}

export default MyAccount

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
    return profile ? (
      <TouchableOpacity
        onPress={() => MyAccount.submit(profileValidationStore)}
        disabled={profile.updating}
      >
        <RText
          size={16}
          style={{
            marginRight: 10 * k,
            color: colors.PINK,
            opacity: profile.updating ? 0.5 : 1,
          }}
        >
          Save
        </RText>
      </TouchableOpacity>
    ) : null
  })
)
