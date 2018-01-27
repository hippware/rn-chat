import React from 'react';
import Screen from './Screen';
import Card from './Card';
import Cell from './Cell';
import Separator from './Separator';
import {Actions} from 'react-native-router-flux';

const AddFriends = () => {
  return (
    <Screen>
      <Card style={{opacity: 0.95}}>
        <Cell image={require('../../images/iconAddressBook.png')}>Add Address Book Contacts</Cell>
        <Separator width={1} />
        <Cell image={require('../../images/iconUsernameSmall.png')} onPress={() => Actions.addFriendByUsername()}>
          Add by Username
        </Cell>
      </Card>
    </Screen>
  );
};

export default AddFriends;
