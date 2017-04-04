import assert from 'assert';
import {createModelSchema, ref, list, child} from 'serializr';
import {observable} from 'mobx';

export default class Note {
    id: string;
    @observable content: string = '';
    @observable title: string = '';


    constructor(id, content) {
        this.id = id;
        this.content = content;
    }

}

createModelSchema(Note, {
    id: true,
    content: true,
    title: true
});
