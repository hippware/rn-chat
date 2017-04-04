import { createModelSchema, ref, list, child } from 'serializr'
import { autorunAsync, when, action, observable } from 'mobx'
import assert from 'assert'
import autobind from 'autobind-decorator'
import file from '../store/fileStore'
import FileSource from './FileSource'
import model from '../model/model'

@autobind
export default class File {
    @observable id: string
    @observable item: string
    @observable source: FileSource
    @observable width
    @observable height
    @observable error: string
    @observable loaded: boolean = false
    @observable isNew: boolean = false

    constructor (id: string) {
        this.id = id
        when('File constructor', () => model.profile && model.connected && this.id, () => {
            console.log('DOWNLOAD FILE', this.id)
            file.downloadFile(this.id).then(this.load).catch(e => this.load(null, e))
        })
    }

    toJSON () {
        return {id: this.id, item: this.item, source: this.source, loaded: this.loaded}
    }

    @action load = (source, error) => {
        if (error) {
            console.log('File.load: error:', error)
            this.error = error
            return
        }
        if (!source) {
            this.error = 'no source'
            //console.log("File.load: error: No source!");
            return
        }

        this.source = new FileSource(source)
        if (source && source.uri && typeof getImageSize !== 'undefined') {
            getImageSize('file://' + source.uri, (width, height) => {
                console.log('getImageSize', source.uri)
                this.width = width
                this.height = height
                this.loaded = true
            })
        } else {
            this.loaded = true
        }
    }

}

File.schema = {
    name: 'File',
    primaryKey: 'id',
    properties: {
        source: {type: 'FileSource', optional: true},
        width: {type: 'int', optional: true},
        height: {type: 'int', optional: true},
        id: 'string',
    }
}

createModelSchema(File, {
    id: true,
    item: true,
    source: child(FileSource),
    width: true,
    height: true,
})

File.serializeInfo.factory = (context) => file.create(context.json.id, context.json)

