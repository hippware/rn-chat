import { ISnapshottable, IModelType, IExtendedObservableMap, IType } from 'mobx-state-tree';
import { IBot } from '../model/Bot';
export declare type __IBot = IBot;
export declare function createFactory<T>(type: IType<any, any>): IModelType<{
    storage?: any;
}, {
    storage: IExtendedObservableMap<any> & ISnapshottable<{
        [key: string]: any;
    }>;
} & {
    readonly snapshot: {
        storage: any;
    };
} & {
    clear: () => void;
    delete: (id: string) => void;
    get: (id: string, data?: {
        [key: string]: any;
    } | undefined) => any;
}>;
export declare const Storages: IModelType<{
    files?: any;
    bots?: any;
    profiles?: any;
}, {
    files: {
        storage: IExtendedObservableMap<any> & ISnapshottable<{
            [key: string]: any;
        }>;
    } & {
        readonly snapshot: {
            storage: any;
        };
    } & {
        clear: () => void;
        delete: (id: string) => void;
        get: (id: string, data?: {
            [key: string]: any;
        } | undefined) => any;
    } & {
        readonly $treenode?: any;
    };
    bots: {
        storage: IExtendedObservableMap<any> & ISnapshottable<{
            [key: string]: any;
        }>;
    } & {
        readonly snapshot: {
            storage: any;
        };
    } & {
        clear: () => void;
        delete: (id: string) => void;
        get: (id: string, data?: {
            [key: string]: any;
        } | undefined) => any;
    } & {
        readonly $treenode?: any;
    };
    profiles: {
        storage: IExtendedObservableMap<any> & ISnapshottable<{
            [key: string]: any;
        }>;
    } & {
        readonly snapshot: {
            storage: any;
        };
    } & {
        clear: () => void;
        delete: (id: string) => void;
        get: (id: string, data?: {
            [key: string]: any;
        } | undefined) => any;
    } & {
        readonly $treenode?: any;
    };
} & {
    afterCreate: () => void;
    _registerReferences: (type: any, data: {
        [key: string]: any;
    }) => any;
} & {
    readonly map: any;
} & {
    create: <T>(type: IType<any, T>, data: {
        [key: string]: any;
    }) => T;
    load: (instance: any, data: {
        [key: string]: any;
    }) => void;
}>;
