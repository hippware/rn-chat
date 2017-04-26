import { createModelSchema, ref, list, child } from 'serializr';

export default class FileSource {
    uri;
    contentType;
    cached;

    constructor(data) {
        Object.assign(this, data);
    }
}

FileSource.schema = {
    name: 'FileSource',
    primaryKey: 'uri',
    properties: {
        uri: 'string',
        contentType: { type: 'string', optional: true },
        cached: { type: 'bool', optional: true }
    }
};

createModelSchema(FileSource, {
    uri: true,
    contentType: true,
    cached: true
});
