import React from 'react'
import {View, Image, FlatList, StyleSheet} from 'react-native'
import {RText, GradientButton, Separator, Spinner, Avatar} from '../common'
import {s, minHeight, k} from '../Global'
import {onboardingSlideStyle as styles} from '../styles'
import {observer} from 'mobx-react'
import {inject} from 'mobx-react'
import ContactStore, {MyContact} from 'src/store/ContactStore'
import PersonRow from '../people-lists/PersonRow'
import {colors} from 'src/constants'

type Props = {
  onPress: () => void
  contactStore?: ContactStore
}

const buttonHeight = 50 * minHeight

const OnboardingFindFriendsList = inject('contactStore')(
  observer(({onPress, contactStore}: Props) => (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'center',
          width: '70%',
          paddingTop: 80 * s,
          height: 200 * k,
        }}
      >
        <Image
          style={{width: 60, height: 70, marginTop: 5}}
          source={require('../../../images/iconBot.png')}
        />
        <RText style={[styles.onboardingH1, {textAlign: 'left', marginLeft: 20, width: 176}]}>
          Find Friends on tinyrobot!
        </RText>
      </View>

      <Separator style={{width: '100%', marginHorizontal: 5}} />

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: buttonHeight,
          width: '100%',
          padding: 10,
        }}
      >
        {contactStore!.loading ? (
          <Spinner size={38} />
        ) : (
          <FlatList
            style={{flex: 1, width: '100%'}}
            data={contactStore!.sortedContacts.slice()}
            renderItem={({item}) => <Friend contact={item} />}
            keyExtractor={item => item.contact.recordID}
          />
        )}
      </View>

      <GradientButton
        isPink
        style={{height: buttonHeight, width: '100%', position: 'absolute', bottom: 0}}
        onPress={onPress}
      >
        <RText size={18.5} color="white" style={{letterSpacing: 0.8}}>
          Done
        </RText>
      </GradientButton>
    </View>
  ))
)

const Friend = observer(({contact}: {contact: MyContact}) => {
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
    let onPress = smsSent ? () => null : () => contactStore!.inviteContact(contact)
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

export default OnboardingFindFriendsList

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
