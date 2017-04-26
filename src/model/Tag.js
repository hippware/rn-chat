import assert from 'assert';
import { createModelSchema, ref, list, child } from 'serializr';
import { observable } from 'mobx';

export default class Tag {
    id: string;

    constructor(id) {
        this.id = id;
    }
}

createModelSchema(Tag, {
    id: true
});
