import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Popover from 'react-native-popover';
import Separator from './Separator';
import friend from '../store/friendStore';
import event from '../store/eventStore';
import profile from '../store/profileStore';
import {observer} from 'mobx-react/native';
import {colors} from '../constants';

@observer
export default class extends React.Component {
  render() {
    const item = this.props.item;
    return (
      <Popover {...this.props}>
        {item && (
          <View style={{width: this.props.width}}>
            <TouchableOpacity
              onPress={() => {
                event.hidePost(item.event.id);
                this.props.onClose();
              }}
            >
              <Text style={styles.boldText}>Hide this post</Text>
            </TouchableOpacity>
            <Separator width={1} />
            <TouchableOpacity
              onPress={() => {
                profile.hidePosts(item.event.target);
                this.props.onClose();
              }}
            >
              <Text style={styles.boldText}>Hide {item.event.target.displayName}'s Posts</Text>
            </TouchableOpacity>
          </View>
        )}
      </Popover>
    );
    // <Separator width={1}/>
    // <TouchableOpacity>
    //     <Text style={styles.boldText}>Block {item.event.target.displayName}</Text>
    // </TouchableOpacity>
  }
}

const styles = StyleSheet.create({
  boldText: {
    padding: 10,
    paddingLeft: 20,
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    color: colors.DARK_PURPLE,
  },
  text: {
    padding: 10,
    paddingLeft: 20,
    fontFamily: 'Roboto-Light',
    fontSize: 15,
    color: colors.DARK_PURPLE,
  },
  menu: {
    borderBottomWidth: 1,
    borderBottomColor: colors.DARK_GREY,
  },
});
