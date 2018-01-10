// @flow

import {types} from 'mobx-state-tree';
import FileSource from './FileSource';

const File = types
  .model('File', {
    id: types.identifier(types.string),
    item: types.string,
    source: FileSource,
    width: types.number,
    height: types.number,
    error: types.string,
    loaded: false,
    loading: false,
    isNew: false,
  })
  .actions((self) => {
    // todo lazy
    function load(source: Object, error: ?string) {
      if (error) {
        self.error = error;
        return;
      }
      if (!source) {
        self.error = 'no source';
        return;
      }

      self.source = new FileSource(source);
      self.width = source.width;
      self.height = source.height;
      self.loaded = true;
      self.loading = false;
    }

    return {load};
  });

export default File;
