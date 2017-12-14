// @flow

import {createModelSchema} from 'serializr';

export default class FileSource {
  uri: string;
  contentType: string;
  cached: boolean;

  constructor(data) {
    Object.assign(this, data);
  }

  static schema = {
    name: 'FileSource',
    primaryKey: 'uri',
    properties: {
      uri: 'string',
      contentType: {type: 'string', optional: true},
      cached: {type: 'bool', optional: true},
    },
  };
}

createModelSchema(FileSource, {
  uri: true,
  contentType: true,
  cached: true,
});
