// @flow

import {types} from 'mobx-state-tree';
import FileSource from './FileSource';

const File = types.model('File', {
  id: types.string,
  item: types.string,
  source: FileSource,
  width: types.number,
  height: types.number,
  error: types.string,
  loaded: false,
  loading: false,
  isNew: false,
});

export default File;
