import React from 'react'
import {
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  View,
  // Text,
  // InteractionManager,
} from 'react-native'
import Screen from '../Screen'
import {k} from '../Global'
import {ProfileList} from '../people-lists'
import Button from 'apsl-react-native-button'
import {Actions} from 'react-native-router-flux'
import {observer, inject} from 'mobx-react/native'
import {IWocky} from 'wocky-client'
import {ISearchStore} from '../../store/SearchStore'

type Props = {
  wocky: IWocky
  searchStore?: ISearchStore
}

@inject('wocky', 'searchStore')
@observer
class CreateMessage extends React.Component<Props> {
  // static backButton = ({state, style, textButtonStyle}) => (
  //   <TouchableOpacity
  //     onPress={() => InteractionManager.runAfterInteractions(state.parent.pop)}
  //     style={style}
  //   >
  //     <Text style={textButtonStyle}>Cancel</Text>
  //   </TouchableOpacity>
  // )

  componentDidMount() {
    this.props.searchStore!.localResult.setList(this.props.wocky.friends.map(f => ({profile: f})))
  }

  render() {
    const selection = this.props.searchStore!.localResult
    return (
      <Screen>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: 53 * k,
            backgroundColor: 'white',
          }}
        >
          <View style={{paddingLeft: 22.6 * k, paddingRight: 14.8 * k}}>
            <Image source={require('../../../images/iconSearchHome.png')} />
          </View>
          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={text => selection.setFilter(text)}
            value={selection.filter}
            placeholder="Search Friends"
            // placeholderColor="rgb(211,211,211)"
            style={{
              fontSize: 15 * k,
              fontFamily: 'Roboto-Light',
              height: 53 * k,
              flex: 1,
            }}
          />
          <TouchableOpacity onPress={() => selection.setFilter('')}>
            <View style={{paddingRight: 22.6 * k, paddingLeft: 14.8 * k}}>
              <Image source={require('../../../images/iconClose.png')} />
            </View>
          </TouchableOpacity>
        </View>
        <ProfileList
          selection={selection}
          onSelect={profile => {
            Actions.pop()
            // messageStore.createChat(profile);
            Actions.chat({item: profile.id})
          }}
        />
        {!!selection.selected.length && (
          <Button
            containerStyle={styles.button}
            onPress={() => Actions.createMessage(selection.selected[0])}
            style={{
              color: 'white',
              letterSpacing: 0.7,
              fontSize: 15,
              fontFamily: 'Roboto-Regular',
              textAlign: 'center',
            }}
          >
            Send Message
          </Button>
        )}
      </Screen>
    )
    //    Send Message to {selection.selected.length} Friend{selection.selected.length > 1 ? 's' : ''}
  }
}

export default CreateMessage

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    height: 60 * k,
    backgroundColor: 'rgb(254,92,108)',
    shadowOpacity: 0.09,
    shadowRadius: 6,
    shadowOffset: {height: -2, width: 0},
  },
})