import {createModelSchema, ref, list, child} from 'serializr';

export default class FileSource {
  uri;
  contentType;
  cached;
}
