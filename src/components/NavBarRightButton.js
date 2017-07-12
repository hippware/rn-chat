import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {k} from './Global';

const NavBarRightButton = ({active, onPress, children}) => {
  return active
    ? <TouchableOpacity onPress={onPress} style={styles.button}>
        {children}
      </TouchableOpacity>
    : <View style={styles.button}>
        {children}
      </View>;
};

NavBarRightButton.defaultProps = {
  active: true,
};

export default NavBarRightButton;

const styles = StyleSheet.create({
  button: {
    width: 70 * k,
    height: 70 * k,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
