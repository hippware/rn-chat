import { IModelType } from 'mobx-state-tree';
export declare const Loadable: IModelType<{
    loaded?: any;
}, {
    loaded: boolean;
} & {
    load: (data: any) => void;
}>;
export declare type ILoadable = typeof Loadable.Type;
export declare function createLoadable(load: (self: any) => Function): IModelType<{
    loaded?: any;
} & {}, {
    loaded: boolean;
} & {
    load: (data: any) => void;
} & {
    loading: boolean;
    loadError: string;
} & {
    request: () => Promise<any>;
}>;
