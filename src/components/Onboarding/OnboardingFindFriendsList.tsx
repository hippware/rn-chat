import React from 'react'
import {View, Image, FlatList} from 'react-native'
import {RText, GradientButton, Separator, Spinner} from '../common'
import {s, minHeight, k} from '../Global'
import {onboardingSlideStyle as styles} from '../styles'
import {observer} from 'mobx-react/native'
import {inject} from 'mobx-react'
import ContactStore, {MyContact} from 'src/store/ContactStore'

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

      <View style={{flex: 1, justifyContent: 'center', paddingBottom: buttonHeight}}>
        {contactStore!.loading ? (
          <Spinner size={38} />
        ) : (
          <FlatList
            data={contactStore!.contacts.slice()}
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

// todo: flesh out UI
const Friend = ({contact}: {contact: MyContact}) => <View style={{height: 20, borderWidth: 1}} />

export default OnboardingFindFriendsList
