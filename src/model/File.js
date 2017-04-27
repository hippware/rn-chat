import { createModelSchema, ref, list, child } from 'serializr';
import { autorunAsync, when, action, observable } from 'mobx';
import assert from 'assert';
import autobind from 'autobind-decorator';
import file from '../store/fileStore';
import FileSource from './FileSource';
import model from '../model/model';

@autobind
export default class File {
    @observable id: string;
    @observable item: string;
    @observable source: FileSource;
    @observable width;
    @observable height;
    @observable error: string;
    @observable loaded: boolean = false;
    @observable isNew: boolean = false;

    constructor(id: string, lazy: boolean = false) {
        this.id = id;
        if (!lazy) {
            when(
                'File constructor',
                () => model.profile && model.connected && this.id,
                () => {
                    this.download();
                }
            );
        }
    }

    download() {
        file.downloadFile(this.id).then(this.load).catch(e => this.load(null, e));
    }

    toJSON() {
        return {
            id: this.id,
            item: this.item,
            source: this.source,
            loaded: this.loaded
        };
    }

    @action load = (source, error) => {
        if (error) {
            this.error = error;
            return;
        }
        if (!source) {
            this.error = 'no source';
            return;
        }

        this.source = new FileSource(source);
        this.width = source.width;
        this.height = source.height;
        this.loaded = true;
    };
}

File.schema = {
    name: 'File',
    primaryKey: 'id',
    properties: {
        source: { type: 'FileSource', optional: true },
        width: { type: 'int', optional: true },
        height: { type: 'int', optional: true },
        id: 'string'
    }
};

createModelSchema(File, {
    id: true,
    item: true,
    source: child(FileSource),
    width: true,
    height: true
});

File.serializeInfo.factory = context => file.create(context.json.id, context.json);
