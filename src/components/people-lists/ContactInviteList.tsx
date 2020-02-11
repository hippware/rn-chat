import React, {useEffect} from 'react'
import {View, Image, StyleSheet} from 'react-native'
import {RText, GradientButton, Separator, Avatar, BottomPopupNew} from '../common'
import {height} from '../Global'
import {onboardingSlideStyle as styles} from '../styles'
import {observer} from 'mobx-react'
import {inject} from 'mobx-react'
import ContactStore, {MyContact} from 'src/store/ContactStore'
import PersonRow from '../people-lists/PersonRow'
import {colors} from 'src/constants'
import {Actions} from 'react-native-router-flux'
import {Props as LocationSettingsProps} from '../LiveLocation/LocationSettingsModal'
import {useContactStore} from '../../utils/injectors'

const buttonHeight = 50

// todo: extract the pieces of this screen for the bottom-up slider version
const ContactInviteList = observer(() => {
  const contactStore = useContactStore()
  return (
    <>
      <BottomPopupNew
        // previewHeight={150}
        fullViewHeight={height - 150}
        allowFullScroll
        // preview={false}
        // navBarConfig={{
        //   backAction: Actions.pop,
        //   // title: bot && (
        //   //   <NavTitle
        //   //     bot={bot}
        //   //     onLongPress={() => {
        //   //       Clipboard.setString(bot.address)
        //   //       notificationStore!.flash('Address copied to clipboard 👍')
        //   //     }}
        //   //   />
        //   // ),
        // }}
        listProps={{
          data: contactStore!.sortedContacts.slice(),
          contentContainerStyle: {
            flexGrow: 1,
            paddingBottom: buttonHeight + 10,
          },
          ListHeaderComponent: (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <FindFriendsHeader style={{paddingTop: 10, paddingBottom: 50}} />
            </View>
          ),
          renderItem: ({item}) => <Contact contact={item} />,
          keyExtractor: ({contact: {recordId}}) => recordId,
          // bounces: false,
        }}
      />
      <GradientButton
        isPink
        style={{height: buttonHeight, width: '100%', position: 'absolute', bottom: 0}}
        onPress={Actions.pop}
      >
        <RText size={18.5} color="white" style={{letterSpacing: 0.8}}>
          Done
        </RText>
      </GradientButton>
    </>
  )
})

export const Contact = observer(({contact}: {contact: MyContact}) => {
  const {
    contact: {thumbnailPath},
    displayName,
    phoneNumber,
    profile,
  } = contact
  return (
    <PersonRow
      imageComponent={
        <Avatar
          image={thumbnailPath ? {uri: thumbnailPath} : undefined}
          displayName={displayName}
          size={42}
        />
      }
      handleComponent={
        <RText color={colors.DARK_PURPLE} weight="Medium" size={14}>
          {displayName}
        </RText>
      }
      displayName={profile ? profile.displayName : phoneNumber ? phoneNumber.number : ''}
    >
      <ToggleButton contact={contact} />
    </PersonRow>
  )
})

const ToggleButton = inject('contactStore')(
  observer(({contact, contactStore}: {contact: MyContact; contactStore?: ContactStore}) => {
    const {relationship, smsSent} = contact

    let text: string = 'INVITE'
    let onPress = smsSent
      ? () => null
      : () =>
          Actions.locationSettingsModal({
            settingsType: 'SEND_REQUEST',
            profile: contact.profile,
            displayName: contact.displayNameSingle,
            onOkPress: shareType => {
              contactStore!.inviteContact(contact, shareType)
              Actions.pop()
            },
          } as LocationSettingsProps)
    let isPink: boolean = false

    if (relationship === 'NONE') {
      text = smsSent ? 'SENT' : 'CONNECT'
      isPink = smsSent
    } else if (relationship === null) {
      text = smsSent ? 'INVITED' : 'INVITE'
      isPink = smsSent
    } else if (relationship === 'FRIEND') {
      text = 'FRIENDS'
      onPress = () => null
      isPink = true
    } else if (relationship === 'INVITED') {
      text = 'SENT'
      onPress = () => null
      isPink = true
    }

    return (
      <GradientButton
        style={[styles2.button]}
        isPink={isPink}
        offColor="white"
        // innerStyle=
        onPress={onPress}
      >
        <RText size={13} color={isPink ? 'white' : colors.PINK} weight={'Medium'}>
          {text}
        </RText>
      </GradientButton>
    )
  })
)

export const FindFriendsHeader = ({style}) => (
  <>
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'center',
          width: '70%',
        },
        style,
      ]}
    >
      <Image
        style={{width: 60, height: 70, marginTop: 5}}
        source={require('../../../images/iconBot.png')}
      />
      <RText style={[styles.onboardingH1, {textAlign: 'left', marginLeft: 20, width: 176}]}>
        Find Friends on tinyrobot!
      </RText>
    </View>

    <Separator style={{width: '100%', marginHorizontal: 5, marginBottom: 10}} />
  </>
)

export const ContactInviteListWithLoad = () => {
  const contactStore = useContactStore()
  useEffect(() => {
    contactStore!.requestPermission().then(contactStore.loadContacts)
  }, [])
  return <ContactInviteList />
}

export default ContactInviteList

const styles2 = StyleSheet.create({
  button: {
    height: 31,
    width: 94,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: colors.PINK,
    borderRadius: 4,
    backgroundColor: colors.WHITE,
    borderColor: colors.PINK,
    borderWidth: 1,
  },
})
