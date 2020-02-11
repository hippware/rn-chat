import React from 'react'
import {View, FlatList} from 'react-native'
import {RText, GradientButton, Spinner} from '../common'
import {minHeight, s, k} from '../Global'
import {observer} from 'mobx-react'
import {inject} from 'mobx-react'
import ContactStore from 'src/store/ContactStore'
import {FindFriendsHeader, Contact} from '../people-lists/ContactInviteList'

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
      <FindFriendsHeader style={{paddingTop: 80 * s, height: 200 * k}} />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: buttonHeight,
          width: '100%',
        }}
      >
        {contactStore!.loading ? (
          <Spinner size={38} />
        ) : (
          <FlatList
            style={{flex: 1, width: '100%'}}
            data={contactStore!.sortedContacts.slice()}
            renderItem={({item}) => <Contact contact={item} />}
            keyExtractor={item => item.contact.recordID}
            showsVerticalScrollIndicator={false}
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

export default OnboardingFindFriendsList
