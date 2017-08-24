// @flow

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {k} from '../Global';
import {colors} from '../../constants';
import {RText} from '../common';

type Props = {
  section: Object,
  title: string,
  children?: any,
};

const SectionHeader = ({section, title, children}: Props) =>
  (<View style={styles.headerBar} key={section.key}>
    <RText size={13}>
      <RText size={16} weight='Bold'>
        {section.data.length}
      </RText>
      {` ${title}`}
    </RText>
    {children}
  </View>);

export default SectionHeader;

const styles = StyleSheet.create({
  headerBar: {
    backgroundColor: '#F1F2F3',
    paddingHorizontal: 15 * k,
    paddingBottom: 10 * k,
    paddingTop: 20 * k,
    borderTopWidth: 1,
    borderTopColor: colors.WARM_GREY,
    borderBottomWidth: 1,
    borderBottomColor: colors.WARM_GREY,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
