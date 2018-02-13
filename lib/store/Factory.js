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
        storage: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.map(type), {})
    })
        .named('Factory' + type.name)
        .actions(self => ({
        clear: () => {
            self.storage.clear();
        },
        delete: (id) => {
            self.storage.delete(id);
        },
        get: (id, data) => {
            if (!self.storage.get(id)) {
                const entity = mobx_state_tree_1.getParent(self).create(type, Object.assign({ id }, data));
                self.storage.put(entity);
            }
            else {
                const entity = self.storage.get(id);
                if (entity.load && data && Object.keys(data).length) {
                    mobx_state_tree_1.getParent(self)._registerReferences(type, data);
                    entity.load(data);
                }
            }
            return new Proxy(self.storage.get(id), {
                get: (target, name) => {
                    if (mobx_state_tree_1.isAlive(target)) {
                        return target[name];
                    }
                    else {
                        return mobx_state_tree_1.getSnapshot(target)[name];
                    }
                }
            });
        }
    }));
}
exports.createFactory = createFactory;
exports.Storages = mobx_state_tree_1.types
    .model({
    files: mobx_state_tree_1.types.optional(createFactory(File_1.File), {}),
    bots: mobx_state_tree_1.types.optional(createFactory(Bot_1.Bot), {}),
    profiles: mobx_state_tree_1.types.optional(createFactory(Profile_1.Profile), {})
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
                const props = type['properties'];
                Object.keys(props).forEach((key) => {
                    if (data[key] !== undefined) {
                        if (props[key].types && props[key].types[0].targetType) {
                            const field = map[props[key].types[0].targetType.name];
                            if (field && self[field] && data[key]) {
                                let value = data[key];
                                if (typeof value === 'object') {
                                    value = value.id;
                                }
                                self[field].get(value);
                            }
                        }
                    }
                });
            }
        },
        views: {
            get map() {
                return map;
            }
        }
    };
})
    .actions(self => ({
    create: (type, data) => {
        self._registerReferences(type, data);
        return type.create(data, mobx_state_tree_1.getEnv(self));
    }
}));
//# sourceMappingURL=Factory.js.map