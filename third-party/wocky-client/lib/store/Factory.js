"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no_unused-variable
const mobx_state_tree_1 = require("mobx-state-tree");
const Profile_1 = require("../model/Profile");
const File_1 = require("../model/File");
const Bot_1 = require("../model/Bot");
function createFactory(type) {
    return mobx_state_tree_1.types
        .model({
        storage: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.map(type), {}),
    })
        .named(`Factory${type.name}`)
        .views(self => ({
        get snapshot() {
            const storage = {};
            self.storage.keys().forEach((key) => {
                if (self.storage.get(key)) {
                    storage[key] = self.storage.get(key).snapshot;
                }
            });
            return { storage };
        },
    }))
        .actions(self => ({
        clear: () => {
            self.storage.clear();
        },
        delete: (id) => {
            self.storage.delete(id);
        },
        get: (id, data) => {
            if (!self.storage.get(id)) {
                const entity = mobx_state_tree_1.getParent(self).create(type, Object.assign({ id }, data, { loaded: data && !!Object.keys(data).length }));
                self.storage.put(entity);
            }
            else {
                const entity = self.storage.get(id);
                if (entity.load && data && Object.keys(data).length) {
                    entity.load(mobx_state_tree_1.getParent(self)._registerReferences(type, data));
                }
            }
            return self.storage.get(id);
        },
    }));
}
exports.createFactory = createFactory;
exports.Storages = mobx_state_tree_1.types
    .model({
    files: mobx_state_tree_1.types.optional(createFactory(File_1.File), {}),
    bots: mobx_state_tree_1.types.optional(createFactory(Bot_1.Bot), {}),
    profiles: mobx_state_tree_1.types.optional(createFactory(Profile_1.Profile), {}),
})
    .extend((self) => {
    const map = {};
    return {
        actions: {
            afterCreate: () => {
                map['File'] = 'files';
                map['Profile'] = 'profiles';
                map['Bot'] = 'bots';
            },
            _registerReferences: (type, data) => {
                let props = type['properties'];
                if (!props) {
                    // union type doesn't have properties so let's determine concrete type
                    props = mobx_state_tree_1.getType(type.create(data))['properties'];
                }
                const res = {};
                if (!props) {
                    throw new Error('No properties for type:' + type.name);
                }
                if (!data) {
                    return;
                }
                Object.keys(props).forEach((key) => {
                    if (data[key] !== undefined) {
                        const targetType = props[key].targetType ||
                            (props[key].types && props[key].types.length && props[key].types[0].targetType);
                        if (targetType) {
                            const field = map[targetType.name];
                            // found reference storage
                            if (field && self[field] && data[key]) {
                                let value = data[key];
                                if (typeof value === 'object') {
                                    // we have object instead of reference, let's create it!
                                    self[field].get(value.id, value);
                                    value = value.id;
                                }
                                res[key] = self[field].get(value);
                            }
                            else if (data[key] && typeof data[key] === 'object') {
                                res[key] = self.create(targetType, data[key]);
                            }
                        }
                        else {
                            res[key] = data[key];
                        }
                    }
                });
                return res;
            },
        },
        views: {
            get map() {
                return map;
            },
        },
    };
})
    .actions(self => ({
    create: (type, data) => {
        return type.create(self._registerReferences(type, data), mobx_state_tree_1.getEnv(self));
    },
    load: (instance, data) => {
        instance.load(self._registerReferences(mobx_state_tree_1.getType(instance), data));
    },
}));
//# sourceMappingURL=Factory.js.map