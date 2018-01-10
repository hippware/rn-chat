// @flow

import {types} from 'mobx-state-tree';

const FileSource = types.model('File', {
  uri: types.string,
  contentType: types.string,
  cached: types.boolean,
});

export default FileSource;
